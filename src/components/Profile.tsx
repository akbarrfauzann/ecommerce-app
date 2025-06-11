import { useEffect, useState } from "react";
import { auth, db } from "./firebase";
import { doc, getDoc } from "firebase/firestore";
import { NavLink } from "react-router-dom";
import ProfileSidebar from "./ProfileSidebar";

type UserProfile = {
  email: string;
  username: string;
};

export default function ProfilePage() {
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      setLoading(true);
      setError(null);

      if (!user) {
        setUserProfile(null);
        setLoading(false);
        console.log("No user is signed in");
        return;
      }

      try {
        const docRef = doc(db, "Users", user.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data();

          if (data.email && data.username) {
            setUserProfile(data as UserProfile);
            console.log("User data:", data);
          } else {
            setError("User data format is invalid");
            console.warn("User data format is invalid", data);
          }
        } else {
          setError("User profile not found");
          console.log("No such document!");
        }
      } catch (error) {
        setError("Error fetching user data");
        console.error("Error fetching user data:", error);
      } finally {
        setLoading(false);
      }
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="px-4 py-8 dark:bg-dark w-full min-h-screen">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 dark:border-white mx-auto mb-4"></div>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Loading profile...
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="px-4 py-8 dark:bg-dark w-full min-h-screen">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <p className="text-red-500 text-lg mb-4">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!userProfile) {
    return (
      <div className="px-4 py-8 dark:bg-dark w-full min-h-screen">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-4">
              User is not logged in
            </p>
            <NavLink
              to="/login"
              className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg transition-colors"
            >
              Go to Login
            </NavLink>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="px-4 py-8 dark:bg-dark w-full min-h-screen">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-gray-800 dark:text-white">
          Profile Page
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Profile Sidebar */}
          <ProfileSidebar userProfile={userProfile} />

          {/* Main Content Area */}
          <div className="lg:col-span-3">
            <div className="bg-white dark:bg-secondary dark:border-white border shadow-lg rounded-lg p-6">
              <div className="mb-6">
                <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-2">
                  Welcome back, {userProfile.username}!
                </h2>
                <p className="text-gray-600 dark:text-gray-300">
                  Manage your profile, view your orders, and update your
                  preferences from here.
                </p>
              </div>

              {/* Profile Details Section */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-800 dark:text-white mb-3">
                    Account Information
                  </h3>
                  <div className="space-y-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-600 dark:text-tertiary mb-1">
                        Username
                      </label>
                      <p className="text-gray-900 dark:text-white font-medium">
                        {userProfile.username}
                      </p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-600 dark:text-tertiary mb-1">
                        Email Address
                      </label>
                      <p className="text-gray-900 dark:text-white font-medium break-all">
                        {userProfile.email}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-800 dark:text-white mb-3">
                    Quick Actions
                  </h3>
                  <div className="space-y-2">
                    <NavLink
                      to="/profile/edit"
                      className="block w-full text-center bg-primary hover:bg-secondary dark:bg-dark-secondary dark:text-black dark:hover:bg-dark-secondary text-white py-2 px-4 rounded-lg transition-colors duration-200"
                    >
                      Edit Profile
                    </NavLink>
                    <NavLink
                      to="/profile/security"
                      className="block w-full text-center bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded-lg transition-colors duration-200"
                    >
                      Security Settings
                    </NavLink>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

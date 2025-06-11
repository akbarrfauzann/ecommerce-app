import { useEffect, useState } from "react";
import { auth, db } from "../components/firebase"; // Sesuaikan path dengan struktur project Anda
import { doc, getDoc } from "firebase/firestore";
import { NavLink } from "react-router-dom";
import ProfileSidebar from "../components/ProfileSidebar";
import numberWithCommas from "../utils/numberWithCommas";

type UserProfile = {
  email: string;
  username: string;
};

const Orders = () => {
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

    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="px-4 py-8 dark:bg-dark w-full min-h-screen">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 dark:border-white mx-auto mb-4"></div>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Loading orders...
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
          My Orders
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Profile Sidebar */}
          <ProfileSidebar userProfile={userProfile} />

          {/* Main Content Area */}
          <div className="lg:col-span-3">
            <div className="bg-white dark:bg-secondary shadow-lg border dark:border-white rounded-lg p-6">
              <div className="mb-6">
                <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-2">
                  Order History
                </h2>
                <p className="text-gray-600 dark:text-gray-300">
                  View and track all your orders here.
                </p>
              </div>

              {/* Orders Content */}
              <div className="space-y-4">
                {/* Placeholder for orders - replace with actual order data */}
                <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                  <div className="flex justify-between items-start mb-2">
                    {/* Image on the left */}
                    <div className="flex-shrink-0">
                      <img
                        src="https://down-id.img.susercontent.com/file/sg-11134201-7rbnh-lnq0znaamnd4ab"
                        alt="image product"
                        className="w-16 h-16 object-cover rounded"
                      />
                    </div>

                    {/* Description on the middle */}
                    <div className="flex-1 ml-4">
                      <h3 className="font-semibold text-gray-800 dark:text-white">
                        Order #12344
                      </h3>
                      <p className="text-md text-gray-600 dark:text-tertiary">
                        Adidas Running Shoes - Size 10
                      </p>
                      <div className="text-sm text-gray-600 dark:text-tertiary mt-1">
                        <p>Total: Rp{numberWithCommas(100000)}</p>
                      </div>
                    </div>

                    {/* Status on the right */}
                    <div className="flex-shrink-0 ml-4">
                      <div className="flex flex-col items-end">
                        <span className="px-3 py-1 bg-yellow-100 text-yellow-800 text-sm font-medium rounded-full">
                          Pending
                        </span>
                        <span className="block mt-2 text-xs text-gray-600 dark:text-tertiary">
                          Placed on January 15, 2025
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                  <div className="flex justify-between items-start mb-2">
                    {/* Image on the left */}
                    <div className="flex-shrink-0">
                      <img
                        src="https://down-id.img.susercontent.com/file/sg-11134201-7rbnh-lnq0znaamnd4ab"
                        alt="image product"
                        className="w-16 h-16 object-cover rounded"
                      />
                    </div>

                    {/* Description on the middle */}
                    <div className="flex-1 ml-4">
                      <h3 className="font-semibold text-gray-800 dark:text-white">
                        Order #12344
                      </h3>
                      <p className="text-md text-gray-600 dark:text-tertiary">
                        Adidas Running Shoes - Size 10
                      </p>
                      <div className="text-sm text-gray-600 dark:text-tertiary mt-1">
                        <p>Total: Rp{numberWithCommas(100000)}</p>
                      </div>
                    </div>

                    {/* Status on the right */}
                    <div className="flex-shrink-0 ml-4">
                      <div className="flex flex-col items-end">
                        <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-200 text-sm font-medium rounded-full">
                          Shipped
                        </span>
                        <span className="block mt-2 text-xs text-gray-600 dark:text-tertiary">
                          Placed on January 15, 2025
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                  <div className="flex justify-between items-start mb-2">
                    {/* Image on the left */}
                    <div className="flex-shrink-0">
                      <img
                        src="https://down-id.img.susercontent.com/file/sg-11134201-7rbnh-lnq0znaamnd4ab"
                        alt="image product"
                        className="w-16 h-16 object-cover rounded"
                      />
                    </div>

                    {/* Description on the middle */}
                    <div className="flex-1 ml-4">
                      <h3 className="font-semibold text-gray-800 dark:text-white">
                        Order #12344
                      </h3>
                      <p className="text-md text-gray-600 dark:text-tertiary">
                        Adidas Running Shoes - Size 10
                      </p>
                      <div className="text-sm text-gray-600 dark:text-tertiary mt-1">
                        <p>Total: Rp{numberWithCommas(100000)}</p>
                      </div>
                    </div>

                    {/* Status on the right */}
                    <div className="flex-shrink-0 ml-4">
                      <div className="flex flex-col items-end">
                        <span className="px-3 py-1 bg-green-100 dark:bg-dark text-green-800 dark:text-dark-secondary text-sm font-medium rounded-full">
                          Delivered
                        </span>
                        <span className="block mt-2 text-xs text-gray-600 dark:text-tertiary">
                          Placed on January 15, 2025
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Empty state - show this when no orders */}
                {/* <div className="text-center py-12">
                  <div className="text-gray-400 dark:text-gray-500 mb-4">
                    <IoBagCheckOutline className="mx-auto text-6xl" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-800 dark:text-white mb-2">
                    No orders yet
                  </h3>
                  <p className="text-gray-600 dark:text-tertiary mb-4">
                    When you place orders, they'll appear here.
                  </p>
                  <NavLink
                    to="/shop"
                    className="inline-block bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg transition-colors"
                  >
                    Start Shopping
                  </NavLink>
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Orders;

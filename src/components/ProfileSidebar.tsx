import { useState } from "react";
import { NavLink } from "react-router-dom";
import { auth } from "./firebase";
import { MdUpload } from "react-icons/md";
import { FaRegUser } from "react-icons/fa";
import { IoBagCheckOutline } from "react-icons/io5";
import { PiSignOutFill } from "react-icons/pi";

type UserProfile = {
  email: string;
  username: string;
};

type ProfileSidebarProps = {
  userProfile: UserProfile;
};

const ProfileSidebar: React.FC<ProfileSidebarProps> = ({ userProfile }) => {
  const [error, setError] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);

  const handleLogout = async () => {
    try {
      await auth.signOut();
      window.location.href = "/";
      console.log("User logged out successfully");
    } catch (error) {
      console.error("Error logging out:", error);
      setError("Error logging out. Please try again.");
    }
  };

  const handleFileUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith("image/")) {
      setError("Please select a valid image file");
      return;
    }

    // Validate file size (e.g., max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setError("File size must be less than 5MB");
      return;
    }

    setUploading(true);
    setError(null);

    try {
      console.log("Selected file:", file);
      // Add your image upload logic here
      // For example:
      // const imageUrl = await uploadProfileImage(file);
      // updateUserProfileImage(imageUrl);

      // Simulate upload delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      console.log("File uploaded successfully");
    } catch (error) {
      console.error("Error uploading file:", error);
      setError("Error uploading image. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="lg:col-span-1">
      <div className="bg-white dark:bg-secondary dark:border-white border shadow-lg rounded-lg overflow-hidden">
        {/* Profile Header */}
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex flex-col items-center">
            {/* Profile Image */}
            <div className="relative w-24 h-24 mb-4">
              <div className="w-full h-full rounded-full overflow-hidden bg-gray-200 dark:bg-gray-600">
                <img
                  src="https://i.pinimg.com/236x/02/72/35/02723528ae01d17bbf67ccf6b8da8a6b.jpg"
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Upload Overlay */}
              <div className="absolute inset-0 bg-black bg-opacity-50 rounded-full flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-200 cursor-pointer">
                {uploading ? (
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
                ) : (
                  <MdUpload className="text-white text-xl" />
                )}
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  disabled={uploading}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed"
                  aria-label="Upload profile picture"
                />
              </div>
            </div>

            {/* User Info */}
            <h1 className="text-xl font-semibold text-gray-800 dark:text-white mb-1">
              {userProfile.username}
            </h1>
            <p className="text-gray-600 dark:text-gray-300 text-sm text-center break-all">
              {userProfile.email}
            </p>

            {/* Error Message */}
            {error && (
              <div className="mt-2 p-2 bg-red-100 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-md">
                <p className="text-red-600 dark:text-red-400 text-xs text-center">
                  {error}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Navigation Menu */}
        <nav className="p-2">
          <ul className="space-y-1">
            <li>
              <NavLink
                to="/profile"
                end
                className={({ isActive }) =>
                  `w-full text-left px-4 py-3 rounded-lg transition-all duration-200 flex items-center gap-3 ${
                    isActive
                      ? "bg-green-50 dark:bg-dark-secondary text-primary dark:text-black font-medium"
                      : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                  }`
                }
              >
                <FaRegUser className="text-lg flex-shrink-0" />
                <span className="font-primary">My Profile</span>
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/orders"
                className={({ isActive }) =>
                  `w-full text-left px-4 py-3 rounded-lg transition-all duration-200 flex items-center gap-3 ${
                    isActive
                      ? "bg-green-50 dark:bg-dark-secondary text-primary dark:text-black font-medium"
                      : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                  }`
                }
              >
                <IoBagCheckOutline className="text-lg flex-shrink-0" />
                <span className="font-primary">My Orders</span>
              </NavLink>
            </li>

            <li className="pt-2 border-t border-gray-200 dark:border-gray-700 mt-2">
              <button
                onClick={handleLogout}
                className="w-full text-left px-4 py-3 rounded-lg text-red-600 dark:text-red-200 transition-all duration-200 flex items-center gap-3"
              >
                <PiSignOutFill className="text-lg flex-shrink-0" />
                <span className="font-primary">Logout</span>
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default ProfileSidebar;

import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { BsCart } from "react-icons/bs";
import { FaRegHeart } from "react-icons/fa";
import { FaRegUserCircle } from "react-icons/fa";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "./firebase";
import { toast } from "react-toastify";

import ToggleDarkMode from "./ToggleDarkMode";
import logoLight from "../assets/images/logo.png";
import logoDark from "../assets/images/logo-dark.png";
import SearchBar from "./SearchBar";
import LoginModal from "./LoginModal";
import RegisterModal from "./RegisterModal";

type RootState = {
  cart: {
    cartItems: Array<number>;
  };
  wishlist: {
    wishlistItems: Array<number>;
  };
};

export default function Navbar() {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const cartItems = useSelector((state: RootState) => state.cart.cartItems);
  const wishlistItems = useSelector(
    (state: RootState) => state.wishlist.wishlistItems
  );

  const totalItems = cartItems.length;
  const wishlistCount = wishlistItems.length;

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const checkDarkMode = () => {
      const isDarkMode = document.documentElement.classList.contains("dark");
      setIsDark(isDarkMode);
    };
    checkDarkMode();
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === "class") {
          checkDarkMode();
        }
      });
    });
    observer.observe(document.documentElement, { attributes: true });
    return () => observer.disconnect();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      toast.success("Logged out successfully");
    } catch {
      toast.error("Error logging out");
    }
  };

  return (
    <header>
      <nav className="bg-white dark:bg-dark w-full h-20 sticky top-0 transition-colors duration-200 z-50">
        <div className="w-full h-full">
          <div className="relative flex h-full mx-auto px-6 items-center">
            {/* Left: Search */}
            <div className="hidden md:block">
              <SearchBar />
            </div>

            {/* Center: Logo */}
            <div className="absolute left-1/2 -translate-x-1/2 transition-opacity duration-200">
              <Link to="/">
                <img
                  src={isDark ? logoDark : logoLight}
                  width={50}
                  height={50}
                  alt="Brand Logo"
                />
              </Link>
            </div>

            {/* Right: Icons */}
            <div className="ml-auto">
              <ul className="flex items-center gap-x-8 lg:gap-2">
                <li className="relative">
                  <ToggleDarkMode />
                </li>

                {isLoggedIn ? (
                  <>
                    <li className="relative hidden md:block">
                      <Link
                        to="/cart"
                        className="hover:text-primary dark:text-white dark:hover:text-dark-secondary transition-colors"
                        aria-label="Cart"
                      >
                        <BsCart className="w-6 h-6" />
                        {totalItems > 0 && (
                          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-[16px] h-4 flex items-center justify-center">
                            {totalItems}
                          </span>
                        )}
                      </Link>
                    </li>
                    <li className="relative hidden md:block">
                      <Link
                        to="/wishlist"
                        className="hover:text-primary dark:text-white dark:hover:text-dark-secondary transition-colors"
                        aria-label="Wishlist"
                      >
                        <FaRegHeart className="w-6 h-6" />
                        {wishlistCount > 0 && (
                          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                            {wishlistCount}
                          </span>
                        )}
                      </Link>
                    </li>
                    <li className="relative hidden md:block">
                      <Link
                        to="/profile"
                        className="hover:text-primary dark:text-white dark:hover:text-dark-secondary transition-colors"
                        aria-label="Profile"
                      >
                        <FaRegUserCircle className="w-6 h-6" />
                      </Link>
                    </li>
                    <li className="relative hidden md:block">
                      <button
                        onClick={handleLogout}
                        className="text-primary dark:text-dark-secondary font-bold py-2 px-4 rounded cursor-pointer"
                        aria-label="Logout"
                      >
                        Logout
                      </button>
                    </li>
                  </>
                ) : (
                  <li className="relative hidden md:block">
                    <div className="gap-2 flex">
                      <LoginModal
                        isOpen={isLoginOpen}
                        onOpen={() => setIsLoginOpen(true)}
                        onClose={() => setIsLoginOpen(false)}
                        openRegisterModal={() => {
                          setIsLoginOpen(false);
                          setIsRegisterOpen(true);
                        }}
                        onSubmit={(values) => {
                          console.log("Login values:", values);
                          setIsLoginOpen(false);
                        }}
                      />

                      <RegisterModal
                        isOpen={isRegisterOpen}
                        onOpen={() => setIsRegisterOpen(true)}
                        onClose={() => setIsRegisterOpen(false)}
                        openLoginModal={() => {
                          setIsRegisterOpen(false);
                          setIsLoginOpen(true);
                        }}
                        onSubmit={(values) => {
                          console.log("Register values:", values);
                          setIsRegisterOpen(false);
                        }}
                      />
                    </div>
                  </li>
                )}
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}

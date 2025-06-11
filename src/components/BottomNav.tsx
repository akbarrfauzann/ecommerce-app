import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { BsCart } from "react-icons/bs";
import { FaRegHeart, FaRegUser } from "react-icons/fa";
import { FiSearch } from "react-icons/fi";

import logoLight from "../assets/images/logo.png";
import logoDark from "../assets/images/logo-dark.png";

type RootState = {
  cart: {
    cartItems: Array<number>;
  };
  wishlist: {
    wishlistItems: Array<number>;
  };
};

export default function BottomNav() {
  const cartItems = useSelector((state: RootState) => state.cart.cartItems);
  const wishlistItems = useSelector(
    (state: RootState) => state.wishlist.wishlistItems
  );
  const totalItems = cartItems.length;
  const wishlistCount = wishlistItems.length;

  const [isDark, setIsDark] = useState(false);

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

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white dark:bg-dark border-t dark:border-dark-secondary z-50 md:hidden">
      <ul className="flex justify-around items-center font-primary h-16">
        <li>
          <Link
            to="/"
            className="flex flex-col items-center text-sm hover:text-primary dark:text-white dark:hover:text-dark-secondary"
          >
            <img
              src={isDark ? logoDark : logoLight}
              alt="Home"
              className="w-6 h-6"
            />
            <span className="text-xs">Home</span>
          </Link>
        </li>

        <li>
          <Link
            to="/search"
            className="flex flex-col items-center text-sm hover:text-primary dark:text-white dark:hover:text-dark-secondary"
          >
            <FiSearch className="w-6 h-6 mb-1" />
            <span className="text-xs">Search</span>
          </Link>
        </li>

        <li className="relative">
          <Link
            to="/cart"
            className="flex flex-col items-center text-sm hover:text-primary dark:text-white dark:hover:text-dark-secondary"
          >
            <BsCart className="w-6 h-6 mb-1" />
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                {totalItems}
              </span>
            )}
            <span className="text-xs">Cart</span>
          </Link>
        </li>

        <li className="relative">
          <Link
            to="/wishlist"
            className="flex flex-col items-center text-sm hover:text-primary dark:text-white dark:hover:text-dark-secondary"
          >
            <FaRegHeart className="w-6 h-6 mb-1" />
            {wishlistCount > 0 && (
              <span className="absolute -top-1 right-2 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                {wishlistCount}
              </span>
            )}
            <span className="text-xs">Wishlist</span>
          </Link>
        </li>

        <li>
          <Link
            to="/profile"
            className="flex flex-col items-center text-sm hover:text-primary dark:text-white dark:hover:text-dark-secondary"
          >
            <FaRegUser className="w-6 h-6 mb-1" />
            <span className="text-xs">Profile</span>
          </Link>
        </li>
      </ul>
    </nav>
  );
}

import { useState, useEffect } from "react";
import { GrCart } from "react-icons/gr";
import { FaRegHeart } from "react-icons/fa";
import { FaRegUser } from "react-icons/fa6";
import { FiSearch } from "react-icons/fi";
import logoLight from "../assets/images/logo.png";
import logoDark from "../assets/images/logo-dark.png";
import ToggleDarkMode from "./ToggleDarkMode";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

type RootState = {
  cart: {
    cartItems: Array<number>;
  };
};
export default function Header() {
  const cartItems = useSelector((state: RootState) => state.cart.cartItems);
  const totalItems = cartItems.length;

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
    <header className="container mx-auto">
      <nav className="bg-white dark:bg-dark w-full h-20 sticky top-0 transition-colors duration-200">
        <div className="w-full h-full">
          <div className="relative flex h-full mx-auto px-6 items-center">
            {/* Left side - Search */}
            <div>
              <div className="flex items-center rounded-md bg-gray-100 dark:bg-tertiary px-2 py-1.5 w-full">
                <FiSearch className="w-4 h-4 md:w-5 md:h-5 text-primary dark:text-black" />
                <input
                  type="search"
                  name="search"
                  placeholder="Search product"
                  className="bg-transparent text-primary dark:text-black w-full font-primary outline-none ml-1 md:ml-2 text-sm md:text-base placeholder-primary dark:placeholder-black"
                />
              </div>
            </div>
            {/* Center - Logo */}
            <div className="absolute left-1/2 -translate-x-1/2 transition-opacity duration-200">
              <Link to="/">
                <img src={isDark ? logoDark : logoLight} width={50} height={50} alt="Brand Logo" />
              </Link>
            </div>
            {/* Right side - Icons */}
            <div className="ml-auto">
              <ul className="flex items-center gap-x-4 lg:gap-2">
                <li>
                  <ToggleDarkMode />
                </li>
                <li className="relative">
                  <Link to="/cart" className="text-xl hover:text-primary dark:text-white dark:hover:text-dark-secondary transition-colors">
                    <GrCart />
                    {totalItems > 0 && <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">{totalItems}</span>}
                  </Link>
                </li>
                <li className="relative">
                  <Link to="/wishlist" className="text-xl hover:text-primary dark:text-white dark:hover:text-dark-secondary transition-colors">
                    <FaRegHeart />
                    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">1</span>
                  </Link>
                </li>
                <li>
                  <Link to="/checkout" className="text-xl hover:text-primary dark:text-white dark:hover:text-dark-secondary transition-colors">
                    <FaRegUser />
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}

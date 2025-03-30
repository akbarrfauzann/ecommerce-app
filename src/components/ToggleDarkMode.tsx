// ToggleDarkMode.tsx
import { useState, useEffect } from "react";
import { IoSunny } from "react-icons/io5";
import { FaMoon } from "react-icons/fa";

const ToggleDarkMode = () => {
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("darkMode") === "true" ? true : false;
  });

  useEffect(() => {
    document.documentElement.classList.remove("dark");

    if (!localStorage.getItem("darkMode")) {
      localStorage.setItem("darkMode", "false");
    }

    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("darkMode", "true");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("darkMode", "false");
    }
  }, [darkMode]);

  const handleClick = () => {
    setDarkMode(!darkMode);
  };

  return (
    <button onClick={handleClick} className="text-xl transition-colors duration-200 cursor-pointer" aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}>
      {darkMode ? <IoSunny className="text-yellow-400 hover:text-yellow-500" /> : <FaMoon className="text-black hover:text-secondary" />}
    </button>
  );
};

export default ToggleDarkMode;

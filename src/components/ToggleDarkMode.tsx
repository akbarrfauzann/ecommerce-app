import { IoSunny } from "react-icons/io5";
import { FaMoon } from "react-icons/fa";
import useDarkMode from "../hooks/useDarkMode";

const ToggleDarkMode = () => {
  const [isDarkMode, setIsDarkMode] = useDarkMode();

  return (
    <button
      onClick={() => setIsDarkMode(!isDarkMode)}
      className="text-xl align-middle transition-colors duration-200 cursor-pointer"
      aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
    >
      {isDarkMode ? (
        <IoSunny className="text-yellow-400 hover:text-yellow-500" />
      ) : (
        <FaMoon className="text-black hover:text-secondary" />
      )}
    </button>
  );
};

export default ToggleDarkMode;

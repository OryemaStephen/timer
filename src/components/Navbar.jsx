import { useState, useEffect } from "react";
import { Moon, Sun } from "lucide-react";
import logo from "../assets/logo.png";

const Navbar = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  // const menuItems = [{ text: "Home", sectionId: "home" }];

  // Toggle dark mode
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  // Apply dark mode class to the root element
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  return (
    <>
      <nav className="fixed top-0 z-50 w-full bg-white dark:bg-gray-900">
        <div className="max-w-6xl px-4 mx-auto sm:px-8 lg:px-0">
          <div className="flex items-center justify-between h-[80px] lg:h-[84px] ">
            {/* Logo */}
            <div className="flex items-center">
              <div className="text-xl uppercase">
                <img
                  src={logo}
                  alt="Logo"
                  className="object-cover w-16 h-auto rounded-full"
                />
              </div>
            </div>

            {/* Desktop Menu */}
            <div className="items-center hidden space-x-8 md:flex">
              {/* Dark Mode Toggle Button */}
              <button
                onClick={toggleDarkMode}
                className="p-2 text-gray-600 rounded-full dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none"
              >
                {isDarkMode ? (
                  <Sun className="w-6 h-6" />
                ) : (
                  <Moon className="w-6 h-6" />
                )}
              </button>
            </div>

            {/* Mobile Menu Button */}
            <div className="flex items-center md:hidden">
              {/* Dark Mode Toggle Button for Mobile */}
              <button
                onClick={toggleDarkMode}
                className="block w-full px-3 py-2 text-sm font-light text-left text-gray-600 rounded-md dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100"
              >
                {isDarkMode ? (
                  <Sun className="w-6 h-6" />
                ) : (
                  <Moon className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;

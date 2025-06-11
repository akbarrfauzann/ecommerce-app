import { useState, useEffect } from "react";
import logoLight from "../assets/images/logo.png";
import logoDark from "../assets/images/logo-dark.png";

type FooterLink = {
  title: string;
  url: string;
};

type FooterSection = {
  title: string;
  links: FooterLink[];
};

const Footer = () => {
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

  const footerSections: FooterSection[] = [
    {
      title: "Resources",
      links: [
        { title: "About Us", url: "#" },
        { title: "Blog", url: "#" },
      ],
    },
    {
      title: "Follow us",
      links: [{ title: "Instagram", url: "#" }],
    },
    {
      title: "Legal",
      links: [
        { title: "Terms & Conditions", url: "#" },
        { title: "Terms of Use", url: "#" },
        { title: "Privacy Policy", url: "#" },
      ],
    },
  ];

  return (
    <footer className="bg-white dark:bg-dark text-secondary">
      <div className="px-4 py-8 md:py-12">
        <div className="flex flex-col md:flex-row md:items-start md:justify-around gap-8">
          {/* Logo Section */}
          <div className="flex justify-center md:justify-start">
            <img
              src={isDark ? logoDark : logoLight}
              alt="Company Logo"
              className="h-16 md:h-28 w-auto object-contain transition-opacity duration-200"
            />
          </div>

          {/* Links Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8 md:gap-16">
            {footerSections.map((section) => (
              <div key={section.title}>
                <h2 className="text-sm font-bold text-primary dark:text-dark-secondary uppercase mb-4">
                  {section.title}
                </h2>
                <ul className="space-y-3">
                  {section.links.map((link) => (
                    <li key={link.title}>
                      <a
                        href={link.url}
                        className="text-secondary dark:text-tertiary dark:hover:text-white hover:text-black hover:underline transition-colors"
                      >
                        {link.title}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

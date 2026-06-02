import { useState, useEffect } from "react";
import { Menu, X, Download } from "lucide-react";
import { Button } from "./ui/button";

interface HeaderProps {
  onDownloadReportClick: () => void;
}

export default function Header({
  onDownloadReportClick,
}: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] =
    useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () =>
      window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "#home" },
    { name: "About", href: "#about" },
    { name: "Services", href: "#services" },
    { name: "Packages", href: "#packages" },
    { name: "Home Collection", href: "#home-collection" },
    { name: "Why Choose Us", href: "#why-choose" },
    { name: "Testimonials", href: "#testimonials" },
    { name: "Contact", href: "#contact" },
  ];

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white shadow-md py-4"
          : "bg-white/95 backdrop-blur-sm py-6"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-teal-500 to-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">
                I
              </span>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Indipath Multidiagnostic LLP.
              </h1>
              <p className="text-xs text-teal-600">
                Your Health, Our Priority
              </p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => scrollToSection(link.href)}
                className="text-gray-700 hover:text-teal-600 transition-colors text-sm font-medium"
              >
                {link.name}
              </button>
            ))}
            <Button
              onClick={onDownloadReportClick}
              className="bg-teal-600 hover:bg-teal-700 text-white"
            >
              <Download className="w-4 h-4 mr-2" />
              Download Report
            </Button>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() =>
              setIsMobileMenuOpen(!isMobileMenuOpen)
            }
            className="lg:hidden text-gray-700 hover:text-teal-600 transition-colors"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <nav className="lg:hidden mt-6 pb-4 space-y-4 border-t border-gray-200 pt-4">
            {navLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => scrollToSection(link.href)}
                className="block w-full text-left text-gray-700 hover:text-teal-600 transition-colors text-sm font-medium py-2"
              >
                {link.name}
              </button>
            ))}
            <Button
              onClick={() => {
                onDownloadReportClick();
                setIsMobileMenuOpen(false);
              }}
              className="w-full bg-teal-600 hover:bg-teal-700 text-white"
            >
              <Download className="w-4 h-4 mr-2" />
              Download Report
            </Button>
          </nav>
        )}
      </div>
    </header>
  );
}
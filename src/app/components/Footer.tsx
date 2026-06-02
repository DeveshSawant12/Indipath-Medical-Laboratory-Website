import {
  MessageCircle,
  Instagram,
  Facebook,
  Globe,
} from "lucide-react";
import { useNavigate } from "react-router";
import { toast } from "sonner";

export default function Footer() {
  const navigate = useNavigate();
  const quickLinks = [
    { name: "Home", href: "#home" },
    { name: "About", href: "#about" },
    { name: "Services", href: "#services" },
    { name: "Packages", href: "#packages" },
    { name: "Contact", href: "#contact" },
  ];

  const popularTests = [
    "CBC",
    "Thyroid",
    "Diabetes",
    "Lipid Profile",
    "Vitamin Test",
  ];

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Hidden admin access via triple-click on logo
  const handleLogoClick = (e: React.MouseEvent) => {
    if (e.detail === 3) {
      // Triple-click detected
      toast.success("Redirecting to Admin Portal...");
      setTimeout(() => {
        navigate("/admin");
      }, 300);
    }
  };

  return (
    <footer className="bg-gray-900 text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Company Info */}
          <div>
            <div
              className="flex items-center space-x-3 mb-4 cursor-default select-none transition-opacity hover:opacity-90"
              onClick={handleLogoClick}
              title=""
            >
              <div className="w-10 h-10 bg-gradient-to-br from-teal-500 to-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">
                  I
                </span>
              </div>
              <div>
                <h3 className="text-xl font-bold">
                  Indipath Multidiagnostic LLP.
                </h3>
                <p className="text-xs text-teal-400">
                  Your Health, Our Priority
                </p>
              </div>
            </div>
            <p className="text-gray-400 text-sm">
              Trusted medical laboratory providing accurate
              diagnostic services with modern technology and
              expert care.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-bold mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <button
                    onClick={() => scrollToSection(link.href)}
                    className="text-gray-400 hover:text-teal-400 transition-colors text-sm"
                  >
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Popular Tests */}
          <div>
            <h4 className="text-lg font-bold mb-4">
              Popular Tests
            </h4>
            <ul className="space-y-2">
              {popularTests.map((test) => (
                <li
                  key={test}
                  className="text-gray-400 text-sm"
                >
                  {test}
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-bold mb-4">
              Contact Info
            </h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li>Phone: +91 89752 90538</li>
              <li>Email: indipathlab@gmail.com</li>
              <li>
                Address: 22, Mahapurush Complex, Bazarpeth,
                Tal-Kankavli, Sindhudurg, Maharashtra-416602
              </li>
              <li className="pt-2">
                <strong className="text-white">
                  Working Hours:
                </strong>
                <br />
                Monday - Sunday
                <br />
                7:00 AM - 9:00 PM
              </li>
            </ul>
          </div>
        </div>

        {/* Social Media */}
        <div className="border-t border-gray-800 pt-8 mb-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-sm">
              Follow us on social media
            </p>
            <div className="flex gap-4">
              <a
                href="https://wa.me/918975290538"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-green-600 hover:bg-green-700 rounded-full flex items-center justify-center transition-all transform hover:scale-110"
              >
                <MessageCircle className="w-5 h-5" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gradient-to-br from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 rounded-full flex items-center justify-center transition-all transform hover:scale-110"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-blue-600 hover:bg-blue-700 rounded-full flex items-center justify-center transition-all transform hover:scale-110"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="https://google.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-red-600 hover:bg-red-700 rounded-full flex items-center justify-center transition-all transform hover:scale-110"
              >
                <Globe className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-800 pt-8 text-center">
          <p className="text-gray-400 text-sm">
            © 2026 Indipath Multidiagnostic LLP. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
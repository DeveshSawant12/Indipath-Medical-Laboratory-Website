import { useState, useEffect } from "react";
import { MessageCircle, Phone, ArrowUp } from "lucide-react";
import { Button } from "./ui/button";

export default function FloatingButtons() {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 500);
    };
    window.addEventListener("scroll", handleScroll);
    return () =>
      window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      {/* WhatsApp Button */}
      <a
        href="https://wa.me/918975290538"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-40 w-14 h-14 bg-green-600 hover:bg-green-700 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transform hover:scale-110 transition-all"
      >
        <MessageCircle className="w-7 h-7 text-white" />
      </a>

      {/* Call Button */}
      <a
        href="tel:+918975290538"
        className="fixed bottom-24 right-6 z-40 w-14 h-14 bg-teal-600 hover:bg-teal-700 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transform hover:scale-110 transition-all"
      >
        <Phone className="w-7 h-7 text-white" />
      </a>

      {/* Scroll to Top Button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-[168px] right-6 z-40 w-14 h-14 bg-blue-600 hover:bg-blue-700 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transform hover:scale-110 transition-all animate-in fade-in slide-in-from-bottom-5"
        >
          <ArrowUp className="w-7 h-7 text-white" />
        </button>
      )}
    </>
  );
}
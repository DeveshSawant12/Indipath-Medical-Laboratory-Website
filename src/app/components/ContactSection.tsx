import { useState } from "react";
import { motion } from "motion/react";
import { useInView } from "./hooks/useInView";
import { Phone, Mail, MapPin, Clock } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { toast } from "sonner";

export default function ContactSection() {
  const [ref, isInView] = useInView({ threshold: 0.1 });
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !formData.name ||
      !formData.phone ||
      !formData.message
    ) {
      toast.error("Please fill all fields");
      return;
    }

    const whatsappMessage = `Hello Indipath, I want to inquire about tests.\n\nMy name is ${formData.name}\nPhone: ${formData.phone}\nMessage: ${formData.message}`;
    window.open(
      `https://wa.me/918975290538?text=${encodeURIComponent(whatsappMessage)}`,
      "_blank",
    );

    toast.success("Redirecting to WhatsApp...");
    setFormData({ name: "", phone: "", message: "" });
  };

  const contactInfo = [
    {
      icon: Phone,
      title: "Phone",
      info: "+91 8975290538",
      link: "tel:+918975290538",
      color: "from-green-500 to-emerald-500",
    },
    {
      icon: Mail,
      title: "Email",
      info: "indipathlab@gmail.com",
      link: "mailto:indipathlab@gmail.com",
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: MapPin,
      title: "Address",
      info: " Address: 22, Mahapurush Complex, Bazarpeth,Tal-Kankavli, Sindhudurg, Maharashtra-416602",
      link: "#",
      color: "from-purple-500 to-pink-500",
    },
    {
      icon: Clock,
      title: "Working Hours",
      info: "Monday - Sunday: 7:00 AM - 9:00 PM\nEmergency Support Available",
      link: "#",
      color: "from-orange-500 to-red-500",
    },
  ];

  return (
    <section
      id="contact"
      ref={ref}
      className="py-20 bg-gradient-to-br from-teal-50 via-blue-50 to-white"
    >
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Contact Us
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-teal-500 to-blue-600 mx-auto mb-6 rounded-full"></div>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Have questions? Get in touch with us and we'll
            respond as soon as possible
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-2xl p-8 shadow-lg"
          >
            <h3 className="text-2xl font-bold text-gray-900 mb-6">
              Send us a message
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name
                </label>
                <Input
                  type="text"
                  placeholder="Enter your name"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      name: e.target.value,
                    })
                  }
                  className="w-full"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number
                </label>
                <Input
                  type="tel"
                  placeholder="Enter your phone number"
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      phone: e.target.value,
                    })
                  }
                  className="w-full"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Message
                </label>
                <Textarea
                  placeholder="Enter your message"
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      message: e.target.value,
                    })
                  }
                  className="w-full min-h-[120px]"
                />
              </div>
              <Button
                type="submit"
                className="w-full bg-teal-600 hover:bg-teal-700 text-white"
              >
                Send Message via WhatsApp
              </Button>
            </form>
          </motion.div>

          {/* Contact Info Cards */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="space-y-4"
          >
            {contactInfo.map((info, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
              >
                <div className="flex items-start gap-4">
                  <div
                    className={`w-12 h-12 bg-gradient-to-br ${info.color} rounded-xl flex items-center justify-center flex-shrink-0`}
                  >
                    <info.icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 mb-1">
                      {info.title}
                    </h4>
                    <p className="text-gray-600 text-sm whitespace-pre-line">
                      {info.info}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Google Maps Embed */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="bg-white rounded-2xl p-4 shadow-lg overflow-hidden"
        >
          <iframe
            title="Google Map Location"
            src="https://www.google.com/maps?q=7P85%2B6PV%2C%20vikas%20generalaharas%20store%2C%20Bazarpet%20Rd%2C%20Bazarpeth%2C%20Kankavli%2C%20Maharashtra%20416602&output=embed"
            width="100%"
            height="400"
            className="rounded-xl border-0"
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </motion.div>
      </div>
    </section>
  );
}
import { motion } from "motion/react";
import { useInView } from "./hooks/useInView";
import {
  Home,
  UserCheck,
  Shield,
  Clock,
  FileCheck,
  Phone,
  MessageCircle,
} from "lucide-react";
import { Button } from "./ui/button";

export default function HomeCollectionSection() {
  const [ref, isInView] = useInView({ threshold: 0.2 });

  const benefits = [
    {
      icon: Home,
      title: "Free Home Visit",
      description:
        "No extra charges for home sample collection",
    },
    {
      icon: UserCheck,
      title: "Certified Phlebotomist",
      description:
        "Trained professionals handle sample collection",
    },
    {
      icon: Shield,
      title: "Safe & Hygienic Collection",
      description:
        "Strict safety protocols and sterilized equipment",
    },
    {
      icon: Clock,
      title: "Fast Report Delivery",
      description: "Get results within 24-48 hours digitally",
    },
    {
      icon: FileCheck,
      title: "Digital Reports via Portal",
      description:
        "Secure download with Report ID & DOB verification",
    },
  ];

  const handleWhatsAppBooking = () => {
    const message =
      "Hello Indipath, I want to book home sample collection. Please assist me.";
    window.open(
      `https://wa.me/918975290538?text=${encodeURIComponent(message)}`,
      "_blank",
    );
  };

  const handleCallBooking = () => {
    window.open("tel:+918975290538", "_blank");
  };

  return (
    <section
      id="home-collection"
      ref={ref}
      className="py-20 bg-gradient-to-br from-teal-50 via-blue-50 to-cyan-50"
    >
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Free Home Sample Collection
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-teal-500 to-blue-600 mx-auto mb-6 rounded-full"></div>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto">
            Indipath provides{" "}
            <strong>Free Home Sample Collection</strong> for
            patients, ensuring comfort and convenience without
            visiting the lab. Book your appointment today!
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
            >
              <div className="w-14 h-14 bg-gradient-to-br from-teal-500 to-blue-600 rounded-xl flex items-center justify-center mb-4">
                <benefit.icon className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                {benefit.title}
              </h3>
              <p className="text-gray-600">
                {benefit.description}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Button
            onClick={handleWhatsAppBooking}
            size="lg"
            className="bg-green-600 hover:bg-green-700 text-white text-lg px-8 py-6 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all"
          >
            <MessageCircle className="w-5 h-5 mr-2" />
            Book on WhatsApp
          </Button>
          <Button
            onClick={handleCallBooking}
            size="lg"
            variant="outline"
            className="bg-white border-2 border-teal-600 text-teal-600 hover:bg-teal-50 text-lg px-8 py-6 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all"
          >
            <Phone className="w-5 h-5 mr-2" />
            Call Now
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
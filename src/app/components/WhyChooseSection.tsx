import { motion } from "motion/react";
import { useInView } from "./hooks/useInView";
import {
  Award,
  Zap,
  DollarSign,
  Download,
  Users,
  Shield,
  Home,
  Headphones,
} from "lucide-react";

export default function WhyChooseSection() {
  const [ref, isInView] = useInView({ threshold: 0.1 });

  const reasons = [
    {
      icon: Award,
      title: "NABL Accreditation Standard Testing",
      description:
        "Certified laboratory maintaining highest quality standards",
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: Zap,
      title: "Quick & Reliable Reports",
      description:
        "Fast turnaround time with accurate diagnostic results",
      color: "from-teal-500 to-green-500",
    },
    {
      icon: DollarSign,
      title: "Affordable Pricing",
      description:
        "Competitive rates without compromising on quality",
      color: "from-green-500 to-emerald-500",
    },
    {
      icon: Download,
      title: "Digital Report Downloads",
      description:
        "Secure online access to your reports anytime, anywhere",
      color: "from-purple-500 to-pink-500",
    },
    {
      icon: Users,
      title: "Experienced Staff",
      description:
        "Expert pathologists and certified medical professionals",
      color: "from-orange-500 to-red-500",
    },
    {
      icon: Shield,
      title: "Hygienic Practices",
      description:
        "Strict hygiene protocols and sterilization procedures",
      color: "from-indigo-500 to-purple-500",
    },
    {
      icon: Home,
      title: "Home Collection Available",
      description:
        "Free doorstep sample collection service for your convenience",
      color: "from-pink-500 to-rose-500",
    },
    {
      icon: Headphones,
      title: "24/7 Customer Support",
      description:
        "Round-the-clock assistance for all your queries",
      color: "from-cyan-500 to-blue-500",
    },
  ];

  return (
    <section
      id="why-choose"
      ref={ref}
      className="py-20 bg-white"
    >
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Why Choose Indipath?
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-teal-500 to-blue-600 mx-auto mb-6 rounded-full"></div>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Your trusted partner in healthcare diagnostics with
            commitment to excellence
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {reasons.map((reason, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.6,
                delay: index * 0.05,
              }}
              className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-6 shadow-md hover:shadow-2xl transform hover:scale-105 transition-all duration-300 border border-gray-100"
            >
              <div
                className={`w-14 h-14 bg-gradient-to-br ${reason.color} rounded-xl flex items-center justify-center mb-4`}
              >
                <reason.icon className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                {reason.title}
              </h3>
              <p className="text-gray-600 text-sm">
                {reason.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
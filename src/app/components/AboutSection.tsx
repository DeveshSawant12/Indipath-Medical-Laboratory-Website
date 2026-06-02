import { motion } from "motion/react";
import { useInView } from "./hooks/useInView";
import { Award, Microscope, Users, Shield } from "lucide-react";

export default function AboutSection() {
  const [ref, isInView] = useInView({ threshold: 0.2 });

  const features = [
    {
      icon: Award,
      title: "High Accuracy Reports",
      description:
        "NABL accredited laboratory with 99.9% accuracy in all diagnostic tests",
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: Microscope,
      title: "Modern Lab Equipment",
      description:
        "State-of-the-art technology and automated analyzers for precise results",
      color: "from-teal-500 to-green-500",
    },
    {
      icon: Users,
      title: "Certified Medical Team",
      description:
        "Expert pathologists and technicians with years of experience",
      color: "from-purple-500 to-pink-500",
    },
    {
      icon: Shield,
      title: "Safety & Hygiene Standards",
      description:
        "Strict protocols ensuring patient safety and sample integrity",
      color: "from-orange-500 to-red-500",
    },
  ];

  return (
    <section
      id="about"
      ref={ref}
      className="py-20 bg-gradient-to-b from-white to-gray-50"
    >
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            About Indipath
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-teal-500 to-blue-600 mx-auto mb-6 rounded-full"></div>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Indipath is a trusted medical laboratory dedicated
            to accurate diagnostic testing, modern technology,
            and patient-first healthcare services. We ensure
            reliable reports with strict hygiene standards,
            expert staff, and fast digital report delivery.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transform hover:scale-105 hover:-translate-y-2 transition-all duration-300 border border-gray-100"
            >
              <div
                className={`w-16 h-16 bg-gradient-to-br ${feature.color} rounded-2xl flex items-center justify-center mb-4`}
              >
                <feature.icon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
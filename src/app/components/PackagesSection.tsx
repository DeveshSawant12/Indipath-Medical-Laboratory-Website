import { motion } from "motion/react";
import { useInView } from "./hooks/useInView";
import { Check, Star, Calendar } from "lucide-react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";

export default function PackagesSection() {
  const [ref, isInView] = useInView({ threshold: 0.1 });

  const packages = [
    {
      name: "Basic Health Checkup",
      price: "₹499",
      tests: [
        "CBC",
        "Blood Sugar",
        "Urine Test",
        "Basic Vitals",
      ],
      reportTime: "24 hours",
      popular: false,
    },
    {
      name: "Standard Full Body Checkup",
      price: "₹1,299",
      tests: [
        "CBC",
        "Lipid Profile",
        "LFT",
        "KFT",
        "Thyroid",
        "Blood Sugar",
        "Urine Test",
      ],
      reportTime: "24 hours",
      popular: false,
    },
    {
      name: "Diabetes Care Package",
      price: "₹899",
      tests: [
        "Fasting Sugar",
        "PP Sugar",
        "HbA1c",
        "Lipid Profile",
        "KFT",
      ],
      reportTime: "24 hours",
      popular: false,
    },
    {
      name: "Heart Health Package",
      price: "₹1,499",
      tests: [
        "Lipid Profile",
        "ECG",
        "CBC",
        "Blood Pressure",
        "Cardiac Risk Markers",
      ],
      reportTime: "48 hours",
      popular: false,
    },
    {
      name: "Women Wellness Package",
      price: "₹1,799",
      tests: [
        "CBC",
        "Thyroid",
        "Vitamin D",
        "Iron Studies",
        "Hormone Panel",
        "PAP Smear",
      ],
      reportTime: "48 hours",
      popular: false,
    },
    {
      name: "Premium Full Body Package",
      price: "₹2,999",
      tests: [
        "Complete CBC",
        "Lipid Profile",
        "LFT",
        "KFT",
        "Thyroid",
        "Vitamin D",
        "Vitamin B12",
        "HbA1c",
        "Urine Test",
        "ECG",
        "Ultrasound",
      ],
      reportTime: "48 hours",
      popular: true,
    },
  ];

  const handleBookPackage = (packageName: string) => {
    const message = `Hello IndipATH, I want to book ${packageName}. Please assist me.`;
    window.open(
      `https://wa.me/918975290538?text=${encodeURIComponent(message)}`,
      "_blank",
    );
  };

  return (
    <section
      id="packages"
      ref={ref}
      className="py-20 bg-gradient-to-b from-gray-50 to-white"
    >
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Affordable Test Packages
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-teal-500 to-blue-600 mx-auto mb-6 rounded-full"></div>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Choose from our comprehensive health packages
            designed for complete wellness monitoring
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {packages.map((pkg, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className={`relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300 border-2 ${
                pkg.popular
                  ? "border-teal-500"
                  : "border-gray-100"
              }`}
            >
              {pkg.popular && (
                <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-teal-500 to-blue-600 text-white px-4 py-1 flex items-center gap-1">
                  <Star className="w-4 h-4 fill-white" />
                  Most Popular
                </Badge>
              )}

              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                {pkg.name}
              </h3>
              <div className="mb-6">
                <span className="text-4xl font-bold text-teal-600">
                  {pkg.price}
                </span>
              </div>

              <div className="space-y-3 mb-6">
                {pkg.tests.map((test, testIndex) => (
                  <div
                    key={testIndex}
                    className="flex items-start gap-2"
                  >
                    <Check className="w-5 h-5 text-teal-500 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700 text-sm">
                      {test}
                    </span>
                  </div>
                ))}
              </div>

              <div className="flex items-center gap-2 mb-6 text-sm text-gray-600">
                <Calendar className="w-4 h-4" />
                <span>Report in {pkg.reportTime}</span>
              </div>

              <div className="space-y-2 mb-6">
                <div className="flex items-center gap-2 text-sm text-teal-600">
                  <Check className="w-4 h-4" />
                  <span>Home collection included</span>
                </div>
              </div>

              <Button
                onClick={() => handleBookPackage(pkg.name)}
                className={`w-full ${
                  pkg.popular
                    ? "bg-gradient-to-r from-teal-500 to-blue-600 hover:from-teal-600 hover:to-blue-700"
                    : "bg-teal-600 hover:bg-teal-700"
                } text-white`}
              >
                Book Now
              </Button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
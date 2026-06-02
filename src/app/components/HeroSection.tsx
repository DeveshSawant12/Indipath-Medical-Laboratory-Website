import { motion } from "motion/react";
import {
  Calendar,
  Download,
  FlaskConical,
  Award,
  Target,
  Users,
} from "lucide-react";
import { Button } from "./ui/button";

interface HeroSectionProps {
  onDownloadReportClick: () => void;
}

export default function HeroSection({
  onDownloadReportClick,
}: HeroSectionProps) {
  const stats = [
    {
      icon: FlaskConical,
      label: "10,000+ Tests Done",
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: Award,
      label: "15+ Years Experience",
      color: "from-teal-500 to-green-500",
    },
    {
      icon: Target,
      label: "99.9% Accuracy",
      color: "from-purple-500 to-pink-500",
    },
    {
      icon: Users,
      label: "50+ Tests Available",
      color: "from-orange-500 to-red-500",
    },
  ];

  const handleBookCollection = () => {
    const element = document.querySelector("#home-collection");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20"
      style={{
        backgroundImage:
          "url(https://images.unsplash.com/photo-1682663947127-ac9d59d7f312?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBtZWRpY2FsJTIwbGFib3JhdG9yeSUyMG1pY3Jvc2NvcGV8ZW58MXx8fHwxNzcwOTU4NTEyfDA&ixlib=rb-4.1.0&q=80&w=1080)",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900/85 via-teal-900/75 to-blue-900/85"></div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-20">
        <div className="text-center max-w-4xl mx-auto">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-7xl font-bold text-white mb-4"
          >
            INDIPATH
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-2xl md:text-3xl text-teal-300 mb-8"
          >
            Your Health, Our Priority
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-lg text-gray-200 mb-10 max-w-2xl mx-auto"
          >
            Trusted medical laboratory services with accurate
            diagnostics, modern technology, and expert care. Get
            your test results digitally with complete privacy.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
          >
            <Button
              onClick={handleBookCollection}
              size="lg"
              className="bg-teal-600 hover:bg-teal-700 text-white text-lg px-8 py-6 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all"
            >
              <Calendar className="w-5 h-5 mr-2" />
              Book Home Collection
            </Button>
            <Button
              onClick={onDownloadReportClick}
              size="lg"
              variant="outline"
              className="bg-white/10 backdrop-blur-sm border-2 border-white/30 hover:bg-white/20 text-white text-lg px-8 py-6 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all"
            >
              <Download className="w-5 h-5 mr-2" />
              Download Report
            </Button>
          </motion.div>

          {/* Floating Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.6,
                  delay: 0.6 + index * 0.1,
                }}
                className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 shadow-xl hover:shadow-2xl transform hover:scale-105 hover:-translate-y-2 transition-all duration-300"
              >
                <div
                  className={`w-12 h-12 bg-gradient-to-br ${stat.color} rounded-xl flex items-center justify-center mb-3 mx-auto`}
                >
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
                <p className="text-white font-semibold text-sm md:text-base">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Wave Separator */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg
          viewBox="0 0 1440 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full"
        >
          <path
            d="M0 0L60 10C120 20 240 40 360 46.7C480 53 600 47 720 43.3C840 40 960 40 1080 46.7C1200 53 1320 67 1380 73.3L1440 80V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0V0Z"
            fill="white"
          />
        </svg>
      </div>
    </section>
  );
}
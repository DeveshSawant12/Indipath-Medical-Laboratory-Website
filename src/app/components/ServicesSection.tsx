import { motion } from 'motion/react';
import { useInView } from './hooks/useInView';
import { 
  Droplet, 
  Activity, 
  Heart, 
  Pill, 
  Thermometer,
  Beaker,
  TestTube,
  Zap,
  Baby,
  Shield,
  Sparkles,
  PlusCircle
} from 'lucide-react';

export default function ServicesSection() {
  const [ref, isInView] = useInView({ threshold: 0.1 });

  const services = [
    { icon: Droplet, title: 'Complete Blood Count (CBC)', color: 'from-red-500 to-pink-500' },
    { icon: Activity, title: 'Thyroid Panel (T3/T4/TSH)', color: 'from-purple-500 to-indigo-500' },
    { icon: Thermometer, title: 'Blood Sugar (Fasting/PP/HbA1c)', color: 'from-orange-500 to-red-500' },
    { icon: Heart, title: 'Lipid Profile', color: 'from-rose-500 to-pink-600' },
    { icon: Pill, title: 'Liver Function Test (LFT)', color: 'from-green-500 to-teal-500' },
    { icon: Beaker, title: 'Kidney Function Test (KFT)', color: 'from-blue-500 to-cyan-500' },
    { icon: TestTube, title: 'Urine Routine Test', color: 'from-yellow-500 to-orange-500' },
    { icon: Zap, title: 'Vitamin D / Vitamin B12', color: 'from-amber-500 to-yellow-500' },
    { icon: Baby, title: 'Pregnancy Test', color: 'from-pink-500 to-rose-500' },
    { icon: Shield, title: 'COVID-19 Test', color: 'from-teal-500 to-green-600' },
    { icon: Sparkles, title: 'Infection Testing', color: 'from-indigo-500 to-purple-600' },
    { icon: PlusCircle, title: 'Hormone Testing & More', color: 'from-violet-500 to-purple-500' },
  ];

  return (
    <section id="services" ref={ref} className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Our Laboratory Test Services</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-teal-500 to-blue-600 mx-auto mb-6 rounded-full"></div>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Comprehensive diagnostic testing with advanced technology and certified professionals
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-6 shadow-md hover:shadow-2xl transform hover:scale-110 transition-all duration-300 border border-gray-100 cursor-pointer group"
            >
              <div className={`w-14 h-14 bg-gradient-to-br ${service.color} rounded-xl flex items-center justify-center mb-4 mx-auto group-hover:rotate-12 transition-transform duration-300`}>
                <service.icon className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-center font-semibold text-gray-900 text-sm">{service.title}</h3>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

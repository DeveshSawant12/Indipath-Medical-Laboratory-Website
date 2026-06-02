import { motion } from "motion/react";
import { useInView } from "./hooks/useInView";
import { Star, Quote } from "lucide-react";

export default function TestimonialsSection() {
  const [ref, isInView] = useInView({ threshold: 0.1 });

  const testimonials = [
    {
      name: "Adishti Anaji Sawant",
      review:
        "Excellent service! The home collection was very professional and reports were delivered on time. Highly recommended.",
      rating: 5,
    },
    {
      name: "Kishor Bapu Sawant",
      review:
        "Very impressed with the accuracy and quick turnaround time. The digital report download system is very convenient.",
      rating: 5,
    },
    {
      name: "William Fernandis",
      review:
        "Best medical lab in the area. Staff is very cooperative and the pricing is affordable. Will definitely use again.",
      rating: 5,
    },
    {
      name: "Swara Sachin Sawant",
      review:
        "Great experience with IndipATH. The phlebotomist was very gentle and professional. Reports were accurate.",
      rating: 5,
    },
    {
      name: "Ranjan Walke",
      review:
        "Highly professional service. Home collection was free and very convenient. The online portal is easy to use.",
      rating: 5,
    },
    {
      name: "Dhiresh Kanekar",
      review:
        "Trustworthy laboratory with modern equipment. Got my full body checkup done and everything was perfect.",
      rating: 4,
    },
  ];

  const averageRating = (
    testimonials.reduce((acc, t) => acc + t.rating, 0) /
    testimonials.length
  ).toFixed(1);

  return (
    <section
      id="testimonials"
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
            What Our Patients Say
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-teal-500 to-blue-600 mx-auto mb-6 rounded-full"></div>
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="flex">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className="w-6 h-6 fill-yellow-400 text-yellow-400"
                />
              ))}
            </div>
            <span className="text-2xl font-bold text-gray-900">
              {averageRating}/5
            </span>
          </div>
          <p className="text-lg text-gray-600">
            Based on {testimonials.length}+ patient reviews
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300 border border-gray-100 relative"
            >
              <Quote className="absolute top-4 right-4 w-8 h-8 text-teal-200" />
              <div className="flex items-center gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${
                      i < testimonial.rating
                        ? "fill-yellow-400 text-yellow-400"
                        : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
              <p className="text-gray-700 mb-4 italic">
                "{testimonial.review}"
              </p>
              <p className="font-bold text-gray-900">
                {testimonial.name}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
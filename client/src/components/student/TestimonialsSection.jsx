import React from "react";
import { assets, dummyTestimonial } from "../../assets/assets";

const TestimonialsSection = () => {
  return (
    <section className="pb-16 px-6 md:px-16 bg-gradient-to-r from-cyan-50 to-cyan-100">
      <h2 className="text-4xl font-semibold text-gray-900 mb-3 text-center">
        Testimonials
      </h2>
      <p className="max-w-3xl mx-auto text-center text-gray-600 md:text-lg">
        Hear from our learners as they share their journey of transformation,
        success, and growth through our courses. <br />
        Their stories inspire us to keep pushing the boundaries of education.
      </p>

      <div
        className="mt-12 grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-10"
      >
        {dummyTestimonial.map((testimonial, index) => (
          <div
            key={index}
            className="bg-white rounded-xl border border-gray-300 shadow-lg hover:shadow-2xl hover:scale-[1.03] transition-transform duration-300 overflow-hidden flex flex-col"
            style={{animation: `fadeInUp 0.4s ease forwards`, animationDelay: `${index * 0.15}s`, opacity: 0}}
          >
            <div className="flex items-center gap-4 px-6 py-5 bg-cyan-50 border-b border-gray-200">
              <img
                className="h-14 w-14 rounded-full object-cover border-2 border-cyan-300"
                src={testimonial.image}
                alt={testimonial.name}
              />
              <div>
                <h3 className="text-xl font-semibold text-gray-900">
                  {testimonial.name}
                </h3>
                <p className="text-cyan-700 font-medium">{testimonial.role}</p>
              </div>
            </div>

            <div className="p-6 flex-grow flex flex-col">
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <img
                    className={`h-6 ${
                      i < testimonial.rating ? "filter drop-shadow-glow" : "opacity-30"
                    }`}
                    key={i}
                    src={i < testimonial.rating ? assets.star : assets.star_blank}
                    alt={i < testimonial.rating ? "Filled star" : "Empty star"}
                    aria-hidden="true"
                  />
                ))}
              </div>

              <p className="text-gray-600 mt-5 flex-grow">{testimonial.feedback}</p>

              <a
                href="#"
                className="mt-6 inline-block self-start rounded-md bg-cyan-600 px-5 py-2 text-white font-semibold hover:bg-cyan-700 transition-shadow shadow-md hover:shadow-lg"
              >
                Read more
              </a>
            </div>
          </div>
        ))}
      </div>

      <style>
        {`
          @keyframes fadeInUp {
            0% {
              opacity: 0;
              transform: translateY(20px);
            }
            100% {
              opacity: 1;
              transform: translateY(0);
            }
          }

          .drop-shadow-glow {
            filter:
              drop-shadow(0 0 4px rgba(253, 224, 71, 0.8))
              drop-shadow(0 0 6px rgba(253, 224, 71, 0.6));
          }
        `}
      </style>
    </section>
  );
};

export default TestimonialsSection;

'use client';

import { motion } from 'motion/react';
import { Star, Quote } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

export function TestimonialsSection() {
  const testimonials = [
    {
      name: 'Mary Wanjiru',
      role: 'SACCO Manager',
      sacco: 'Unity SACCO',
      content: 'Flits Sacco has completely transformed how we operate. Our members love the 24/7 access, and we\'ve reduced administrative work by 70%. Highly recommend!',
      rating: 5,
      image: 'https://images.unsplash.com/photo-1633158829556-6ea20ad39b4f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzYXZpbmdzJTIwY29vcGVyYXRpdmUlMjBncm91cHxlbnwxfHx8fDE3Njc5ODQyOTl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    },
    {
      name: 'John Kamau',
      role: 'Chairman',
      sacco: 'Progress SACCO',
      content: 'Within just 2 weeks, we had our entire SACCO online. The system is intuitive, secure, and our members are thrilled. Best investment we\'ve made.',
      rating: 5,
      image: 'https://images.unsplash.com/photo-1633158829556-6ea20ad39b4f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzYXZpbmdzJTIwY29vcGVyYXRpdmUlMjBncm91cHxlbnwxfHx8fDE3Njc5ODQyOTl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    },
    {
      name: 'Grace Akinyi',
      role: 'Treasurer',
      sacco: 'Victory SACCO',
      content: 'The reporting features are incredible. We can generate any report we need in seconds. The support team is also very responsive and helpful.',
      rating: 5,
      image: 'https://images.unsplash.com/photo-1633158829556-6ea20ad39b4f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzYXZpbmdzJTIwY29vcGVyYXRpdmUlMjBncm91cHxlbnwxfHx8fDE3Njc5ODQyOTl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Trusted by SACCO Leaders
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            See what SACCO administrators are saying about their experience
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8 h-full shadow-sm hover:shadow-lg transition-shadow relative">
                {/* Quote icon */}
                <Quote className="absolute top-6 right-6 w-12 h-12 text-blue-200" />

                {/* Rating */}
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>

                {/* Content */}
                <p className="text-gray-700 mb-6 italic leading-relaxed relative z-10">
                  "{testimonial.content}"
                </p>

                {/* Author */}
                <div className="flex items-center gap-4 pt-6 border-t border-blue-200">
                  <div className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-lg">
                    {testimonial.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">
                      {testimonial.name}
                    </div>
                    <div className="text-sm text-gray-600">
                      {testimonial.role}, {testimonial.sacco}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Social proof stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="mt-16 text-center"
        >
          <div className="inline-flex flex-wrap items-center justify-center gap-8 bg-gray-50 rounded-2xl px-8 py-6">
            <div>
              <div className="text-2xl font-bold text-gray-900">4.9/5</div>
              <div className="text-sm text-gray-600">Average Rating</div>
            </div>
            <div className="w-px h-12 bg-gray-300" />
            <div>
              <div className="text-2xl font-bold text-gray-900">500+</div>
              <div className="text-sm text-gray-600">Active SACCOs</div>
            </div>
            <div className="w-px h-12 bg-gray-300" />
            <div>
              <div className="text-2xl font-bold text-gray-900">98%</div>
              <div className="text-sm text-gray-600">Would Recommend</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

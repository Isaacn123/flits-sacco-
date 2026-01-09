'use client';

import { motion } from 'motion/react';
import { Shield, Zap, Globe, HeadphonesIcon, TrendingUp, Award } from 'lucide-react';

export function BenefitsSection() {
  const benefits = [
    {
      icon: Zap,
      title: 'Lightning Fast',
      description: 'Set up your entire SACCO system in under 24 hours. No technical expertise needed.',
      gradient: 'from-yellow-400 to-orange-500',
    },
    {
      icon: Shield,
      title: 'Bank-Level Security',
      description: 'Your data is encrypted and secured with industry-leading security protocols.',
      gradient: 'from-blue-400 to-blue-600',
    },
    {
      icon: TrendingUp,
      title: 'Scale with Confidence',
      description: 'Built for growth. Add unlimited members and handle increasing transactions.',
      gradient: 'from-green-400 to-emerald-600',
    },
    {
      icon: Globe,
      title: 'Access Anywhere',
      description: 'Cloud-based platform accessible from any device with internet connection.',
      gradient: 'from-purple-400 to-indigo-600',
    },
    {
      icon: HeadphonesIcon,
      title: '24/7 Support',
      description: 'Dedicated support team ready to help you and your members anytime.',
      gradient: 'from-pink-400 to-rose-600',
    },
    {
      icon: Award,
      title: 'Cost Effective',
      description: 'Affordable pricing with no hidden fees. Pay only for what you use.',
      gradient: 'from-cyan-400 to-teal-600',
    },
  ];

  return (
    <section className="py-20 bg-gray-900 text-white relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Why SACCOs Choose Flits Sacco
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            More than just software—a complete transformation for your SACCO
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group"
            >
              <div className="bg-gray-800 rounded-2xl p-8 h-full border border-gray-700 hover:border-gray-600 transition-all hover:shadow-2xl hover:shadow-blue-500/20">
                {/* Icon with gradient background */}
                <div className={`bg-gradient-to-br ${benefit.gradient} w-14 h-14 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                  <benefit.icon className="w-7 h-7 text-white" />
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold mb-3">
                  {benefit.title}
                </h3>
                <p className="text-gray-400 leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Trust badges */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="mt-16 pt-16 border-t border-gray-800"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl md:text-4xl font-bold text-blue-400 mb-2">99.9%</div>
              <div className="text-gray-400 text-sm">Uptime SLA</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-green-400 mb-2">500+</div>
              <div className="text-gray-400 text-sm">Active SACCOs</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-purple-400 mb-2">50K+</div>
              <div className="text-gray-400 text-sm">Happy Members</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-yellow-400 mb-2">24/7</div>
              <div className="text-gray-400 text-sm">Support Available</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

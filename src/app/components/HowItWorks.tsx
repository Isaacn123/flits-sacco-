'use client';

import { motion } from 'motion/react';
import { UserPlus, Settings, Rocket, CheckCircle } from 'lucide-react';

export function HowItWorks() {
  const steps = [
    {
      icon: UserPlus,
      step: '01',
      title: 'Register your organization',
      description: 'Sign up in minutes with your SACCO details. No technical knowledge required.',
      color: 'bg-blue-600',
    },
    {
      icon: Settings,
      step: '02',
      title: 'Configure & Customize',
      description: 'Set up your interest rates, fees, member tiers, and SACCO-specific policies.',
      color: 'bg-indigo-600',
    },
    {
      icon: UserPlus,
      step: '03',
      title: 'Add Members',
      description: 'Import or manually add your members. They get instant access to their portal.',
      color: 'bg-purple-600',
    },
    {
      icon: Rocket,
      step: '04',
      title: 'Go Live!',
      description: 'Start managing operations digitally. Your SACCO is now fully online.',
      color: 'bg-pink-600',
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
            Get Started in 4 Simple Steps
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Launch your digital SACCO in less than 24 hours with our streamlined onboarding
          </p>
        </motion.div>

        <div className="relative">
          {/* Connection line for desktop */}
          <div className="hidden lg:block absolute top-24 left-0 right-0 h-1 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 opacity-20" 
            style={{ top: '120px' }}
          />

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                className="relative"
              >
                {/* Step card */}
                <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200 hover:shadow-xl transition-shadow relative z-10">
                  {/* Step number badge */}
                  <div className="absolute -top-4 -left-4 bg-gradient-to-br from-gray-700 to-gray-900 text-white w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg shadow-lg">
                    {step.step}
                  </div>

                  {/* Icon */}
                  <div className={`${step.color} w-16 h-16 rounded-2xl flex items-center justify-center mb-4 mt-4`}>
                    <step.icon className="w-8 h-8 text-white" />
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {step.title}
                  </h3>
                  <p className="text-gray-600">
                    {step.description}
                  </p>

                  {/* Checkmark for completed feel */}
                  <div className="mt-4 flex items-center gap-2 text-green-600">
                    <CheckCircle className="w-5 h-5" />
                    <span className="text-sm font-medium">Quick & Easy</span>
                  </div>
                </div>

                {/* Arrow connector for desktop */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-24 -right-4 z-20">
                    <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                      <path d="M4 16H28M28 16L20 8M28 16L20 24" stroke="#9333EA" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>

        {/* CTA below */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8 }}
          className="text-center mt-16"
        >
          <p className="text-lg text-gray-600 mb-6">
            Ready to transform your SACCO?
          </p>
          <div className="inline-flex items-center gap-2 bg-green-100 text-green-700 px-6 py-3 rounded-full font-medium">
            <CheckCircle className="w-5 h-5" />
            <span>No credit card required • 30-day free trial</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

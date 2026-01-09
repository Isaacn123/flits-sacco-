'use client';

import { motion } from 'motion/react';
import { AlertCircle, TrendingDown } from 'lucide-react';

export function ProblemSection() {
  const problems = [
    {
      title: 'Manual Record Keeping',
      description: 'Tedious paperwork, prone to errors, and time-consuming processes that slow down operations.',
      icon: '📝',
    },
    {
      title: 'Limited Member Access',
      description: 'Members must visit offices during working hours to check balances or submit applications.',
      icon: '🔒',
    },
    {
      title: 'Lack of Transparency',
      description: 'Difficulty tracking transactions, loans, and savings in real-time creates trust issues.',
      icon: '👁️',
    },
    {
      title: 'Growth Challenges',
      description: 'Manual systems make it hard to scale operations and onboard new members efficiently.',
      icon: '📉',
    },
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 bg-red-100 text-red-700 px-4 py-2 rounded-full mb-4">
            <AlertCircle className="w-4 h-4" />
            <span className="text-sm font-medium">The Challenge</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Running a SACCO Without Digital Tools?
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Many SACCOs struggle with outdated systems that limit growth and member satisfaction
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {problems.map((problem, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow"
            >
              <div className="text-4xl mb-4">{problem.icon}</div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {problem.title}
              </h3>
              <p className="text-gray-600 text-sm">
                {problem.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Visual indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="text-center mt-12"
        >
          <TrendingDown className="w-12 h-12 text-red-500 mx-auto mb-2" />
          <p className="text-gray-500 italic">These challenges hold your SACCO back from reaching its full potential</p>
        </motion.div>
      </div>
    </section>
  );
}

'use client';

import { motion } from 'motion/react';
import { 
  Settings, 
  Users, 
  DollarSign, 
  FileText, 
  BarChart3, 
  Bell,
  Smartphone,
  Lock,
  CreditCard,
  Clock
} from 'lucide-react';

export function FeaturesSection() {
  const adminFeatures = [
    {
      icon: Users,
      title: 'Member Management',
      description: 'Add, edit, and manage member profiles with complete history tracking',
    },
    {
      icon: DollarSign,
      title: 'Savings & Deposits',
      description: 'Track all member savings, deposits, and withdrawals in real-time',
    },
    {
      icon: CreditCard,
      title: 'Loan Processing',
      description: 'Streamlined loan application, approval, and repayment tracking',
    },
    {
      icon: FileText,
      title: 'Reports & Analytics',
      description: 'Generate detailed financial reports and insights instantly',
    },
    {
      icon: Settings,
      title: 'Configuration',
      description: 'Customize interest rates, fees, and SACCO-specific settings',
    },
    {
      icon: Bell,
      title: 'Notifications',
      description: 'Automated SMS and email alerts for members and admins',
    },
  ];

  const memberFeatures = [
    {
      icon: Smartphone,
      title: '24/7 Account Access',
      description: 'Check balances and transactions anytime, anywhere',
    },
    {
      icon: BarChart3,
      title: 'Financial Overview',
      description: 'Visual dashboards showing savings growth and loan status',
    },
    {
      icon: FileText,
      title: 'Loan Applications',
      description: 'Apply for loans online without visiting the office',
    },
    {
      icon: Clock,
      title: 'Transaction History',
      description: 'Complete history of all deposits, withdrawals, and payments',
    },
    {
      icon: Lock,
      title: 'Secure Portal',
      description: 'Bank-level security protecting all member information',
    },
    {
      icon: Bell,
      title: 'Real-time Updates',
      description: 'Instant notifications for all account activities',
    },
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Powerful Features for Everyone
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Built to serve both SACCO administrators and members with intuitive tools
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Admin Features */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="bg-blue-600 text-white rounded-2xl p-6 mb-6">
              <Settings className="w-10 h-10 mb-3" />
              <h3 className="text-2xl font-bold mb-2">For SACCO Administrators</h3>
              <p className="text-blue-100">
                Complete management system with all the tools you need
              </p>
            </div>

            <div className="space-y-4">
              {adminFeatures.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-xl p-5 shadow-sm border border-gray-200 hover:shadow-md transition-all hover:border-blue-300"
                >
                  <div className="flex gap-4">
                    <div className="bg-blue-100 rounded-lg p-3 flex-shrink-0">
                      <feature.icon className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">
                        {feature.title}
                      </h4>
                      <p className="text-sm text-gray-600">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Member Features */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="bg-green-600 text-white rounded-2xl p-6 mb-6">
              <Smartphone className="w-10 h-10 mb-3" />
              <h3 className="text-2xl font-bold mb-2">For SACCO Members</h3>
              <p className="text-green-100">
                Self-service portal for convenient account management
              </p>
            </div>

            <div className="space-y-4">
              {memberFeatures.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-xl p-5 shadow-sm border border-gray-200 hover:shadow-md transition-all hover:border-green-300"
                >
                  <div className="flex gap-4">
                    <div className="bg-green-100 rounded-lg p-3 flex-shrink-0">
                      <feature.icon className="w-6 h-6 text-green-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">
                        {feature.title}
                      </h4>
                      <p className="text-sm text-gray-600">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

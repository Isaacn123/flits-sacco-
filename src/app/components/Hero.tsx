'use client';

import { motion } from 'motion/react';
import { ArrowRight, Shield, Users } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Checkbox } from './ui/checkbox';

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 text-white">
      {/* Background decorative elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-72 h-72 bg-white rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-300 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 py-20 md:py-28 relative z-10">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-6"
            >
              <Shield className="w-4 h-4" />
              <span className="text-sm">Trusted by SACCOs across the region</span>
            </motion.div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Modern SACCO Management{' '}
              <span className="text-yellow-300">Made Simple</span>
            </h1>

            <p className="text-lg md:text-xl mb-8 text-blue-100 leading-relaxed">
              Empower your SACCO with a complete digital platform. Manage members, 
              track savings, process loans, and provide members with 24/7 access to 
              their accounts—all in one secure system.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <Button 
                size="lg" 
                className="bg-yellow-400 text-blue-900 hover:bg-yellow-300 text-lg px-8 py-6"
              >
                Register Your SACCO
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-blue-900 text-lg px-8 py-6"
              >
                Watch Demo
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 pt-8 border-t border-white/20">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <div className="text-3xl font-bold text-yellow-300">500+</div>
                <div className="text-sm text-blue-100">Active SACCOs</div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <div className="text-3xl font-bold text-yellow-300">50K+</div>
                <div className="text-sm text-blue-100">Members</div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
              >
                <div className="text-3xl font-bold text-yellow-300">99.9%</div>
                <div className="text-sm text-blue-100">Uptime</div>
              </motion.div>
            </div>
          </motion.div>

          {/* Right content - Sign in */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative flex justify-center md:justify-end"
          >
            <div className="w-full max-w-sm rounded-2xl border-2 border-white bg-transparent p-8 text-white">
              <div className="mb-6 text-center space-y-1">
                <h2 className="text-2xl font-semibold text-white">Welcome back</h2>
                <p className="text-lg font-medium text-white/90">Sign In Account</p>
              </div>
              <form
                className="space-y-5"
                onSubmit={(e) => {
                  e.preventDefault();
                }}
              >
                <div className="space-y-2">
                  <Label htmlFor="hero-sacco-name" className="text-white">
                    SACCO name
                  </Label>
                  <Input
                    id="hero-sacco-name"
                    name="saccoName"
                    type="text"
                    autoComplete="organization"
                    placeholder="Enter your SACCO name"
                    className="bg-transparent border-white text-white placeholder:text-white/50 selection:bg-white/20 focus-visible:border-white focus-visible:ring-white/30 dark:bg-transparent dark:border-white"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="hero-username" className="text-white">
                    Username or email
                  </Label>
                  <Input
                    id="hero-username"
                    name="username"
                    type="text"
                    autoComplete="username"
                    placeholder="you@example.com"
                    className="bg-transparent border-white text-white placeholder:text-white/50 selection:bg-white/20 focus-visible:border-white focus-visible:ring-white/30 dark:bg-transparent dark:border-white"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="hero-password" className="text-white">
                    Password
                  </Label>
                  <Input
                    id="hero-password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    placeholder="••••••••"
                    className="bg-transparent border-white text-white placeholder:text-white/50 selection:bg-white/20 focus-visible:border-white focus-visible:ring-white/30 dark:bg-transparent dark:border-white"
                  />
                </div>
                <div className=" items-start pt-1">
                  <div className="flex items-center gap-2">
                    <Checkbox
                      id="hero-remember"
                      name="remember"
                      className="border-white bg-transparent data-[state=checked]:bg-white data-[state=checked]:text-blue-800 data-[state=checked]:border-white dark:border-white dark:bg-transparent dark:data-[state=checked]:bg-white"
                    />
                    <Label
                      htmlFor="hero-remember"
                      className="text-sm font-normal text-white cursor-pointer"
                    >
                      Remember me
                    </Label>
                  </div>
                  <button
                    type="button"
                    className="text-sm text-white hover:text-white/80 underline-offset-4 hover:underline bg-transparent border-0 p-0 cursor-pointer"
                  >
                    Forgot your password?
                  </button>
                  <div className="pt-2">
                  <button
                    type="submit"
                    className="block w-full text-left text-base font-medium text-white hover:text-white/80 underline-offset-4 hover:underline bg-transparent border-0 p-0 cursor-pointer"
                  >
                    Sign in
                  </button>
                </div>
                 
                </div>
              
              </form>
            </div>

            {/* Decorative floating elements */}
            <motion.div
              animate={{ y: [0, -20, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="absolute -top-6 -right-6 bg-yellow-400 rounded-full p-4 shadow-xl"
            >
              <Users className="w-8 h-8 text-blue-900" />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

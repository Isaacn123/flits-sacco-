'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'motion/react';
import { Menu, X, ArrowRight } from 'lucide-react';
import { Button } from './ui/button';
import Image from 'next/image';

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const onDemoPage = pathname === '/demo';
  const demoNav = onDemoPage
    ? { name: 'Home', href: '/' }
    : { name: 'Request a Demo', href: '/demo' };

  const navLinks = [
    // { name: 'Home', href: '/' },
    // { name: 'Request a Demo', href: '/demo' },
    // { name: 'How It Works', href: '#how-it-works' },
    // { name: 'Pricing', href: '#pricing' },
    // { name: 'Testimonials', href: '#testimonials' },
  ];

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center gap-2">
              <div className="relative w-12 h-10  overflow-hidden">
                <Image 
                  src="/logo.png" 
                  alt="Flits Systems Group Financial Management System"
                  fill
                  className="object-contain p-1.5"
                  unoptimized
                />
              </div>
              <span className="text-xl md:text-2xl font-bold text-gray-900">
                Flits 
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-gray-600 hover:text-blue-600 transition-colors font-medium"
              >
                {link.name}
              </a>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-4">
            <Button asChild variant="outline" className="border-blue-600 text-blue-700 hover:bg-blue-50">
              <Link href={demoNav.href}>{demoNav.name}</Link>
            </Button>
            <Button asChild className="bg-blue-600 hover:bg-blue-700 text-white">
              <Link href="/contact">
                Contact us
                <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </Button>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            {isOpen ? (
              <X className="w-6 h-6 text-gray-700" />
            ) : (
              <Menu className="w-6 h-6 text-gray-700" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden pb-4 border-t border-gray-100"
          >
            <div className="flex flex-col gap-2 pt-4">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  {link.name}
                </a>
              ))}
              <div className="flex flex-col gap-2 mt-4 px-4">
                <Button variant="outline" className="w-full">
                  Sign In
                </Button>
                <Button asChild variant="outline" className="w-full border-blue-600 text-blue-700 hover:bg-blue-50">
                  <Link href={demoNav.href} onClick={() => setIsOpen(false)}>
                    {demoNav.name}
                  </Link>
                </Button>
                <Button asChild className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                  <Link href="/contact" onClick={() => setIsOpen(false)}>
                    Contact us
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </nav>
  );
}

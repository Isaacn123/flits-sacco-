import type { Metadata } from 'next';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { DemoPage } from '../components/DemoPage';

export const metadata: Metadata = {
  title: 'Request a Demo | Flits Sacco',
  description:
    'Try Flits Sacco in a demo workspace before you create your SACCO. Request a guided walkthrough or self-serve demo access.',
};

export default function Demo() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <DemoPage />
      <Footer />
    </div>
  );
}

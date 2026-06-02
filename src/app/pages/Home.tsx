import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { toast } from 'sonner';
import Header from '../components/Header';
import HeroSection from '../components/HeroSection';
import AboutSection from '../components/AboutSection';
import ServicesSection from '../components/ServicesSection';
import PackagesSection from '../components/PackagesSection';
import HomeCollectionSection from '../components/HomeCollectionSection';
import WhyChooseSection from '../components/WhyChooseSection';
import TestimonialsSection from '../components/TestimonialsSection';
import ContactSection from '../components/ContactSection';
import Footer from '../components/Footer';
import FloatingButtons from '../components/FloatingButtons';
import ReportDownloadModal from '../components/ReportDownloadModal';

export default function Home() {
  const [showReportModal, setShowReportModal] = useState(false);
  const navigate = useNavigate();

  // Hidden keyboard shortcut for admin access (Ctrl+Shift+A)
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.shiftKey && e.key === 'A') {
        e.preventDefault();
        toast.success('Admin shortcut detected! Redirecting...');
        setTimeout(() => {
          navigate('/admin');
        }, 300);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [navigate]);

  return (
    <div className="min-h-screen bg-white">
      {/* Admin Access: Press Ctrl+Shift+A or triple-click footer logo */}
      <Header onDownloadReportClick={() => setShowReportModal(true)} />
      <main>
        <HeroSection onDownloadReportClick={() => setShowReportModal(true)} />
        <AboutSection />
        <ServicesSection />
        <PackagesSection />
        <HomeCollectionSection />
        <WhyChooseSection />
        <TestimonialsSection />
        <ContactSection />
      </main>
      <Footer />
      <FloatingButtons />
      <ReportDownloadModal 
        isOpen={showReportModal} 
        onClose={() => setShowReportModal(false)} 
      />
    </div>
  );
}
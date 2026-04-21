import FAQPage from "@/components/faqs/Faq";
import HeroSection from "@/components/services/smsf-finance/Hero"
import HomeContent from "@/components/services/smsf-finance/SmsfContent";
import CTABanner from "@/components/home/CTABanner";


export default function Hero() {
  return (
    <>
    <HeroSection/>
     <HomeContent/>
     <FAQPage/>
     <CTABanner/>
    </>
  );
}
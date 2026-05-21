import FAQPage from "@/components/faqs/Faq";
import HeroSection from "@/components/services/development-finance/Hero"
import HomeContent from "@/components/services/development-finance/DevelopmentContent";
import CTABanner from "@/components/home/CTABanner";


export default function Hero() {
  return (
    <>
    <HeroSection/>
     <HomeContent/>
     <CTABanner/>
     <FAQPage/>
     
    </>
  );
}
import FAQPage from "@/components/faqs/Faq";
import HeroSection from "@/components/services/business-finance/Hero"
import HomeContent from "@/components/services/business-finance/BusinessContent";
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
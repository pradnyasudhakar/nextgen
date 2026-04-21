import FAQPage from "@/components/faqs/Faq";
import HeroSection from "@/components/services/commercial-loan/Hero"
import HomeContent from "@/components/services/commercial-loan/CommecialContent";
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
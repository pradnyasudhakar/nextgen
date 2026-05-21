import FAQPage from "@/components/faqs/Faq";
import HeroSection from "@/components/services/home-loan/Hero"
import HomeContent from "@/components/services/home-loan/Home-Content";
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
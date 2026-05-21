import FAQPage from "@/components/faqs/Faq";
import HeroSection from "@/components/services/homeloan/Hero"
import HomeContent from "@/components/services/homeloan/HomeContent";
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
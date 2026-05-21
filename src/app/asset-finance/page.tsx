import FAQPage from "@/components/faqs/Faq";
import HeroSection from "@/components/services/asset-finance/Hero"
import HomeContent from "@/components/services/asset-finance/AssetContent";
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
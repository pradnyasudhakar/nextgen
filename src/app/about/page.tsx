import AboutSection from "@/components/about/AboutUs";
import Hero from "@/components/about/Hero";
import CTABanner from "@/components/about/Team";
import WhyChooseUs from "@/components/about/WhychooseUs";


export default function HomePage() {
  return (
    <>
      <Hero/>
      <AboutSection/>
      <WhyChooseUs/>
      <CTABanner/>
    </>
  );
}
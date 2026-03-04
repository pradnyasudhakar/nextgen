import AboutSection from "@/components/home/AboutSection";
import BlogSection from "@/components/home/BlogSection";
import CTABanner from "@/components/home/CTABanner";
import Hero from "@/components/home/Hero";
import HowWeSupport from "@/components/home/HowWeSupport";
import OurServices from "@/components/home/OurServices";

export default function HomePage() {
  return (
    <>
      <Hero />
      <OurServices/>
      <AboutSection/>
      <HowWeSupport/>
      <CTABanner/>
      <BlogSection/>
    </>
  );
}
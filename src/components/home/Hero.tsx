import { Button } from "@/components/ui/button";
import { Display, Lead } from "@/components/ui/typography";

export default function Hero() {
  return (
    <section className="w-full px-3 overflow-hidden">
      
      <div
        className="w-full min-h-130 lg:min-h-screen rounded-[20px]
        bg-[url('/images/hero-bg.png')] bg-black/20 bg-blend-overlay bg-position-[65%]   lg:bg-cover  bg-no-repeat"
      >
        {/* Content */}
        <div className="flex items-center min-h-130 lg:min-h-screen max-w-7xl 2xl:max-w-8xl mx-auto px-10 sm:px-16 lg:px-26 py-20">
          
          <div className="max-w-105 2xl:max-w-150  ">
            
            {/* Heading */}
            <Display className="  text-[#FBFBFB] [word-spacing:8px] leading-8 lg:leading-12 font-[300] mb-6">
              Your Partner For What <br />
              <span className="font-[700]">Comes Next</span>
            </Display>

            {/* Subtext */}
            <Lead className="text-[#FBFBFB] max-w-105 2xl:max-w-110 font-extralight mb-6">
              We provide the guidance and insight needed as you step into new
              opportunities and decisions.
            </Lead>

            {/* Button */}
            <Button
              href="/contact"
              className="text-[0.9rem] 2xl:text-[1rem] "
              variant="primary"
              size="lg"
            >
              Book an Appointment
            </Button>

          </div>
        </div>
      </div>

    </section>
  );
}
import { Button } from "@/components/ui/button";
import { Display, Lead } from "@/components/ui/typography";
import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative w-full overflow-hidden min-h-auto md:min-h-screen">
      {/* Background Image */}
      <Image
        src="/images/hero-bg.png"
        alt="Happy family"
        fill
        className="object-cover object-center"
        priority
      />

      {/* Gradient overlay */}
      {/* <div className="absolute inset-0 rounded-md bg-linear-to-r from-black/60 via-black/30 to-black/5" /> */}

      {/* Content */}
      <div className="relative z-10 flex items-center md:min-h-screen max-w-7xl mx-auto px-6 sm:px-10 lg:px-20 py-20">
        <div className="max-w-100">
          <div className="">
            {/* Heading */}
            <Display className="text-[#FBFBFB] font-extralight  mb-6">
              Standing With You at the Threshold of <br></br>
              <span className=" text-[#FBFBFB] font-[700]">
                What&apos;s Next
              </span>
            </Display>
          </div>

          {/* Subtext */}
          <Lead className="text-[#FBFBFB] font-extralight mb-6 max-w-80">
            We provide the capital and insight needed as you step into new
            opportunities and decisions.
          </Lead>

          {/* CTA */}
          <Button href="/contact-us" className="text-[0.9rem]" variant="primary" size="lg">
            Book an Appointment
          </Button>
        </div>
      </div>
    </section>
  );
}

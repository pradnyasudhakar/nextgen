import { H2, Label, Lead, Highlight } from "@/components/ui/typography";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function CTABanner() {
  return (
    <section className="">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-20 py-10">
        <div
          className="relative rounded-2xl overflow-hidden px-8 py-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-8"
          style={{ backgroundColor: "#f0f2f0" }}
        >
          {/* Background Image */}
          <Image src="/images/cta-bg.png" alt="" fill className="" />

          {/* Gradient border bottom */}
          <div
            className="absolute bottom-0 left-0 right-0 h-1.25"
            style={{
              background: "linear-gradient(270deg, #00674E 0%, #3F9F9F 100%)",
            }}
          />

          {/* Left content */}
          <div className="relative z-10 max-w-lg">
            <Label className="mb-3">BOOK AN APPOINTMENT</Label>
            <H2 className="mb-3">
              <Highlight>Our team</Highlight> is ready to help you!
            </H2>
            <Lead className="text-sm sm:text-base">
              We&apos;ll walk you through the entire loan journey, keeping you
              informed and supported at every stage.
            </Lead>
          </div>

          {/* Right: CTA button */}
          <div className="relative z-10 shrink-0">
            <Button href="/contact-us" variant="primary" size="lg">
              Get In Touch
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

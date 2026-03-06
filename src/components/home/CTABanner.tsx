import { H2, Label, Highlight, P } from "@/components/ui/typography";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function CTABanner() {
  return (
    <section className="">
      <div className="max-w-7xl mx-auto px-10 sm:px-16 lg:px-26 py-10">
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
             Let’s Start the  <Highlight>Conversation</Highlight> 
            </H2>
            <P className="">
              Whether you&apos;re purchasing, refinancing, investing, or expanding your business, we will help you explore your options with confidence. 
Book a consultation today and take the next step towards your financial goals.

            </P>
          </div>

          {/* Right: CTA button */}
          <div className="relative z-10 shrink-0">
            <Button href="/contact" variant="primary" size="lg">
              Get In Touch
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

import { H2, Label, Lead, Highlight } from "@/components/ui/typography";
import { Button } from "@/components/ui/button";

export default function CTABanner() {
  return (
    <section className="">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-20 py-10">

        {/* Card with wavy bg pattern + green bottom border */}
        <div
          className="relative rounded-md overflow-hidden px-8 py-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-8"
          style={{
            backgroundColor: "#f0f2f0",
            borderBottom: "6px solid var(--color-primary)",
          }}
        >

          {/* Wavy SVG background */}
          <svg
            className="absolute inset-0 w-full h-full"
            viewBox="0 0 1200 300"
            preserveAspectRatio="xMidYMid slice"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M0 150 Q200 80 400 150 Q600 220 800 150 Q1000 80 1200 150 L1200 300 L0 300 Z"
              fill="rgba(255,255,255,0.35)" />
            <path d="M0 180 Q200 110 400 180 Q600 250 800 180 Q1000 110 1200 180 L1200 300 L0 300 Z"
              fill="rgba(255,255,255,0.25)" />
            <path d="M0 210 Q200 140 400 210 Q600 280 800 210 Q1000 140 1200 210 L1200 300 L0 300 Z"
              fill="rgba(255,255,255,0.15)" />
          </svg>

          {/* Left content */}
          <div className="relative z-10 max-w-lg">
            <Label className="mb-3">BOOK AN APPOINTMENT</Label>
            <H2 className="mb-3 text-2xl sm:text-3xl">
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
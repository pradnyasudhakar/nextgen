import Image from "next/image";
import { H2, Label, P, Highlight } from "../ui/typography";
import { Button } from "../ui/button";

export default function AboutSection() {
  return (
    <section id="about" className="">
      <div className="max-w-7xl mx-auto px-10 sm:px-16 lg:px-26 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-0 justify-center items-center">
          {/* ── Left: Image ── */}
          <div className="relative rounded-md w-full h-75 sm:w-full sm:h-120 lg:w-120 lg:h-120 overflow-hidden">
            <Image
              src="/images/about-img.png"
              alt="Two professionals discussing finance documents"
              fill
              className="object-cover"
            />
          </div>

          {/* ── Right: Content ── */}
          <div className="flex flex-col justify-between h-full">
            <div>
              {/* Label */}
              <Label className=" mb-3">ABOUT US</Label>

              {/* Heading */}
              <H2 className=" mb-2">
                <Highlight>Lending</Highlight>, Structured Around You
              </H2>

              {/* Paragraphs */}
              <div className="space-y-6 mt-4 leading-[100%] tracking-normal  ">
                <P>
                  We offer tailored financial solutions for individuals and businesses, covering everything from home loans to commercial lending.
                  

                </P>
                <P>
                  By understanding your goals and financial context, we ensure capital supports what matters most.
                  

                </P>
                <P>
                 With 15 years of experience in banking and finance, Next Generation Lending Group brings expertise and insight, guiding clients with clarity and confidence through every step of the process.
                </P>
                <Highlight>Standing With You at the Threshold of What’s Next</Highlight>
              </div>
            </div>

            {/* CTA */}
            <div className="flex justify-end mt-16">
              <Button href="/about" variant="outline-rounded">
                Know More About Us
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

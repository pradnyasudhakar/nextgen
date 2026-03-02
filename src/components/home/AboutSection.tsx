import Link from "next/link";
import { H2, Label, P ,Highlight } from "../ui/typography";
import { Button } from "../ui/button";

export default function AboutSection() {
  return (
    <section className="">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-20 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* ── Left: Image ── */}
          <div className="rounded-md max-w-auto max-h-105 overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1560250097-0b93528c311a?w=800&q=80"
              alt="Two professionals discussing finance documents"
              className="w-full  h-full "
              
            />
          </div>

          {/* ── Right: Content ── */}
          <div className="flex flex-col justify-between h-full">

            <div>
              {/* Label */}
              <Label className="label mb-3">ABOUT US</Label>

              {/* Heading */}
              <H2 className=" mb-2">
                <Highlight>Lending</Highlight>
                , Structured Around You
              </H2>

              {/* Paragraphs */}
              <div className="space-y-4">
                <P>
                  <span className="font-bold" style={{ color: "var(--color-dark)" }}>NextGen</span>{" "}
                  helps businesses and investors access capital through tailored
                  structures that reflect their plans, timelines, and opportunities.
                </P>
                <P>
                  By understanding what sits behind the numbers, we ensure
                  funding supports real priorities rather than a standard approach.
                </P>
                <P>
                  Our role is to bring clarity and discipline to the process so
                  you can move forward with confidence.
                </P>
              </div>
            </div>

            {/* CTA */}
            <div className="flex justify-end mt-16">
              <Button href="/about-us" variant="outline-rounded">
                Know More About Us
              </Button>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
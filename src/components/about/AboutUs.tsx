import Image from "next/image";
import { H2, Label, P, Highlight } from "../ui/typography";


export default function AboutSection() {
  return (
    <section  className="">
      <div className="max-w-7xl mx-auto px-10 sm:px-16 lg:px-26 py-10 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20  justify-between items-center">
         

          {/* ── Right: Content ── */}
          <div className="flex flex-col justify-between h-full">
            <div>
              {/* Label */}
              <Label className=" mb-3">ABOUT US</Label>

              {/* Heading */}
              <H2 className=" mb-2">
                Finance That <Highlight>Starts with You</Highlight>, Not Just the Numbers.
              </H2>

              {/* Paragraphs */}
              <div className="space-y-6 mt-4 leading-[100%] tracking-normal  ">
                <P>
                <Highlight> Next Generation Lending Group</Highlight> believes that every lending decision is personal to the people behind it. Based in Melbourne, we take the time to listen, understand your situation, and appreciate the goals you are working towards before recommending a path forward.

                </P>
                <P>
               Our work is centred on building relationships that last. By combining over <Highlight>15 years of experience</Highlight> with genuine care, we aim to support clients through important moments with advice that feels thoughtful, transparent, and dependable. We specialise in home loans, commercial lending, business finance, asset finance, development finance, and SMSF finance, providing tailored solutions for both individuals and businesses.
                  

                </P>
               
              </div>
            </div>

           
          </div>
           {/* ── Left: Image ── */}
          <div className="relative rounded-md w-full h-75 sm:w-full sm:h-120 lg:w-115 lg:h-95 overflow-hidden">
            <Image
              src="/images/about-img-2.png"
              alt="Two professionals discussing finance documents"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

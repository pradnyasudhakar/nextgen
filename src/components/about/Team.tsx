import { H2,  Label, Highlight, P, Small } from "@/components/ui/typography";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function MeetTeam() {
  return (
   <>
    <section>
      <div className="max-w-7xl mx-auto px-10 sm:px-16 lg:px-26 py-10">

        <div className="relative rounded-[15px] overflow-hidden bg-[url('/images/a-bg.png')] bg-[#EBEBEB] bg-cover bg-center  ">

          <div className="grid grid-cols-1 lg:grid-cols-[auto_1fr] items-center">

            {/* Left — Photo */}
            <div className="p-8 lg:p-8  lg:pr-0 flex justify-start items-center">
              <div className="w-full border border-primary  h-auto lg:w-auto lg:h-88 rounded-md overflow-hidden shrink-0">
                <Image
                  src="/images/team-1.png"
                  alt="Zoher Kakajiwala"
                  width={280}
                  height={400}
                  className="object-cover object-top w-full h-full"
                />
              </div>
            </div>

            {/* Right — Content */}
            <div className="px-6 pb-6 lg:p-10 flex flex-col ">

              <Label className="mb-3">MEET OUR TEAM</Label>

              <H2 className="mb-1 text-[1.5rem]! font-[500] text-dark">
                Zoher Kakajiwala
              </H2>

              <Small className="mb-5 text-[#555555] font-[500]">Director</Small>

              <P className="mb-4 text-[0.9rem] leading-relaxed">
                <Highlight>With 15 years of experience</Highlight> in Banking and Finance
                and a strong background across multiple lending sectors,{" "}
                <Highlight>Zoher Kakajiwala</Highlight> established Next Generation Lending
                Group to provide advice that is grounded in experience and guided by a{" "}
                <Highlight>long-term perspective</Highlight>.{" "}
                <Highlight>Zoher</Highlight> works closely with clients to understand their
                ambitions and ensure that funding solutions are aligned with their strategic
                direction.
              </P>

              <P className="text-[0.9rem] leading-relaxed">
                Through a commitment to professionalism and careful guidance,{" "}
                <Highlight>Zoher</Highlight> continues to lead the firm with a focus on{" "}
                <Highlight>building enduring relationships</Highlight>.
              </P>

              <div className="mt-8 flex justify-end">
                <Button href="/contact" variant="primary" size="lg">
                  Get in Touch
                </Button>
              </div>
            </div>
          </div>

          {/* Gradient border bottom */}
          <div
            className="h-2"
            style={{ background: "linear-gradient(270deg, #002566 0%, #00674E 100%)" }}
          />
        </div>

      </div>
    </section>
    <section>
      <div className="max-w-7xl mx-auto px-10 sm:px-16 lg:px-26 py-10">
        {/* Single wide card — 2 col inside like Figma */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 ">
 
          {/* Our Vision */}
          <div className=" bg-[#FBFBFB] shadow-[0px_3px_30px_0px_#0000001A] rounded-md p-5  ">
            <H2 className="mb-4   font-[500]! text-dark">
              Our Vision
            </H2>
            <P className="text-[1rem]!">
              Our Vision is to redefine mortgage broking through transparency, innovation
              and personalised advice, empowering the next generation of Australians to
              make confident financial decisions
            </P>
          </div>
 
          {/* Our Mission */}
          <div className="bg-[#FBFBFB] shadow-[0px_3px_30px_0px_#0000001A] rounded-md p-5">
            <H2
              className="mb-4  font-[500]!"
              style={{ color: "var(--color-primary)" }}
            >
              Our Mission
            </H2>
            <P className="text-[1rem]!">
              Our mission is to deliver lending solutions that are carefully considered
              and responsibly structured, ensuring that each recommendation reflects a
              thorough understanding of the client&apos;s circumstances.
            </P>
          </div>
 
        </div>
      </div>
    </section>
   </>
  );
}
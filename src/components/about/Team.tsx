import { H2, Label, Highlight, P, Small } from "@/components/ui/typography";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function MeetTeam() {
  return (
    <section>
      <div className="max-w-7xl mx-auto px-10 sm:px-16 lg:px-26 py-10">

        <div className="relative rounded-[15px] overflow-hidden bg-[url('/images/about-team-bg.png')]">

          <div className="grid grid-cols-1 lg:grid-cols-[auto_1fr] items-center">

            {/* Left — Photo */}
            <div className="p-8 lg:p-10 lg:pr-0 flex items-center">
              <div className="w-64 h-80 lg:w-80 lg:h-100 rounded-[15px] overflow-hidden shrink-0">
                <Image
                  src="/images/about-team.png"
                  alt="Zoher Kakajiwala"
                  width={280}
                  height={400}
                  className="object-cover object-top w-full h-full"
                />
              </div>
            </div>

            {/* Right — Content */}
            <div className="px-8 pb-8 lg:p-10 flex flex-col ">

              <Label className="mb-3">MEET OUR TEAM</Label>

              <H2 className="mb-1 text-[#002566]">
                Zoher Kakajiwala
              </H2>

              <Small className="mb-5 text-[#555555] font-[500]">Director</Small>

              <P className="mb-4 leading-relaxed">
                <Highlight>With 15 years of experience</Highlight> in Banking and Finance
                and a strong background across multiple lending sectors,{" "}
                <Highlight>Zoher Kakajiwala</Highlight> established Next Generation Lending
                Group to provide advice that is grounded in experience and guided by a{" "}
                <Highlight>long-term perspective</Highlight>.{" "}
                <Highlight>Zoher</Highlight> works closely with clients to understand their
                ambitions and ensure that funding solutions are aligned with their strategic
                direction.
              </P>

              <P className="leading-relaxed">
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
  );
}
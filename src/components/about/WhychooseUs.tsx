import { H2, H3, Label, P,Highlight } from "@/components/ui/typography";

export default function WhyChooseUs() {
  return (
    <section>
      <div className="max-w-7xl mx-auto px-10 sm:px-16 lg:px-26 py-10 lg:py-16">

        {/* Header */}
        <div className="section-header">
          <Label className="mb-3">WHY CHOOSE US</Label>
          <H2 className="mb-2">
          <Highlight>Experience</Highlight>   You Can Rely On, Every Step of the Way.
          </H2>
          <P className="">
            We bring a disciplined approach to every engagement, supported by strong industry
            relationships and a commitment to understanding each client&apos;s situation in depth.
            Clients value our responsiveness, transparency, and the assurance that comes from
            working with a team that remains engaged throughout the process.
          </P>
        </div>

        {/* Vision + Mission Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-20">

          {/* Our Vision */}
          <div className="border-[1.3px] border-[#002566] rounded-md p-6 bg-[#FBFBFB]">
            <H3 className="text-[#002566] font-[500] text-[2rem]! mb-4">Our Vision</H3>
            <P>
              Our Vision is to redefine mortgage broking through transparency, innovation
              and personalised advice, empowering the next generation of Australians to
              make confident financial decisions.
            </P>
          </div>

          {/* Our Mission */}
          <div className="border-[1.3px] border-primary  rounded-md p-6 bg-[#FBFBFB]">
            <H3 className="text-primary font-[500] text-[2rem]! mb-4">Our Mission</H3>
            <P>
              Our mission is to deliver lending solutions that are carefully considered
              and responsibly structured, ensuring that each recommendation reflects a
              thorough understanding of the client&apos;s circumstances.
            </P>
          </div>

        </div>
      </div>
    </section>
  );
}
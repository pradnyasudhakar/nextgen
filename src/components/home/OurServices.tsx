import {
  Briefcase, Home, PiggyBank, Building2, HardHat, Wrench, Landmark, 
} from "lucide-react";
import { H2, H3, Label, Highlight,  P } from "@/components/ui/typography";
// import { Button } from "@/components/ui/button";
import { IconCard } from "@/components/ui/card";

const services = [
  {
    icon: Briefcase,
    titleGreen: "Business",
    titleBlack: "Finance",
    description: "Finance to support major business decisions, from working capital to acquisitions.",
    href: "/services/business-finance",
  },
  {
    icon: Home,
    titleGreen: "Residential",
    titleBlack: "Finance",
    description: "Clear, straightforward lending for buying, refinancing, or investing in property.",
    href: "/services/residential-finance",
  },
  {
    icon: PiggyBank,
    titleGreen: "SMSF",
    titleBlack: "Finance",
    description: "We simplify SMSF lending and ensure funding aligns with your long-term approach.",
    href: "/services/smsf-finance",
  },
  {
    icon: Building2,
    titleGreen: "Commercial",
    titleBlack: "Finance",
    description: "We help secure the right funding across a wide range of commercial scenarios.",
    href: "/services/commercial-finance",
  },
  {
    icon: HardHat,
    titleGreen: "Development",
    titleBlack: "Finance",
    description: "We support developers with funding aligned to timelines, feasibility, and delivery milestones.",
    href: "/services/development-finance",
  },
  {
    icon: Wrench,
    titleGreen: "Equipment",
    titleBlack: "Finance",
    description: "We support asset funding that keeps your operations efficient and moving forward.",
    href: "/services/equipment-finance",
  },
  {
    icon: Landmark,
    titleGreen: "Private",
    titleBlack: "Funding",
    description: "Flexible private lending solutions for complex or time-sensitive funding needs.",
    href: "/services/private-funding",
  },
];

export default function OurServices() {
  return (
    <section className="">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-20 py-10">

        {/* Header */}
        <div className="section-header">
          <Label className="mb-2 text-[0.7rem] font-[700] text-[#808180] ">OUR SERVICES</Label>
          <H2 className="max-w-xl">
            We <Highlight>pride ourselves</Highlight> on delivering
            <br />proactive service and support
          </H2>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <IconCard
                key={service.href}
                href={service.href}
                icon={<Icon size={26} strokeWidth={1.5} />}
                className="group block"
              >
                <H3 className="mb-2">
                  <Highlight>{service.titleGreen} </Highlight>
                  {service.titleBlack}
                </H3>
                <P>{service.description}</P>
              </IconCard>
            );
          })}
        </div>

        {/* CTA */}
        {/* <div className="mt-12 text-center">
          <Button href="/services" variant="outline">
            View All Services <ArrowRight size={15} />
          </Button>
        </div> */}

      </div>
    </section>
  );
}
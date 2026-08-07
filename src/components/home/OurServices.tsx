import { H2, H3, Label, Highlight, P } from "@/components/ui/typography";
import { IconCard } from "@/components/ui/card";
import Image from "next/image";

const services = [
  {
    icon: "/webp-img/icon-1.webp",
    titleGreen: "Home",
    titleBlack: "Loans",
    description:
      "Owner-occupied, investment, refinancing and construction lending solutions tailored to your circumstances.",
    href: "#",
  },
  {
    icon: "/webp-img/icon-2.webp",
    titleGreen: "Commercial",
    titleBlack: "Loans",
    description:
      "Funding for commercial property acquisitions or refinancing, aligned with your long-term  strategy.",
    href: "#",
  },
  {
    icon: "/webp-img/icon-3.webp",
    titleGreen: "Business",
    titleBlack: "Finance",
    description:
      "Structured lending to support business purchases, expansion, or working capital requirements.",
    href: "#",
  },
  {
    icon: "/webp-img/icon-4.webp",
    titleGreen: "Asset",
    titleBlack: "Finance",
    description:
      "Finance solutions for vehicles, plant, and equipment to support operational growth and cash flow management.",
    href: "#",
  },
  {
    icon: "/webp-img/icon-5.webp",
    titleGreen: "Development",
    titleBlack: "Finance",
    description:
      "Funding assistance for residential or commercial development projects, with guidance through lender requirements.",
    href: "#",
  },
  {
    icon: "/webp-img/icon-6.webp",
    titleGreen: "SMSF",
    titleBlack: "Finance",
    description:
      "Lending support for Self-Managed Super Funds investing in property, working alongside your professional advisers.",
    href: "#",
  },
];

export default function OurServices() {
  return (
    <section id="services" className="">
      <div className="max-w-7xl mx-auto px-10 sm:px-16 lg:px-26 py-10">
        {/* Header */}
        <div className="section-header">
          <Label className="mb-2">OUR SERVICES</Label>
          <H2 className="max-w-xl">
            Finance Solutions Designed for <br className="hidden md:block lg:block "></br>  <Highlight>What&apos;s Next.</Highlight> 
           
          </H2>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-5">
          {services.map((service, i) => (
            <IconCard
              key={i}
              href={service.href}
              icon={
                <Image
                  src={service.icon}
                  alt={service.titleGreen}
                  width={40}
                  height={40}
                  className="object-contain"
                />
              }
            >
              <H3 className="mb-2">
                <Highlight>{service.titleGreen} </Highlight>
                {service.titleBlack}
              </H3>
              <P>{service.description}</P>
            </IconCard>
          ))}
        </div>
      </div>
    </section>
  );
}

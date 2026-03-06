import { H2, H3, Label, Highlight, P } from "@/components/ui/typography";
import { IconCard } from "@/components/ui/card";
import Image from "next/image";

const services = [
  {
    icon: "/images/icon-1.png",
    titleGreen: "Home",
    titleBlack: "Loans",
    description:
      "Owner-occupied, investment, refinancing and construction lending solutions tailored to your circumstances.",
    href: "/services/home-loans",
  },
  {
    icon: "/images/icon-2.png",
    titleGreen: "Commercial",
    titleBlack: "Loans",
    description:
      "Funding for commercial property acquisitions or refinancing, aligned with your long-term investment strategy.",
    href: "/services/commercial-loans",
  },
  {
    icon: "/images/icon-3.png",
    titleGreen: "Business",
    titleBlack: "Finance",
    description:
      "Structured lending to support business purchases, expansion, or working capital requirements.",
    href: "/services/business-finance",
  },
  {
    icon: "/images/icon-4.png",
    titleGreen: "Asset",
    titleBlack: "Finance",
    description:
      "Finance solutions for vehicles, plant, and equipment to support operational growth and cash flow management.",
    href: "/services/asset-finance",
  },
  {
    icon: "/images/icon-5.png",
    titleGreen: "Development",
    titleBlack: "Finance",
    description:
      "Funding assistance for residential or commercial development projects, with guidance through lender requirements.",
    href: "/services/development-finance",
  },
  {
    icon: "/images/icon-6.png",
    titleGreen: "SMSF",
    titleBlack: "Finance",
    description:
      "Lending support for Self-Managed Super Funds investing in property, working alongside your professional advisers.",
    href: "/services/smsf-finance",
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
          {services.map((service) => (
            <IconCard
              key={service.href}
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

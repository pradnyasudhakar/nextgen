import { H2, H3, Label, Highlight, P } from "@/components/ui/typography";
import { IconCard } from "@/components/ui/card";
import Image from "next/image";

const services = [
  {
    icon: "/images/icon-1.png",
    titleGreen: "Home",
    titleBlack: "Loans",
    description:
      "Finance structured to support the life built around the property, not just the purchase itself.",
    href: "/services/home-loans",
  },
  {
    icon: "/images/icon-2.png",
    titleGreen: "Commercial",
    titleBlack: "Loans",
    description:
      "Capital positioned with intent, reflecting in both performance and long-term conviction.",
    href: "/services/commercial-loans",
  },
  {
    icon: "/images/icon-3.png",
    titleGreen: "Business",
    titleBlack: "Finance",
    description:
      "Capital that works in the background so your business can move forward in the foreground.",
    href: "/services/business-finance",
  },
  {
    icon: "/images/icon-4.png",
    titleGreen: "Asset",
    titleBlack: "Finance",
    description:
      "Capability strengthened without unsettling the balance sheet or disrupting financial stability.",
    href: "/services/asset-finance",
  },
  {
    icon: "/images/icon-5.png",
    titleGreen: "Development",
    titleBlack: "Finance",
    description:
      "Funding designed to advance in line with feasibility, timelines, and each stage of delivery.",
    href: "/services/development-finance",
  },
  {
    icon: "/images/icon-6.png",
    titleGreen: "SMSF",
    titleBlack: "Finance",
    description:
      "Strategic borrowing within your super fund, structured with foresight and long-term discipline.",
    href: "/services/smsf-finance",
  },
];

export default function OurServices() {
  return (
    <section className="">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-20 py-10">
        {/* Header */}
        <div className="section-header">
          <Label className="mb-2">OUR SERVICES</Label>
          <H2 className="max-w-xl">
            We <Highlight>pride ourselves</Highlight> on delivering
            <br />
            proactive service and support
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

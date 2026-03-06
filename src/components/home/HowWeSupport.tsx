import { H2, Label, Highlight } from "@/components/ui/typography";
import { NumberCard } from "@/components/ui/card";

type TitlePart = { text: string; green?: boolean };

const features: {
  number: string;
  title: TitlePart[];
  description: string;
  href: string;
}[] = [
  {
    number: "1",
    title: [{ text: "A Relationship-First", green: true }, { text: " Approach" }],
    description: "Partnerships built on understanding your goals.",
    href: "#",
  },
  {
    number: "2",
    title: [{ text: "Time to " }, { text: "Understand", green: true }, { text: " Your Story" }],
    description: "We explore your journey before shaping solutions.",
    href: "#",
  },
  {
    number: "3",
    title: [{ text: "Clear, Honest " }, { text: "Communication", green: true }],
    description: "Options and outcomes explained clearly for confident decisions.",
    href: "#",
  },
  {
    number: "4",
    title: [{ text: "Support Beyond " }, { text: "Settlement", green: true }],
    description: "Guidance continues as your needs and goals evolve.",
    href: "#",
  },
  {
    number: "5",
    title: [{ text: "Best Interest and " }, { text: "Compliance Focus", green: true }],
    description: "Recommendations grounded in your best interest, always.",
    href: "#",
  },
  {
    number: "6",
    title: [{ text: "Consistency and " }, { text: "Accountability", green: true }],
    description: "Steady engagement and reliable outcomes you can count on.",
    href: "#",
  },
  {
    number: "7",
    title: [{ text: "Professional Network", green: true }, { text: " and Lender Access" }],
    description: "Connections that give access to the right capital and advice.",
    href: "#",
  },
];

export default function HowWeSupport() {
  return (
    <section className="">
      <div className="max-w-7xl mx-auto px-10 sm:px-16 lg:px-26 py-10">

        <div className="section-header">
          <Label className="mb-4">HOW WE SUPPORT OUR CLIENTS</Label>
          <H2 className="max-w-2xl">
            A relationship-first approach,{" "}
            <Highlight>expert guidance,</Highlight>
            <br className="hidden md:block lg:block" />
            and disciplined execution at every stage.
          </H2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f) => (
            <NumberCard
              key={f.number}
              number={f.number}
              titleParts={f.title}
              description={f.description}
              href={f.href}
            />
          ))}
        </div>

      </div>
    </section>
  );
}
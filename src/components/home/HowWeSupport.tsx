import { H2, Label, Highlight } from "@/components/ui/typography";
import { NumberCard } from "@/components/ui/card";

const features = [
  {
    number: "1",
    title: "Lifetime loan support",
    description: "We stay with you beyond approval — ongoing help, answers, and reviews as your goals change.",
    href: "/services",
  },
  {
    number: "2",
    title: "Real people, fast response",
    description: "Speak to a dedicated broker who makes the process simple and keeps you updated promptly.",
    href: "/contact-us",
  },
  {
    number: "3",
    title: "Right-fit loans, competitive rates",
    description: "We listen first, then source options that match your needs and negotiate strong rates from lenders.",
    href: "/calculators",
  },
];

export default function HowWeSupport() {
  return (
    <section className="">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-20 py-10">

        {/* Header */}
        <div className="section-header">
          <Label className="mb-4">Why Choose Us </Label>
          <H2 className="max-w-2xl">
            <Highlight>Careful thinking,</Highlight>{" "}
            commercial judgement,
            <br />and quiet persistence at work.
          </H2>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 md:gap-4">
          {features.map((f) => (
            <NumberCard
              key={f.number}
              number={f.number}
              title={f.title}
              description={f.description}
              href={f.href}
            />
          ))}
        </div>

      </div>
    </section>
  );
}
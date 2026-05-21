import { H2, H3, Label, P, Highlight } from "@/components/ui/typography";

const cards = [
  {
    title: [{ text: "A Relationship-First", green: true }, { text: " Approach" }],
    description: "Partnerships built on understanding your goals.",
  },
  {
    title: [{ text: "Time to " }, { text: "Understand", green: true }, { text: " Your Story" }],
    description: "We explore your journey before shaping solutions.",
  },
  {
    title: [{ text: "Clear, Honest " }, { text: "Communication", green: true }],
    description: "Options and outcomes explained clearly for confident decisions.",
  },
  {
    title: [{ text: "Support Beyond " }, { text: "Settlement", green: true }],
    description: "Guidance continues as your needs evolve.",
  },
];

type TitlePart = { text: string; green?: boolean };

export default function WhyChooseUs() {
  return (
    <section>
      <div className="max-w-7xl mx-auto px-10 sm:px-16 lg:px-26 py-10 lg:py-20">

        {/* Header */}
        <div className="section-header">
          <Label className="mb-3">WHY CHOOSE US</Label>
          <H2 className="mb-3">
            <Highlight>Experience</Highlight> You Can Rely On, Every Step of the Way.
          </H2>
          <P className="">
            We take a disciplined approach, backed by strong industry relationships and a
            deep understanding of each client. Clients value our transparency,
            responsiveness, and the confidence that comes from a team engaged at every step.
          </P>
        </div>

        {/* 4 Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-10">
          {cards.map((card, i) => (
            <div
              key={i}
              className="border border-primary rounded-md p-6 bg-[#FBFBFB] "
            >
              <H3 className="mb-4 text-[1.2rem]! font-[500]! leading-snug">
                {(card.title as TitlePart[]).map((part, j) =>
                  part.green
                    ? <span key={j} style={{ color: "var(--color-primary)" }}>{part.text}</span>
                    : <span key={j} className="text-dark">{part.text}</span>
                )}
              </H3>
              <P className="text-[1rem]!">{card.description}</P>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
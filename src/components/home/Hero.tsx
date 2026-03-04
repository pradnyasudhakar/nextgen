import { Button } from "@/components/ui/button";
import { Display, Lead } from "@/components/ui/typography";

export default function Hero() {
  return (
    <section className="relative w-full overflow-hidden min-h-auto md:min-h-screen">

      {/* Background Image */}
      <img
        src="https://images.unsplash.com/photo-1609220136736-443140cffec6?w=1600&q=85"
        alt="Happy family"
        className="absolute inset-0 rounded-md w-full h-full object-cover object-center"
      />

      {/* Gradient overlay */}
      <div className="absolute inset-0 rounded-md bg-linear-to-r from-black/60 via-black/30 to-black/5" />

      {/* Content */}
      <div className="relative z-10 flex items-center md:min-h-screen max-w-7xl mx-auto px-6 sm:px-10 lg:px-20 py-20">
        <div className="max-w-100">

        <div className="">
            {/* Heading */}
         <Display className="text-[#ffffffe6] font-normal mb-6">
  Standing With You at the Threshold of{" "} <br></br>
  <span className="font-[700]">What&apos;s Next</span>
</Display>
        </div>

          {/* Subtext */}
          <Lead className="text-[#ffffffe6] font-normal mb-10 max-w-80">
            We provide the capital and insight needed as you step into new
            opportunities and decisions.
          </Lead>

          {/* CTA */}
          <Button href="/contact-us" variant="primary" size="lg">
            Book an Appointment
          </Button>

        </div>
      </div>

    </section>
  );
}
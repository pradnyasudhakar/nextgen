import Image from "next/image";
import { Button } from "@/components/ui/button";
import {  H2, H3, Label,  P , Highlight } from "@/components/ui/typography";
import { Phone } from "lucide-react";

export default function ContactPage() {
  return (
    <section className="max-w-7xl mx-auto px-10 sm:px-16 lg:px-26 py-10 lg:py-20 ">

      {/* Heading */}
      <div className="mb-12 max-w-120">

        <Label className="mb-4" >
          CONTACT US
        </Label>

        <H2 className=" mb-4">
          Get in Touch with <Highlight>Our Team</Highlight>
        </H2>

        <P>
          We’re here to answer your questions and help you find the best
          solutions for your loan needs. Reach out to us.
        </P>

      </div>

      {/* Grid */}
      <div className="grid lg:grid-cols-2 gap-12">

        {/* FORM */}
        <div className="bg-[#FBFBFB] rounded-md shadow-[0px_3px_30px_0px_#0000001A] p-8">

          <div className="space-y-4">

            <div>
              <label className="text-body font-[500] text-dark">Name <span className="text-red-600" >*</span> </label>
              <input
                type="text"
                placeholder="Your Full Name"
                className="w-full mt-1 border rounded-md px-4 py-2"
              />
            </div>

            <div>
               <label className="text-body font-[500] text-dark">Email Address <span className="text-red-600" >*</span> </label>
              <input
                type="email"
                placeholder="We'll get back to you here"
                className="w-full mt-1 border rounded-md px-4 py-2"
              />
            </div>

            <div>
               <label className="text-body font-[500] text-dark">Phone Number  <span className="text-red-600" >*</span> </label>
              <input
                type="text"
                placeholder="We'll contact you on this"
                className="w-full mt-1 border rounded-md px-4 py-2"
              />
            </div>

            <div>
              <label className="text-body font-[500] text-dark">State Based in  <span className="text-red-600" >*</span> </label>
              <select className="w-full text-[#9C9C9C] mt-1 border rounded-md px-4 py-2">
                <option>Select your locality</option>
              </select>
            </div>

            <div>
              <label className="text-body font-[500] text-dark">Message <span className="text-red-600" >*</span> </label>
              <textarea
                rows={4}
                placeholder="Tell us how we can help"
                className="w-full mt-1 border rounded-md px-4 py-1"
              />
            </div>

            <div className="flex justify-end">
              <Button variant="primary" size="lg">
                Submit
              </Button>
            </div>

          </div>
        </div>

        {/* CONTACT INFO */}
        <div className="border-[1.5px] border-primary rounded-md p-6">

          <H3 className="text-dark text-2xl mb-6">
            Prefer a <span className="text-primary">Direct Approach?</span>
          </H3>

          <P className="z mb-6">
            You can contact us directly through the details below.
          </P>

          <div className="space-y-6 text-dark">

  <P className="flex items-center gap-3">
    <Phone className="w-5 h-5 text-primary" fill="currentColor" strokeWidth={0} />
    0424-687-866
  </P>

  <P className="flex items-center gap-3">
  <Image
    src="/images/mail.png"
    alt="email icon"
    width={20}
    height={20}
  />
  admin@nextgenlg.com.au
</P>
  <P className="flex items-center gap-3">
     <Image
    src="/images/clock.png"
    alt="email icon"
    width={20}
    height={20}
  />
    Monday to Friday, 9 AM – 6 PM (AEDT)
  </P>

  <P className="flex items-center gap-3">
     <Image
    src="/images/send.png"
    alt="email icon"
    width={20}
    height={20}
  />
    PO Box 52, Vermont, VIC 3133
  </P>

</div>

          {/* Image */}
          <div className="relative mt-8 h-70 rounded-md overflow-hidden">
            <Image
              src="/images/contact-img.png"
              alt="contact"
              fill
              className="object-cover"
            />
          </div>

        </div>

      </div>

    </section>
  );
}
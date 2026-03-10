import { H2, H3, Label, Highlight, P } from "@/components/ui/typography";

export default function ComplimentsConcerns() {
  return (
    <section className="w-full overflow-hidden">
      <div className="max-w-7xl mx-auto px-10 sm:px-16 lg:px-26 py-20">

        {/* Header */}
        <div className="mb-10">
          <Label className="mb-3">FEEDBACK</Label>
          <H2>Compliments <Highlight>&amp; Concerns</Highlight></H2>
          <P className="mt-4  text-[#555555]">
            We always work hard to build strong and lasting relationships with our valued
            customers. By listening to your feedback, not only can we address any immediate
            concerns you may have, we will also continually improve our products and services.
          </P>
          <P className="mt-3  text-[#555555]">
            We know there are times when you may wish to compliment us on something we have
            done well and other times when you may wish to tell us we have not met your
            expectations.
          </P>
        </div>

        <div className=" space-y-8">

          {/* Compliments */}
          <div className="bg-[#f5faf8] border border-[#d0e8e0] rounded-md p-6">
            <H3 className="text-primary mb-3">Compliments</H3>
            <P className="leading-relaxed text-[#3f3f3f]">
              Our representatives are always delighted to know that they have succeeded in
              making your experience a pleasant and successful one. If one of our
              representatives has provided you with exceptional service in any way, please
              let us know using the details below, so that we can further encourage them
              via this feedback process.
            </P>
          </div>

          {/* Concerns */}
          <div className="bg-[#f5faf8] border border-[#d0e8e0] rounded-md p-6">
            <H3 className="text-[#002566] mb-3">Concerns</H3>
            <P className="leading-relaxed text-[#3f3f3f]">
              If, for any reason, you do not feel that you have received the highest standard
              of care from us, we likewise encourage you to share this with us. We have
              developed a process that we believe makes it easy for you to tell us of your
              concerns and for them to be addressed quickly and fairly.
            </P>
            <P className="leading-relaxed text-[#3f3f3f] mt-3">
              If you choose to contact us by mail or email, please make sure you provide as
              much detail as possible about your complaint.
            </P>
          </div>

          {/* Need an update */}
          <div>
            <H3 className="text-[#002566] mb-3">Need an Update on Your Complaint?</H3>
            <P className="leading-relaxed text-[#3f3f3f]">
              If you have lodged a complaint with us, you can contact us at any time to ask
              for an update on its status. Contact us through any of the methods listed below
              and please be sure to refer to your earlier communication so that we can respond
              effectively.
            </P>
          </div>

          {/* Resolution */}
          <div>
            <H3 className="text-[#002566] mb-3">Resolution</H3>
            <P className="leading-relaxed text-[#3f3f3f]">
              We will write to you to acknowledge your complaint within{" "}
              <span className="font-[600] text-[#002566]">24 hours</span> to ensure we
              treat you fairly and will work to resolve your complaint as soon as possible.
              In the rare event we are still investigating your complaint after{" "}
              <span className="font-[600] text-[#002566]">30 days</span>, we will write to
              you to explain why and to let you know when we expect to have completed our
              investigation.
            </P>
            <P className="leading-relaxed text-[#3f3f3f] mt-3">
              When we have completed our investigation, we will write to let you know the
              outcome and the reasons for our decision.
            </P>
          </div>

          {/* Taking it further */}
          <div className="border border-[#d0e8e0] rounded-md p-6">
            <H3 className="text-[#002566] mb-3">Taking It Further</H3>
            <P className="leading-relaxed text-[#3f3f3f] mb-5">
              We hope that you will be satisfied with how we deal with your complaint.
              However, if your concerns remain unresolved, or you have not heard from us
              within 30 days, then you can have your complaint heard by an independent
              party — the <span className="font-[600]">Australian Financial Complaints Authority (AFCA)</span>:
            </P>

            {/* AFCA contact details */}
            <div className="bg-[#f5faf8] rounded-[10px] p-5 space-y-3">
              <P className="flex items-center gap-3 text-[#3f3f3f]">
                <span className="font-[600] w-16 shrink-0">Online</span>
                <a href="https://www.afca.org.au" target="_blank" rel="noreferrer"
                  className="text-primary underline underline-offset-2">
                  www.afca.org.au
                </a>
              </P>
              <P className="flex items-center gap-3 text-[#3f3f3f]">
                <span className="font-[600] w-16 shrink-0">Email</span>
                <a href="mailto:info@afca.org.au"
                  className="text-primary underline underline-offset-2">
                  info@afca.org.au
                </a>
              </P>
              <P className="flex items-center gap-3 text-[#3f3f3f]">
                <span className="font-[600] w-16 shrink-0">Phone</span>
                <a href="tel:1800931678"
                  className="text-primary underline underline-offset-2">
                  1800 931 678
                </a>
                <span className="text-[#9C9C9C] text-sm">(free call)</span>
              </P>
              <P className="flex items-start gap-3 text-[#3f3f3f]">
                <span className="font-[600] w-16 shrink-0">Mail</span>
                <span>Australian Financial Complaints Authority<br />GPO Box 3, Melbourne VIC 3001</span>
              </P>
            </div>

            <P className="leading-relaxed text-[#9C9C9C] text-sm mt-4">
              Time limits may apply to complain to AFCA and so you should act promptly or
              otherwise consult the AFCA website to find out if or when the time limit
              relevant to your circumstances expires.
            </P>
          </div>

        </div>
      </div>
    </section>
  );
}
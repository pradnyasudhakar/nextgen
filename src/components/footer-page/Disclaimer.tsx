import { H2, H3, Label, Highlight, P } from "@/components/ui/typography";

export default function DisclaimerHero() {
  return (
    <section className="w-full overflow-hidden">
      <div className="max-w-7xl mx-auto px-10 sm:px-16 lg:px-26 py-20">

        {/* Header */}
        <div className="mb-10">
          <Label className="mb-3">LEGAL</Label>
          <H2>Disclaimer <Highlight>Statement</Highlight></H2>
        </div>

        {/* Content */}
        <div className="space-y-8 ">

          {/* General Info */}
          <div className="bg-[#f5faf8] border border-[#d0e8e0] rounded-md p-6">
            <P className="leading-relaxed text-[#3f3f3f]">
              This page provides general information only and has been prepared without taking
              into account your objectives, financial situation or needs. We recommend that you
              consider whether it is appropriate for your circumstances and your full financial
              situation will need to be reviewed prior to acceptance of any offer or product.
              It does not constitute legal, tax or financial advice and you should always seek
              professional advice in relation to your individual circumstances.
            </P>
          </div>

          {/* Credit Representative */}
          <div>
            <H3 className="text-[#002566] mb-3">Credit Representative</H3>
            <P className="leading-relaxed text-[#3f3f3f] mb-4">
              <Highlight>Zak Consultancy Pty Ltd</Highlight> is a Credit Representative and
              operate under the licence of Connective, Australian Credit Licence (ACL){" "}
              <Highlight>389328</Highlight>. We are qualified to provide credit advice and
              have completed the industry requirements:
            </P>
            <div className="space-y-2 pl-4 border-l-2 border-primary">
              <P className="text-[#3f3f3f]">
                Certificate IV Financial Services (Finance / Mortgage Broking){" "}
                <span className="font-[600]">FNS40811</span>
              </P>
              <P className="text-[#3f3f3f]">
                Diploma of Finance and Mortgage Broking Management{" "}
                <span className="font-[600]">FNS50311</span>
              </P>
            </div>
          </div>

          {/* Privacy */}
          <div>
            <H3 className="text-[#002566] mb-3">Privacy Policy</H3>
            <P className="leading-relaxed text-[#3f3f3f]">
              The privacy of your personal information is important to us. By providing your
              personal information to Connective (our aggregator), you consent to be contacted
              by a representative of Connective from time to time for marketing purposes. We
              will use your contact details to send you direct marketing communications
              including offers, updates and newsletters that are relevant to the services we
              provide. We may do so by mail or electronically. You can unsubscribe by notifying
              us and we will no longer send this information to you. For Connective&apos;s full
              Privacy Policy, please refer to the{" "}
              <a
                href="https://www.connective.com.au/"
                target="_blank"
                rel="noreferrer"
                className="text-primary underline underline-offset-2 font-[500]"
              >
                (https://www.connective.com.au/)
              </a>
              .
            </P>
          </div>

        </div>
      </div>
    </section>
  );
}
import { H2, H3, Label, Highlight, P } from "@/components/ui/typography";

export default function PrivacyPolicy() {
  return (
    <section className="w-full overflow-hidden">
      <div className="max-w-7xl mx-auto px-10 sm:px-16 lg:px-26 py-20">

        {/* Header */}
        <div className="mb-10">
          <Label className="mb-3">LEGAL</Label>
          <H2>Privacy <Highlight>Policy</Highlight></H2>
          <P className="mt-4  text-[#555555]">
            At NextGen Lending Group, we are committed to protecting your privacy in
            accordance with the Privacy Act 1988 (Cth). This Privacy Policy describes
            our current policies and practices in relation to the handling and use of
            personal information.
          </P>
        </div>

        {/* Sections */}
        <div className=" space-y-10">

          <div>
            <H3 className="text-[#002566] mb-3">What Information Do We Collect and How Do We Use It?</H3>
            <P className="leading-relaxed text-[#3f3f3f]">
              We will ask you for personal information when we assist you with your finance.
              Personal information may include any sensitive information (including health
              information) and may include any information you tell us about any vulnerability
              you may have. We use the information you provide to advise about and assist with
              your credit needs. We only provide your information to the companies with whom
              you choose to deal (and their representatives).
            </P>
            <P className="leading-relaxed text-[#3f3f3f] mt-3">
              We also use your information to send you requested product information and to
              enable us to manage your ongoing relationship with us e.g. invoicing, client
              surveys etc. We may do so by mail or electronically unless you tell us that you
              do not wish to receive electronic communications.
            </P>
            <P className="leading-relaxed text-[#3f3f3f] mt-3">
              We may occasionally notify you about promotions, new services and special offers,
              events, or articles we think will be of interest to you. If you would rather not
              receive this information, email or write to us. We may also use your information
              internally to help us improve our services and help resolve any problems.
            </P>
          </div>

          <div>
            <H3 className="text-[#002566] mb-3">What If You Do Not Provide Some Information to Us?</H3>
            <P className="leading-relaxed text-[#3f3f3f]">
              If you do not provide us with full information, we cannot properly advise or
              assist you with your credit needs.
            </P>
          </div>

          <div>
            <H3 className="text-[#002566] mb-3">How Do We Hold and Protect Your Information?</H3>
            <P className="leading-relaxed text-[#3f3f3f]">
              We strive to maintain the reliability, accuracy, completeness, and currency of
              the personal information we hold and to protect its privacy and security. We keep
              personal information only for as long as is reasonably necessary for the purpose
              for which it was collected or to comply with any applicable legal or ethical
              reporting or document retention requirements.
            </P>
          </div>

          <div>
            <H3 className="text-[#002566] mb-3">Will We Disclose the Information We Collect to Anyone?</H3>
            <P className="leading-relaxed text-[#3f3f3f]">
              We do not sell, trade, or rent your personal information to others. We may need
              to provide your information to our credit licensee for administration and
              supervision activities, or contractors who supply services to us. However, we
              will do our best to ensure that they protect your information in the same way
              that we do.
            </P>
            <P className="leading-relaxed text-[#3f3f3f] mt-3">
              We may also provide your information to others if we are required to do so by
              law or under some unusual other circumstances which the Privacy Act permits.
            </P>
          </div>

          <div>
            <H3 className="text-[#002566] mb-3">How Can You Check, Update, or Change the Information We Are Holding?</H3>
            <P className="leading-relaxed text-[#3f3f3f]">
              Upon receipt of your written request and enough information to allow us to identify the information, we will disclose to you the personal information we hold about you. We will also correct, amend, or delete any personal information that we agree is inaccurate. 
            </P>
            <P className="leading-relaxed text-[#3f3f3f] mt-3">
              If you wish to access or correct your personal information, please contact us at{" "}
              <a href="mailto:admin@nextgenlg.com.au"
                className="text-primary underline underline-offset-2 font-[500]">
                admin@nextgenlg.com.au
              </a>.
            </P>
          </div>

          <div>
            <H3 className="text-[#002566] mb-3">Your Consent</H3>
            <P className="leading-relaxed text-[#3f3f3f]">
              By asking us to assist with your credit needs, you consent to the collection
              and use of the information you have provided to us for the purposes described
              above.
            </P>
          </div>

          <div>
            <H3 className="text-[#002566] mb-3">Tell Us What You Think</H3>
            <P className="leading-relaxed text-[#3f3f3f]">
              We welcome your questions and comments about privacy. If you have any concerns
              or complaints, please contact us at{" "}
              <a href="mailto:admin@nextgenlg.com.au"
                className="text-primary underline underline-offset-2 font-[500]">
                admin@nextgenlg.com.au
              </a>.
            </P>
          </div>

          <div className="bg-[#f5faf8] border border-[#d0e8e0] rounded-md p-6">
            <H3 className="text-[#002566] mb-3">Complaints — Internal Dispute Resolution</H3>
            <P className="leading-relaxed text-[#3f3f3f]">
              If you do have a complaint, please let us know by email, because if we do not know about it, we cannot fix it.{" "}
              You may also contact us by email addressed to; The Complaints Officer at &nbsp;
              <a href="mailto:admin@nextgenlg.com.au"
                className="text-primary underline underline-offset-2 font-[500]">
                   admin@nextgenlg.com.au
              </a>{" "}&nbsp;
              please make sure you include as much information as you can.
            </P>
            <P>You should explain the details of your complaint as clearly as you can. You must do this in writing. When we receive a complaint, we will attempt to resolve it promptly.</P>
          </div>

        </div>
      </div>
    </section>
  );
}
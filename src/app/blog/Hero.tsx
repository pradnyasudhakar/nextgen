import { Display, Lead, P } from "@/components/ui/typography";

export default function Hero() {
  return (
    <section className="w-full px-3 overflow-hidden">
      <div
        style={{ backgroundImage: "url('/images/blog-bg.png')" }}
        className="w-full h-130 sm:h-90 lg:h-100 rounded-md bg-cover bg-center bg-no-repeat relative"
      >
        

        {/* Content */}
        <div className="relative z-10 flex items-center h-130 sm:h-90 lg:h-100 max-w-7xl mx-auto px-10 sm:px-16 lg:px-26 py-20">
          <div className="max-w-120 mt-8 lg:max-w-160 2xl:max-w-200">
            <P className="text-[#FBFBFB] font-normal">
              Financial Insights & Guides
            </P>
            <Display className="text-[#FBFBFB] [word-spacing:8px] leading-8 lg:leading-12 font-light mt-4 mb-4">
              <span className="font-[700]">
                Latest Finance News <br />& Guides
              </span>
            </Display>
            <Lead className="text-[#FBFBFB] max-w-2xl font-extralight mb-6">
              Expert advice on home loans, commercial finance, and everything
              in between — helping you make confident financial decisions.
            </Lead>
          </div>
        </div>
      </div>
    </section>
  );
}
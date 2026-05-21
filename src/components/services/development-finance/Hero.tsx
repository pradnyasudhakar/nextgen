import { Display,Lead } from "@/components/ui/typography";

export default function Hero() {
  return (
    <section className="w-full px-3 overflow-hidden">
      <div
        className="w-full h-130 sm:h-90   lg:h-100 rounded-[20px]
        bg-[url('/images/homeloan-bg.png')] bg-black/20 bg-blend-overlay bg-position-[65%]   lg:bg-cover  bg-no-repeat"
      >
        {/* Content */}
        <div className="flex items-center h-130 sm:h-90   lg:h-100 max-w-7xl mx-auto px-10 sm:px-16 lg:px-26 py-20">
          <div className=" max-w-120 lg:max-w-160 2xl:max-w-200 ">
            {/* Heading */}
            <Display className="text-[#FBFBFB] [word-spacing:8px] leading-8 lg:leading-12 font-light  mb-6">
              
              <span className="font-[700]">Development / Construction Finance</span>
            </Display>
            <Lead className="text-[#FBFBFB] max-w-90 2xl:max-w-110 font-extralight mb-6">
                        Funding that moves with your project, from land to completion
                        </Lead>
          </div>
        </div>
      </div>
    </section>
  );
}

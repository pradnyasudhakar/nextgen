"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Display, Lead } from "@/components/ui/typography";

export default function Hero() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setActive((prev) => (prev + 1) % 2);
    }, 4500);
    return () => clearInterval(id);
  }, []);

  return (
    <section className="w-full px-3 overflow-hidden">
      <div className="relative w-full min-h-130 lg:min-h-screen rounded-[20px] overflow-hidden bg-[#FBFBFB]">
        {/* ── Slide 1: Existing hero ── */}
        <div
          aria-hidden={active !== 0}
          className={`absolute inset-0 transition-opacity duration-[1200ms] ease-in-out ${
            active === 0 ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
          }`}
        >
          {/* Background image (LCP) */}
          <Image
            src="/webp-img/nextgen-hero-bg.webp"
            alt=""
            fill
            priority={active === 0}
            fetchPriority={active === 0 ? "high" : "low"}
            sizes="100vw"
            quality={70}
            className="object-cover object-[65%] lg:object-center -z-10"
          />
          {/* Dark overlay (bg-black/20 jaisa) */}
          <div className="absolute inset-0 bg-black/20 -z-10" />

          {/* Content */}
          <div className="flex items-center min-h-130 lg:min-h-screen max-w-7xl 2xl:max-w-8xl mx-auto px-10 sm:px-16 lg:px-26 py-20">
            <div className="max-w-105 2xl:max-w-150">
              <Display className="text-[#FBFBFB] [word-spacing:8px] leading-8 lg:leading-12 font-[300] mb-6">
                Your Partner For What <br />
                <span className="font-[700]">Comes Next</span>
              </Display>

              <Lead className="text-[#FBFBFB] max-w-105 2xl:max-w-110 font-extralight mb-6">
                We provide the guidance and insight needed as you step into new
                opportunities and decisions.
              </Lead>

              <Button
                href="/contact"
                className="text-[0.9rem] 2xl:text-[1rem]"
                variant="primary"
                size="lg"
              >
                Book an Appointment
              </Button>
            </div>
          </div>
        </div>

        {/* ── Slide 2: Figma broker banner ── */}
        <div
          aria-hidden={active !== 1}
          className={`absolute inset-0 transition-opacity duration-[1200ms] ease-in-out ${
            active === 1 ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
          }`}
        >
          {/* Tone filter: Figma jaisa gray base + stronger chevrons (fitted from Figma render) */}
          <svg
            width="0"
            height="0"
            className="absolute"
            aria-hidden="true"
            focusable="false"
          >
            <defs>
              <filter id="hero-broker-bg-tone" colorInterpolationFilters="sRGB">
                <feComponentTransfer>
                  <feFuncR type="linear" slope="1.686" intercept="-0.745" />
                  <feFuncG type="linear" slope="1.686" intercept="-0.745" />
                  <feFuncB type="linear" slope="1.686" intercept="-0.745" />
                </feComponentTransfer>
              </filter>
            </defs>
          </svg>

          {/* Background: cover + right anchored, vertical 24% (Figma match) */}
          <Image
            src="/webp-img/hero-broker-bg.webp"
            alt=""
            fill
            priority={active === 1}
            fetchPriority={active === 1 ? "high" : "low"}
            sizes="100vw"
            unoptimized
            style={{ filter: "url(#hero-broker-bg-tone)" }}
            className="object-cover object-[100%_24%]"
          />
          {/* Person cutout — right aligned, bottom cropped like Figma */}
          <div className="absolute bottom-0 -right-[8%] w-[85%] aspect-[700/934] translate-y-[33%] sm:right-0 sm:w-[54%] sm:translate-y-[28%] lg:top-0 lg:bottom-auto lg:right-[2%] lg:h-[130%] lg:w-[46%] lg:aspect-auto lg:translate-y-0 pointer-events-none">
            <Image
              src="/webp-img/hero-broker-person.webp"
              alt="Broker"
              fill
              sizes="(max-width: 640px) 62vw, (max-width: 1024px) 50vw, 46vw"
              quality={80}
              className="object-cover object-top"
            />
          </div>

          {/* Content */}
          <div className="relative flex items-start sm:items-center min-h-130 lg:min-h-screen max-w-7xl 2xl:max-w-8xl mx-auto px-10 sm:px-16 lg:px-26 pt-10 pb-20 sm:py-20">
            <div className="max-w-105 lg:max-w-150 2xl:max-w-165">
              <Display className="text-[#00674E] [word-spacing:0px] leading-[0.95] lg:leading-[1] font-[300] mb-3 lg:mb-4 text-[1.7rem] sm:text-[2rem] lg:text-[3.4rem]">
                Nominated as
                <span className="block font-[700] leading-[0.95] lg:leading-[1]">
                  New Broker Of The Year
                </span>
              </Display>

              {/* Award Badge */}
              <div className="bg-[#231F20] border-2 border-[#E0A22E] rounded-xl p-2.5 w-[92px] h-[84px] lg:w-[118px] lg:h-[107px] flex items-center justify-center mb-4">
                <Image
                  src="/webp-img/bba-27-badge.webp"
                  alt="BBA 27 Better Business Awards"
                  width={98}
                  height={87}
                  quality={75}
                  className="object-contain w-[76px] h-auto lg:w-[98px]"
                />
              </div>

             <div
  className="inline-block"
  onClickCapture={(e) => {
    const el = document.getElementById("how-we-support");
    if (el) {
      e.preventDefault();
      e.stopPropagation();
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }}
>
  <Button
    href="/#how-we-support"
    className="text-[0.9rem] 2xl:text-[1rem] max-sm:h-9! max-sm:px-4! max-sm:text-[0.8rem]!"
    variant="primary"
    size="lg"
  >
    Explore Our Approach
  </Button>
</div>
            </div>
          </div>
        </div>

        {/* ── Dots indicator (no arrows/buttons) ── */}
        <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2">
          <span
            className={`h-1.5 rounded-full transition-all duration-400 bg-white ${
              active === 0 ? "w-8 opacity-100 bg-[#00674E]" : "w-2 opacity-60"
            }`}
          />
          <span
            className={`h-1.5 rounded-full transition-all duration-400 bg-white ${
              active === 1 ? "w-8 opacity-100 bg-[#00674E]" : "w-2 opacity-60"
            }`}
          />
        </div>
      </div>
    </section>
  );
}
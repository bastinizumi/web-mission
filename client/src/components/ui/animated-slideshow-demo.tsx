import React from "react";
import {
  HoverSlider,
  HoverSliderImage,
  HoverSliderImageWrap,
  TextStaggerHover,
} from "@/components/ui/animated-slideshow";
import { Sparkles, ArrowRight } from "lucide-react";

export const WEB_MISSION_SLIDES = [
  {
    id: "slide-1",
    number: "01",
    title: "Web Platforms",
    category: "Full-Stack Engineering",
    imageUrl: "/images/service-web.jpg",
  },
  {
    id: "slide-2",
    number: "02",
    title: "3D Spatial UI",
    category: "Creative Technology",
    imageUrl: "/images/service-app.jpg",
  },
  {
    id: "slide-3",
    number: "03",
    title: "UI/UX Design",
    category: "Experience Design",
    imageUrl: "/images/service-uiux.jpg",
  },
  {
    id: "slide-4",
    number: "04",
    title: "Cloud Systems",
    category: "Cloud Architecture",
    imageUrl: "/images/growth-prism.jpg",
  },
  {
    id: "slide-5",
    number: "05",
    title: "SEO & Growth",
    category: "Growth Marketing",
    imageUrl: "/images/service-marketing.jpg",
  },
];

export function HoverSliderDemo() {
  return (
    <HoverSlider className="min-h-screen place-content-center p-6 md:px-12 bg-[#060709] text-white">
      <div className="max-w-6xl mx-auto w-full">
        {/* Header Tag */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/30 text-amber-300 text-xs font-mono uppercase tracking-widest mb-8">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          / Web Mission Flagship Capabilities
        </div>

        <div className="flex flex-wrap items-center justify-between gap-8 md:gap-16">
          {/* Service Titles List */}
          <div className="flex flex-col space-y-3 md:space-y-6">
            {WEB_MISSION_SLIDES.map((slide, index) => (
              <div key={slide.id} className="flex items-center gap-4 group">
                <span className="text-xs font-mono text-amber-500/60 group-hover:text-amber-400 transition-colors">
                  {slide.number}
                </span>
                <TextStaggerHover
                  index={index}
                  className="cursor-pointer text-3xl sm:text-5xl lg:text-6xl font-serif font-black uppercase tracking-tight text-slate-300 group-hover:text-amber-300 transition-colors"
                  text={slide.title}
                />
              </div>
            ))}
          </div>

          {/* Service Visual Preview Frame */}
          <HoverSliderImageWrap className="rounded-2xl border border-amber-500/30 p-2 bg-[#090b10] shadow-[0_0_40px_rgba(245,158,11,0.15)] max-w-lg w-full">
            {WEB_MISSION_SLIDES.map((slide, index) => (
              <div key={slide.id} className="relative rounded-xl overflow-hidden aspect-[4/3] w-full">
                <HoverSliderImage
                  index={index}
                  imageUrl={slide.imageUrl}
                  src={slide.imageUrl}
                  alt={slide.title}
                  className="size-full object-cover"
                  loading="eager"
                  decoding="async"
                />
                <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/90 via-black/40 to-transparent flex items-center justify-between">
                  <span className="text-xs font-mono uppercase tracking-wider text-amber-400">
                    {slide.category}
                  </span>
                  <span className="text-xs font-mono text-slate-400">
                    {slide.number} of 05
                  </span>
                </div>
              </div>
            ))}
          </HoverSliderImageWrap>
        </div>
      </div>
    </HoverSlider>
  );
}

export default HoverSliderDemo;

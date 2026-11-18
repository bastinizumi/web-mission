"use client" 

import * as React from "react"
import { MotionConfig, motion, type HTMLMotionProps } from "framer-motion"
import { cn } from "@/lib/utils"

export interface TextStaggerHoverProps {
  text: string
  index?: number
  active?: boolean
  dimmed?: boolean
}
export interface HoverSliderImageProps {
  index: number
  imageUrl: string
}
export interface HoverSliderProps {}
export interface HoverSliderContextValue {
  activeSlide: number
  changeSlide: (index: number) => void
}

export function splitText(text: string) {
  const words = text.split(" ").map((word) => word.concat(" "))
  const characters = words.map((word) => word.split("")).flat(1)

  return {
    words,
    characters,
  }
}

export const HoverSliderContext = React.createContext<
  HoverSliderContextValue | undefined
>(undefined)

export function useHoverSliderContext() {
  const context = React.useContext(HoverSliderContext)
  if (context === undefined) {
    throw new Error(
      "useHoverSliderContext must be used within a HoverSliderProvider"
    )
  }
  return context
}

export const HoverSlider = React.forwardRef<
  HTMLElement,
  React.HTMLAttributes<HTMLElement> & HoverSliderProps
>(({ children, className, ...props }, ref) => {
  const [activeSlide, setActiveSlide] = React.useState<number>(0)
  const changeSlide = React.useCallback(
    (index: number) => setActiveSlide(index),
    [setActiveSlide]
  )
  return (
    <HoverSliderContext.Provider value={{ activeSlide, changeSlide }}>
      <div className={className}>{children}</div>
    </HoverSliderContext.Provider>
  )
})
HoverSlider.displayName = "HoverSlider"

export const WordStaggerHover = React.forwardRef<
  HTMLSpanElement,
  React.HTMLAttributes<HTMLSpanElement>
>(({ children, className, ...props }, ref) => {
  return (
    <span
      className={cn("relative inline-block origin-bottom overflow-hidden")}
      {...props}
    >
      {children}
    </span>
  )
})
WordStaggerHover.displayName = "WordStaggerHover"

export const TextStaggerHover = React.forwardRef<
  HTMLElement,
  React.HTMLAttributes<HTMLElement> & TextStaggerHoverProps
>(({ text, index = 0, active, dimmed = true, children, className, ...props }, ref) => {
  const context = React.useContext(HoverSliderContext)
  const [internalHover, setInternalHover] = React.useState(false)
  const { characters } = splitText(text)

  const isActive =
    active !== undefined
      ? active
      : context !== undefined
      ? context.activeSlide === index
      : internalHover

  const handleMouseEnter = (e: React.MouseEvent<HTMLElement>) => {
    if (context && typeof index === "number") {
      context.changeSlide(index)
    }
    setInternalHover(true)
    props.onMouseEnter?.(e)
  }

  const handleMouseLeave = (e: React.MouseEvent<HTMLElement>) => {
    setInternalHover(false)
    props.onMouseLeave?.(e)
  }

  const handleClick = (e: React.MouseEvent<HTMLElement>) => {
    if (context && typeof index === "number") {
      context.changeSlide(index)
    }
    props.onClick?.(e)
  }

  return (
    <span
      className={cn(
        "relative inline-block origin-bottom overflow-hidden cursor-pointer",
        className
      )}
      {...props}
      ref={ref}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
    >
      {characters.map((char, charIdx) => (
        <span
          key={`${char}-${charIdx}`}
          className="relative inline-block overflow-hidden"
        >
          <MotionConfig
            transition={{
              delay: charIdx * 0.025,
              duration: 0.3,
              ease: [0.25, 0.46, 0.45, 0.94],
            }}
          >
            <motion.span
              className={cn(
                "inline-block",
                dimmed ? "opacity-30 text-slate-400" : "opacity-100 text-amber-300 font-black"
              )}
              initial={{ y: "0%" }}
              animate={isActive ? { y: "-110%" } : { y: "0%" }}
            >
              {char}
              {char === " " && charIdx < characters.length - 1 && <>&nbsp;</>}
            </motion.span>

            <motion.span
              className={cn(
                "absolute left-0 top-0 inline-block",
                isActive ? "opacity-100 text-amber-300 font-black" : "opacity-0"
              )}
              initial={{ y: "110%" }}
              animate={isActive ? { y: "0%" } : { y: "110%" }}
            >
              {char}
            </motion.span>
          </MotionConfig>
        </span>
      ))}
    </span>
  )
})
TextStaggerHover.displayName = "TextStaggerHover"

export const clipPathVariants = {
  visible: {
    clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
  },
  hidden: {
    clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0px)",
  },
}

export const HoverSliderImageWrap = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "grid overflow-hidden [&>*]:col-start-1 [&>*]:col-end-1 [&>*]:row-start-1 [&>*]:row-end-1 [&>*]:size-full",
        className
      )}
      {...props}
    />
  )
})
HoverSliderImageWrap.displayName = "HoverSliderImageWrap"

export const HoverSliderImage = React.forwardRef<
  HTMLImageElement,
  HTMLMotionProps<"img"> & HoverSliderImageProps
>(({ index, imageUrl, children, className, ...props }, ref) => {
  const context = React.useContext(HoverSliderContext)
  const isActive = context ? context.activeSlide === index : true

  return (
    <motion.img
      className={cn("inline-block align-middle", className)}
      transition={{ ease: [0.33, 1, 0.68, 1], duration: 0.8 }}
      variants={clipPathVariants}
      animate={isActive ? "visible" : "hidden"}
      ref={ref}
      {...props}
    />
  )
})
HoverSliderImage.displayName = "HoverSliderImage"

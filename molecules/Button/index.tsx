'use client'

import React from "react"
import { twMerge } from "tailwind-merge"

const Button = ({ text, onclick, width, height, outline, className }: { text?: string, onclick?: any, width?: number, height?: number, outline?: boolean, className?: string }) => {
  return (
    <div>
      <button
        onClick={onclick}
        className={twMerge(
          className,
          !outline ? 'bg-[#6EBFD0]' : 'border-[#6EBFD0] border-2 md:border-4',
          "rounded-3xl text-white font-satoshi font-bold cursor-pointer text-[18px] sm:text-[22px] md:text-[25px] leading-[24px] sm:leading-[30px] md:leading-[34px] ",
          "button-padding"
        )}
      >
        {text}
      </button>
    </div>
  )
}

export default Button
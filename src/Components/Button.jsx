import React from "react";

function Button({
  children,
  type = "button",
  bgColor = "bg-blue-600",
  textColor = "text-white",
  className = "",
  ...props
}) {
  return (
    <button
      className={`middle none center rounded-full bg-[#1C64F2] py-2.5  px-6 font-sans text-xs font-bold uppercase text-white 
        shadow-md shadow-[#1C64F2]/20 transition-all hover:shadow-lg hover:shadow-[#1C64F2]/40 focus:opacity-[0.85] focus:shadow-none 
        active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none ${bgColor} 
        ${textColor} ${className} `}
      data-ripple-light="true"
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;

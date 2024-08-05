import React from "react";

function GlowCheckbox() {
  return (
    <label className="relative block cursor-pointer select-none rounded-md text-3xl outline-2 outline-offset-1 outline-gray-700 focus:outline">
      <input className="peer absolute opacity-0" type="checkbox" />
      <div className="relative left-0 top-0 h-[1.6rem] w-[1.6rem] rounded-[0.3em] bg-white transition-all duration-300 after:absolute after:left-0 after:top-0 after:h-[1.6rem] after:w-[1.6rem] after:rotate-0 after:rounded-[0.3em] after:border-[2px] after:border-[rgba(0,0,0,0.863)] after:transition-all after:delay-100 after:duration-300 after:content-[''] peer-checked:bg-black peer-checked:shadow-[-13px_-13px_40px_0px_rgb(17,0,248),13px_-0_40px_0px_rgb(243,11,243),13px_-13px_40px_0px_rgb(253,228,0),13px_0_40px_0px_rgb(107,255,21),13px_13px_40px_0px_rgb(76,0,255),13px_13px_40px_0px_rgb(255,196,0),-13px_13px_40px_0px_rgb(90,105,240)] peer-checked:after:left-2 peer-checked:after:top-[1px] peer-checked:after:h-[0.6em] peer-checked:after:w-[0.35em] peer-checked:after:rotate-45 peer-checked:after:rounded-[0em] peer-checked:after:border-b-[0.1em] peer-checked:after:border-r-[0.1em] peer-checked:after:border-[rgba(238,238,238,0)_white_white_#fff0] dark:bg-black dark:after:border-[rgba(255,255,255,0.863)] dark:peer-checked:bg-white dark:peer-checked:after:border-[rgba(238,238,238,0)_black_black_#fff0]"></div>
    </label>
  );
}

function CheckboxAnim() {
  return (
    <label className="relative block cursor-pointer select-none rounded-full text-2xl outline-2 outline-offset-1 outline-[#0b6e4f] focus:outline">
      <input type="checkbox" className="peer absolute h-0 w-0 opacity-0" />
      <div className="relative left-0 top-0 h-[1.5rem] w-[1.5rem] rounded-[50%] bg-slate-200 transition duration-300 after:absolute after:left-[0.5rem] after:top-1 after:hidden after:h-[0.8rem] after:w-[0.5rem] after:rotate-45 after:border-b-[0.2rem] after:border-r-[0.2rem] after:content-[''] focus:outline-[#0b6e4f] peer-checked:animate-pulse peer-checked:rounded-lg peer-checked:bg-[#0b6e4f] peer-checked:after:block"></div>
    </label>
  );
}

const extra = {
  theme: {
    extend: {
      keyframes: {
        pulse: {
          "0%": { boxShadow: "0 0 0 #0B6E4F90", rotate: "20deg" },
          "50%": { rotate: "-20deg" },
          "75%": { boxShadow: "0 0 0 10px #0B6E4F60" },
          "100%": { boxShadow: "0 0 0 13px #0B6E4F30", rotate: "0" },
        },
      },
      animation: {
        pulse: "pulse 500ms ease-in-out",
      },
    },
  },
};

export { GlowCheckbox, CheckboxAnim, extra };

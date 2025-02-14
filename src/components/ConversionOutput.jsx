import React from "react";
import chevronLeftLarge1 from "../assets/chevron-left-large-1.svg";
import frame from "../assets/frame.svg";
import image1 from "../assets/image.png";

const ConversionOutput = () => {
    return (
        <div className="relative w-[390px] h-[868px] bg-white">
            <button className="all-[unset] box-border absolute w-[359px] h-[59px] top-[419px] left-4 bg-white rounded overflow-hidden border border-solid border-[#343434]">
                <div className="absolute top-[18px] left-[98px] [font-family:'Inter-Regular',Helvetica] font-normal text-[#343434] text-sm tracking-[0] leading-[21px] whitespace-nowrap">
                    VALAND ADITYAKUMAR
                </div>
            </button>

            <p className="absolute top-[263px] left-[33px] [font-family:'Inter-Regular',Helvetica] font-normal text-[#7e7e7e] text-sm text-center tracking-[0] leading-[19px]">
                We&#39;re happy that you&#39;ve taken the first step
                <br />
                towards a healthier you. We need a few details
                <br />
                to kickstart your journey.
            </p>

            <div className="absolute top-[364px] left-[101px] [font-family:'Inter-Bold',Helvetica] font-bold text-[#3e3e3e] text-xl tracking-[0] leading-[30px] whitespace-nowrap">
                What is your name?
            </div>

            <div className="absolute top-[220px] left-[138px] [font-family:'Inter-Bold',Helvetica] font-bold text-[#3e3e3e] text-xl tracking-[0] leading-[30px] whitespace-nowrap">
                Hey there .
            </div>

            <div className="absolute top-[515px] left-[139px] [font-family:'Inter-Regular',Helvetica] font-normal text-[#ce605a] text-sm tracking-[0] leading-[22px] whitespace-nowrap">
                Have a referral code?
            </div>

            <img
                className="absolute w-[34px] h-[34px] top-[508px] left-[95px]"
                alt="Image"
                src={image1}
            />

            <div className="absolute top-[167px] left-[178px] [font-family:'Archivo-Regular',Helvetica] font-normal text-[#323743] text-sm text-center tracking-[0] leading-[22px] whitespace-nowrap">
                1 or 5
            </div>

            <div className="absolute w-[259px] h-1.5 top-[198px] left-[65px] bg-[#bfdcc5] rounded-[3px] overflow-hidden">
                <div className="w-[18px] h-1.5 bg-[#386641] border-0 border-none" />
            </div>

            <div className="w-[50px] left-[15px] rounded-[25px] absolute h-[50px] top-[108px] bg-[#eff5f5]">
                <img
                    className="absolute w-6 h-6 top-[13px] left-[11px]"
                    alt="Chevron left large"
                    src={chevronLeftLarge1}
                />
            </div>

            <div className="w-[114px] left-[261px] rounded-[54px] absolute h-[50px] top-[108px] bg-[#eff5f5]">
                <div className="absolute top-[13px] left-[43px] [font-family:'Archivo-Medium',Helvetica] font-medium text-black text-sm text-center tracking-[0] leading-[22px] whitespace-nowrap">
                    Skip
                </div>
            </div>

            <div className="absolute w-[81px] h-[81px] top-[739px] left-[155px] bg-[#386641] rounded-[40.5px]">
                <img
                    className="absolute w-16 h-16 top-[9px] left-2.5"
                    alt="Frame"
                    src={frame}
                />
            </div>
        </div>
    );
};
export default ConversionOutput;

import React from "react";
import backArrow from "../assets/Back.png";
import googleLogo from "../assets/GoogleLogo.svg";
import Lock from "../assets/lock.svg"
import email from "../assets/mail.svg";

const Iphone = () => {
    return (
        <div className="bg-[#f7f9f6] flex justify-center items-center h-screen">
            <div className="bg-[#f7f9f6] w-[430px] h-[932px] relative overflow-hidden">
                {/* Top Section */}
                <div className="absolute w-full h-[87px] top-0 left-0">
                    <img
                        className="w-full h-full object-cover"
                        alt="Home top"
                        src={backArrow} // Replace with your actual image
                    />
                </div>

                {/* Login Form */}
                <div className="absolute w-full h-[647px] top-[63px] left-0">
                    {/* Background Rectangle */}
                    <div className="absolute w-full h-[274px] top-0 left-0 bg-[#2f3f27] rounded-[11px]" />

                    {/* Form Container */}
                    <div className="absolute w-[400px] h-[359px] top-[288px] left-[15px] bg-white rounded-[33px] shadow-lg">
                        <h2 className="absolute w-[119px] top-[20px] left-[18px] font-bold text-white text-[32px] text-center">
                            Login
                        </h2>

                        <p className="absolute w-[330px] top-[80px] left-[50px] font-normal text-[#000000e6] text-sm text-center">
                            Sign in to your account
                        </p>

                        {/* Email Input */}
                        <div className="absolute w-[374px] h-[59px] top-[120px] left-[7px] bg-[#fdfdfd] rounded-[15px] shadow-md">
                            <input
                                type="email"
                                placeholder="Email Address"
                                className="w-full h-full pl-12 pr-4 rounded-[15px] border-none outline-none"
                            />
                            <img
                                className="absolute w-[23px] h-[23px] top-[18px] left-[20px]"
                                alt="Mail"
                                src={email}
                            />
                        </div>

                        {/* Password Input */}
                        <div className="absolute w-[374px] h-[59px] top-[200px] left-[7px] bg-[#fdfdfd] rounded-[15px] shadow-md">
                            <input
                                type="password"
                                placeholder="Password"
                                className="w-full h-full pl-12 pr-4 rounded-[15px] border-none outline-none"
                            />
                            <img
                                className="absolute w-[23px] h-[23px] top-[18px] left-[20px]"
                                alt="Lock"
                                src={Lock} // Replace with lock icon
                            />
                        </div>

                        {/* Remember Password and Forgot Password */}
                        <div className="absolute w-[362px] h-[30px] top-[280px] left-[37px] flex justify-between">
                            <div className="font-normal text-[#6b5e5e] text-[21px]">
                                Remember password
                            </div>
                            <div className="font-normal text-[#0386d0] text-[21px]">
                                Forget password
                            </div>
                        </div>

                        {/* Sign In Button */}
                        <div className="absolute w-[374px] h-[59px] top-[330px] left-[7px] bg-[#2f3f27] rounded-[15px] shadow-md flex justify-center items-center">
                            <button className="font-extrabold text-white text-[32px]">
                                Sign in
                            </button>
                        </div>
                    </div>
                </div>

                {/* Social Login Section */}
                <div className="absolute w-[300px] h-[133px] top-[703px] left-[65px]">
                    <div className="absolute w-full h-[66px] top-[67px] left-0 bg-white rounded-[22px] shadow-md" />

                    <div className="absolute w-[241px] h-[115px] top-0 left-[27px]">
                        <div className="absolute w-[185px] h-[35px] top-0 left-[58px] text-[#736f6f] text-[25px] text-center">
                            or connect with
                        </div>

                        <div className="absolute w-[180px] h-9 top-[79px] left-0 flex justify-between">
                            <img
                                className="w-[50px] h-9"
                                alt="Google"
                                src={googleLogo}
                            />
                        </div>
                    </div>

                
                </div>
            </div>
        </div>
    );
};

export default Iphone;
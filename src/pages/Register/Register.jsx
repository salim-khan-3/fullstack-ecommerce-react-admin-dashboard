import React, { useState, useContext, useEffect } from "react";
import { MyContext } from "../../App";
import {
  Mail,
  Lock,
  User,
  ShieldCheck,
  Twitter,
  Facebook,
  Eye,
  EyeOff,
  Home,
} from "lucide-react";
import { Link } from "react-router-dom";

const Register = () => {
  const { setIsHideSidebarAndNavbar } = useContext(MyContext);
  const [showPassword, setShowPassword] = useState(false);


  useEffect(() => {
    setIsHideSidebarAndNavbar(true);
    return () => setIsHideSidebarAndNavbar(false);
  }, [setIsHideSidebarAndNavbar]);

  return (
    <div >
      <div className="w-full flex flex-col lg:flex-row bg-[#F8FAFC] transition-colors duration-500">
    
        {/* Right Side: Registration Form */}
        <div className="flex-1 flex items-center justify-center">
          <div className="w-full max-w-[480px]">
            <div className="bg-white dark:bg-[#1F2937] p-8 sm:p-10 rounded-[2.5rem] shadow-2xl dark:shadow-none border border-gray-100 dark:border-gray-700 relative">
        

              {/* Logo & Heading */}
              <div className="mb-10 text-center lg:text-left">
                <div className="inline-flex items-center justify-center w-14 h-14 bg-blue-50 dark:bg-blue-900/30 text-blue-600 rounded-2xl mb-4">
                  <ShieldCheck size={32} />
                </div>
                <h2 className="text-2xl font-black text-gray-800 dark:text-white tracking-tight">
                  Register a new account
                </h2>
              </div>

              <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                {/* Full Name */}
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center text-gray-400 group-focus-within:text-blue-500 transition-colors">
                    <User size={18} />
                  </div>
                  <input
                    type="text"
                    placeholder="Enter your name"
                    className="w-full bg-gray-50 dark:bg-[#374151] border border-gray-100 dark:border-gray-600 rounded-xl py-3.5 pl-12 pr-4 text-sm text-gray-700 dark:text-white outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all"
                  />
                </div>

                {/* Email Address */}
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center text-gray-400 group-focus-within:text-blue-500 transition-colors">
                    <Mail size={18} />
                  </div>
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="w-full bg-gray-50 dark:bg-[#374151] border border-gray-100 dark:border-gray-600 rounded-xl py-3.5 pl-12 pr-4 text-sm text-gray-700 dark:text-white outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all"
                  />
                </div>

                {/* Password */}
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center text-gray-400 group-focus-within:text-blue-500 transition-colors">
                    <Lock size={18} />
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    className="w-full bg-gray-50 dark:bg-[#374151] border border-gray-100 dark:border-gray-600 rounded-xl py-3.5 pl-12 pr-12 text-sm text-gray-700 dark:text-white outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>

                {/* Confirm Password */}
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center text-gray-400 group-focus-within:text-blue-500 transition-colors">
                    <Lock size={18} />
                  </div>
                  <input
                    type="password"
                    placeholder="Confirm your password"
                    className="w-full bg-gray-50 dark:bg-[#374151] border border-gray-100 dark:border-gray-600 rounded-xl py-3.5 pl-12 pr-4 text-sm text-gray-700 dark:text-white outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all"
                  />
                </div>

                {/* Terms & Conditions */}
                <div className="flex items-center gap-3 py-2">
                  <input
                    type="checkbox"
                    id="terms"
                    className="w-5 h-5 rounded-lg border-gray-300 text-blue-600 focus:ring-blue-500 dark:bg-[#374151] dark:border-gray-600 cursor-pointer"
                  />
                  <label
                    htmlFor="terms"
                    className="text-sm text-gray-500 dark:text-gray-400 font-medium cursor-pointer"
                  >
                    I agree to the all{" "}
                    <span className="text-blue-600 font-bold hover:underline">
                      Terms & Conditions
                    </span>
                  </label>
                </div>

                {/* Sign Up Button */}
                <button className="w-full bg-[#0061FF] hover:bg-blue-700 text-white font-bold py-4 rounded-xl shadow-lg shadow-blue-500/20 transition-all active:scale-[0.98] uppercase tracking-wider text-sm">
                  Sign Up
                </button>
              </form>

              {/* Divider */}
              <div className="relative my-8 text-center">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-100 dark:border-gray-700"></div>
                </div>
                <span className="relative px-4 bg-white dark:bg-[#1F2937] text-gray-400 text-xs font-bold uppercase tracking-widest">
                  or
                </span>
              </div>

              {/* Socials */}
              <div className="grid grid-cols-2 gap-4">
                <button className="flex items-center justify-center gap-2 bg-[#1DA1F2] text-white py-3 rounded-xl hover:opacity-90 transition-all">
                  <Twitter size={18} fill="currentColor" />
                  <span className="text-xs font-bold">Twitter</span>
                </button>
                <button className="flex items-center justify-center gap-2 bg-[#3B5998] text-white py-3 rounded-xl hover:opacity-90 transition-all">
                  <Facebook size={18} fill="currentColor" />
                  <span className="text-xs font-bold">Facebook</span>
                </button>
              </div>

              {/* Already have an account */}
              <p className="mt-8 text-center text-sm text-gray-500 dark:text-gray-400 font-medium">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="text-blue-600 font-bold hover:underline"
                >
                  Login
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;

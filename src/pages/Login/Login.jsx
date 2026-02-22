import React, { useState, useContext, useEffect } from "react";
import { MyContext } from "../../App";
import { Mail, Lock, ShieldCheck, Twitter, Facebook, Eye, EyeOff } from "lucide-react";
import { Link } from "react-router-dom";

const Login = () => {
  const { setIsHideSidebarAndNavbar } = useContext(MyContext);
  const [showPassword, setShowPassword] = useState(false);


  useEffect(() => {
    setIsHideSidebarAndNavbar(true);
    return () => setIsHideSidebarAndNavbar(false);
  }, [setIsHideSidebarAndNavbar]);

  return (
    <div >
      <div className="min-h-screen w-full flex items-center justify-center bg-[#F3F4F6] transition-colors duration-500 p-4">
        
        {/* Main Card */}
        <div className="w-full max-w-[450px] space-y-4">
          
          <div className="bg-white dark:bg-[#1F2937] p-8 rounded-[2rem] shadow-2xl dark:shadow-none border border-gray-100 dark:border-gray-700 relative overflow-hidden">
            
           
            {/* Header */}
            <div className="mb-8 mt-4">
              <h2 className="text-3xl font-black text-gray-800 dark:text-white tracking-tight">Welcome Back</h2>
              <p className="text-gray-400 dark:text-gray-500 text-sm font-medium mt-1">Please sign in to your account</p>
            </div>

            <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
              
              {/* Email Input */}
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-blue-500 transition-colors">
                  <Mail size={18} />
                </div>
                <input
                  type="email"
                  placeholder="Email Address"
                  className="w-full bg-gray-50 dark:bg-[#374151] border border-gray-200 dark:border-gray-600 rounded-xl py-3.5 pl-12 pr-4 text-sm text-gray-700 dark:text-white outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all"
                />
              </div>

              {/* Password Input */}
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-blue-500 transition-colors">
                  <Lock size={18} />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  className="w-full bg-gray-50 dark:bg-[#374151] border border-gray-200 dark:border-gray-600 rounded-xl py-3.5 pl-12 pr-12 text-sm text-gray-700 dark:text-white outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all"
                />
                <button 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>

              {/* Select Option */}
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-blue-500 transition-colors">
                  <ShieldCheck size={18} />
                </div>
                <select className="w-full appearance-none bg-gray-50 dark:bg-[#374151] border border-gray-200 dark:border-gray-600 rounded-xl py-3.5 pl-12 pr-4 text-sm text-gray-700 dark:text-white outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all cursor-pointer">
                  <option>Select Option</option>
                  <option>Admin</option>
                  <option>User</option>
                  <option>Guest</option>
                </select>
              </div>

              {/* Sign In Button */}
              <button className="w-full bg-[#0061FF] hover:bg-blue-700 text-white font-bold py-3.5 rounded-xl shadow-lg shadow-blue-500/30 transition-all active:scale-[0.98] uppercase tracking-wider text-sm">
                Sign In
              </button>
            </form>

            <div className="mt-6 text-center">
              <button className="text-[11px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest hover:text-blue-500 transition-colors">
                Forgot <span className="text-blue-600">Password?</span>
              </button>
            </div>

            {/* Divider */}
            <div className="relative my-8 text-center">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-100 dark:border-gray-700"></div>
              </div>
              <span className="relative px-4 bg-white dark:bg-[#1F2937] text-gray-400 text-xs font-bold uppercase tracking-widest">or</span>
            </div>

            {/* Social Logins */}
            <div className="space-y-3">
              <button className="w-full flex items-center justify-center gap-3 bg-[#1DA1F2] hover:bg-[#1a91da] text-white font-bold py-3 rounded-xl transition-all shadow-md">
                <Twitter size={18} fill="currentColor" />
                <span className="text-sm">Continue with Twitter</span>
              </button>
              <button className="w-full flex items-center justify-center gap-3 bg-[#3B5998] hover:bg-[#344e86] text-white font-bold py-3 rounded-xl transition-all shadow-md">
                <Facebook size={18} fill="currentColor" />
                <span className="text-sm">Continue with Facebook</span>
              </button>
            </div>
          </div>

          {/* Bottom Register Section */}
          <div className="bg-white dark:bg-[#1F2937] p-5 rounded-2xl text-center border border-gray-100 dark:border-gray-700 shadow-sm transition-colors">
            <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">
              Don't have an account? <Link to="/register" className="text-blue-600 font-bold hover:underline">Register</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
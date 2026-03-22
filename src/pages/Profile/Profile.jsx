import { useContext, useEffect, useRef, useState } from "react";
import { MyContext } from "../../App";
import { useAuth } from "../../context/Authcontext";
import { updateUser, uploadProfileImage } from "../../api/useApi";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import {
  User, Mail, Phone, Lock, Eye, EyeOff,
  Camera, Save, Shield
} from "lucide-react";

const inputClass = "w-full bg-gray-50 border border-gray-200 rounded-xl py-3.5 pl-12 pr-4 text-sm text-gray-700 outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all";

const Profile = () => {
  const { user, token, updateUser: updateUserContext } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [imageLoading, setImageLoading] = useState(false);
  const [previewImage, setPreviewImage] = useState(user?.image || "");
  const fileInputRef = useRef(null);

  const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm();

  useEffect(() => {
    if (user) {
      setValue("name", user.name);
      setValue("email", user.email);
      setValue("phone", user.phone);
      setPreviewImage(user.image || "");
    }
  }, [user, setValue]);

  // Profile Info Update
  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const updateData = {
        name: data.name,
        phone: data.phone,
        email: data.email,
      };

      if (data.password) {
        if (data.password !== data.confirmPassword) {
          toast.error("Passwords do not match");
          setLoading(false);
          return;
        }
        updateData.password = data.password;
      }

      const res = await updateUser(user.id, updateData, token);
      updateUserContext(res.user);
      toast.success("Profile updated successfully!");
    } catch (error) {
      toast.error(error.response?.data?.message || "Update failed");
    } finally {
      setLoading(false);
    }
  };

  // Image Upload
  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Preview
    const reader = new FileReader();
    reader.onload = () => setPreviewImage(reader.result);
    reader.readAsDataURL(file);

    // Upload
    setImageLoading(true);
    try {
      const formData = new FormData();
      formData.append("image", file);
      const res = await uploadProfileImage(user.id, formData, token);
      updateUserContext(res.user);
      toast.success("Profile image updated!");
    } catch (error) {
      toast.error("Image upload failed");
    } finally {
      setImageLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">

      {/* Header */}
      <div>
        <h1 className="text-2xl font-black text-gray-800 tracking-tight">My Profile</h1>
        <p className="text-gray-400 text-sm mt-1">Manage your account information</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Left — Avatar Card */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-[2rem] border border-gray-100 shadow-sm p-6 text-center">

            {/* Avatar */}
            <div className="relative inline-block mb-4">
              <div className="w-28 h-28 rounded-full overflow-hidden border-4 border-blue-500/20 shadow-lg mx-auto">
                {previewImage ? (
                  <img src={previewImage} alt="Profile"
                    className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
                    <span className="text-white text-3xl font-bold">
                      {user?.name?.charAt(0)?.toUpperCase() || "A"}
                    </span>
                  </div>
                )}
              </div>

              {/* Camera Button */}
              <button
                onClick={() => fileInputRef.current?.click()}
                disabled={imageLoading}
                className="absolute bottom-0 right-0 w-9 h-9 bg-[#0061FF] hover:bg-blue-700 rounded-full flex items-center justify-center shadow-lg transition-all active:scale-95 disabled:opacity-60"
              >
                {imageLoading ? (
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <Camera size={16} className="text-white" />
                )}
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageChange}
              />
            </div>

            <h3 className="text-gray-800 font-black text-lg">{user?.name}</h3>
            <p className="text-gray-400 text-sm">{user?.email}</p>

            {/* Role Badge */}
            <div className="mt-4 inline-flex items-center gap-1.5 bg-blue-50 text-blue-600 text-xs font-bold px-3 py-1.5 rounded-full border border-blue-100">
              <Shield size={12} />
              {user?.isAdmin ? "Admin" : "User"}
            </div>

            {/* Info */}
            <div className="mt-6 space-y-3 text-left">
              <div className="flex items-center gap-3 bg-gray-50 rounded-xl p-3">
                <Mail size={16} className="text-blue-500 shrink-0" />
                <span className="text-gray-600 text-sm truncate">{user?.email}</span>
              </div>
              <div className="flex items-center gap-3 bg-gray-50 rounded-xl p-3">
                <Phone size={16} className="text-blue-500 shrink-0" />
                <span className="text-gray-600 text-sm">{user?.phone || "Not set"}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right — Edit Form */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-[2rem] border border-gray-100 shadow-sm p-8">
            <h2 className="text-lg font-black text-gray-800 mb-6">Edit Information</h2>

            <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>

              {/* Name */}
              <div>
                <label className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1.5 block">
                  Full Name
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-blue-500 transition-colors">
                    <User size={18} />
                  </div>
                  <input
                    type="text"
                    placeholder="Full Name"
                    className={inputClass}
                    {...register("name", {
                      required: "Name is required",
                      minLength: { value: 3, message: "Min 3 characters" },
                    })}
                  />
                </div>
                {errors.name && <p className="text-red-500 text-xs mt-1 ml-1">{errors.name.message}</p>}
              </div>

              {/* Email */}
              <div>
                <label className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1.5 block">
                  Email Address
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-blue-500 transition-colors">
                    <Mail size={18} />
                  </div>
                  <input
                    type="email"
                    placeholder="Email Address"
                    className={inputClass}
                    {...register("email", {
                      required: "Email is required",
                      pattern: { value: /^\S+@\S+\.\S+$/, message: "Invalid email" },
                    })}
                  />
                </div>
                {errors.email && <p className="text-red-500 text-xs mt-1 ml-1">{errors.email.message}</p>}
              </div>

              {/* Phone */}
              <div>
                <label className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1.5 block">
                  Phone Number
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-blue-500 transition-colors">
                    <Phone size={18} />
                  </div>
                  <input
                    type="text"
                    placeholder="Phone Number"
                    className={inputClass}
                    {...register("phone", {
                      pattern: { value: /^[0-9]{11}$/, message: "Must be 11 digits" },
                    })}
                  />
                </div>
                {errors.phone && <p className="text-red-500 text-xs mt-1 ml-1">{errors.phone.message}</p>}
              </div>

              {/* Divider */}
              <div className="relative my-2">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-100"></div>
                </div>
                <div className="relative flex justify-center">
                  <span className="px-4 bg-white text-gray-400 text-xs font-bold uppercase tracking-widest">
                    Change Password (optional)
                  </span>
                </div>
              </div>

              {/* New Password */}
              <div>
                <label className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1.5 block">
                  New Password
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-blue-500 transition-colors">
                    <Lock size={18} />
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Leave blank to keep current"
                    className={`${inputClass} pr-12`}
                    {...register("password", {
                      minLength: { value: 6, message: "Min 6 characters" },
                    })}
                  />
                  <button type="button" onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600">
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
                {errors.password && <p className="text-red-500 text-xs mt-1 ml-1">{errors.password.message}</p>}
              </div>

              {/* Confirm Password */}
              <div>
                <label className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1.5 block">
                  Confirm Password
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-blue-500 transition-colors">
                    <Lock size={18} />
                  </div>
                  <input
                    type={showConfirm ? "text" : "password"}
                    placeholder="Confirm new password"
                    className={`${inputClass} pr-12`}
                    {...register("confirmPassword")}
                  />
                  <button type="button" onClick={() => setShowConfirm(!showConfirm)}
                    className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600">
                    {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
                {watch("confirmPassword") && watch("password") && (
                  <p className={`text-xs mt-1 ml-1 ${watch("password") === watch("confirmPassword") ? "text-green-500" : "text-red-500"}`}>
                    {watch("password") === watch("confirmPassword") ? "✓ Passwords match" : "✗ Passwords do not match"}
                  </p>
                )}
              </div>

              {/* Save Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#0061FF] hover:bg-blue-700 disabled:opacity-60 disabled:cursor-not-allowed text-white font-bold py-3.5 rounded-xl shadow-lg shadow-blue-500/30 transition-all active:scale-[0.98] flex items-center justify-center gap-2 text-sm uppercase tracking-wider"
              >
                {loading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save size={16} />
                    Save Changes
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
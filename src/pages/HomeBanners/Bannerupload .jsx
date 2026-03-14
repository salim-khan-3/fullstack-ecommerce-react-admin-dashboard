import { useState, useRef } from "react";
import { UploadCloud, X, Loader2, ImagePlus } from "lucide-react";
import { createBannerApi } from "../../api/homeBannerApi";
import { useAuth } from "../../context/Authcontext";
import toast from "react-hot-toast";

const BannerUpload = ({ onUploaded }) => {
  const { token } = useAuth();
  const [files, setFiles]         = useState([]); // [{ file, preview }]
  const [uploading, setUploading] = useState(false);
  const fileRef = useRef();

  const handleFileChange = (e) => {
    const selected = Array.from(e.target.files);
    const newFiles = selected.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }));
    setFiles((prev) => [...prev, ...newFiles]);
    e.target.value = ""; // reset input so same file can be re-selected
  };

  const removeFile = (idx) => {
    setFiles((prev) => prev.filter((_, i) => i !== idx));
  };

  const handleUpload = async () => {
    if (files.length === 0) {
      toast.error("Please select at least one image");
      return;
    }

    setUploading(true);
    try {
      // সব images একটা একটা করে upload করো
      const uploaded = await Promise.all(
        files.map(async ({ file }) => {
          const formData = new FormData();
          formData.append("image", file);
          const data = await createBannerApi(formData, token);
          return data.banner;
        })
      );

      toast.success(`${uploaded.length} banner${uploaded.length > 1 ? "s" : ""} uploaded`);
      onUploaded(uploaded); // parent কে জানাও
      setFiles([]);
    } catch {
      toast.error("Upload failed");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-5">
      <h2 className="text-base font-bold text-gray-800 mb-4">Upload Banners</h2>

      {/* Drop zone */}
      <div
        onClick={() => fileRef.current.click()}
        className="w-full border-2 border-dashed border-gray-200 rounded-2xl bg-gray-50 hover:border-blue-400 hover:bg-blue-50/30 transition-all cursor-pointer flex flex-col items-center justify-center py-10 gap-3 mb-4"
      >
        <div className="w-14 h-14 rounded-2xl bg-blue-100 flex items-center justify-center">
          <UploadCloud size={26} className="text-blue-500" />
        </div>
        <div className="text-center">
          <p className="text-sm font-semibold text-gray-700">Click to select images</p>
          <p className="text-xs text-gray-400 mt-1">Multiple images supported · PNG, JPG, WEBP</p>
        </div>
      </div>

      <input
        ref={fileRef}
        type="file"
        accept="image/*"
        multiple
        className="hidden"
        onChange={handleFileChange}
      />

      {/* Preview grid */}
      {files.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-4">
          {files.map(({ preview }, idx) => (
            <div key={idx} className="relative group rounded-xl overflow-hidden border border-gray-100 bg-gray-100 aspect-video">
              <img src={preview} alt="" className="w-full h-full object-cover" />
              <button
                onClick={() => removeFile(idx)}
                className="absolute top-1.5 right-1.5 w-6 h-6 rounded-full bg-red-500 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600"
              >
                <X size={12} />
              </button>
            </div>
          ))}

          {/* Add more */}
          <div
            onClick={() => fileRef.current.click()}
            className="rounded-xl border-2 border-dashed border-gray-200 bg-gray-50 hover:border-blue-400 hover:bg-blue-50/30 transition-all cursor-pointer flex flex-col items-center justify-center aspect-video gap-1"
          >
            <ImagePlus size={20} className="text-gray-400" />
            <span className="text-xs text-gray-400">Add more</span>
          </div>
        </div>
      )}

      {/* Upload button */}
      <button
        onClick={handleUpload}
        disabled={uploading || files.length === 0}
        className="w-full py-3 rounded-xl bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700 transition-colors disabled:opacity-40 flex items-center justify-center gap-2"
      >
        {uploading
          ? <><Loader2 size={15} className="animate-spin" /> Uploading {files.length} image{files.length > 1 ? "s" : ""}...</>
          : `Upload ${files.length > 0 ? files.length : ""} Banner${files.length > 1 ? "s" : ""}`
        }
      </button>
    </div>
  );
};

export default BannerUpload;
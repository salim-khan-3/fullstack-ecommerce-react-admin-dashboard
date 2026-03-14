import { useState } from "react";
import { Trash2, Pencil, Loader2, X, UploadCloud, ImagePlus } from "lucide-react";
import { updateBannerApi, deleteBannerApi } from "../../api/homeBannerApi";
import { useAuth } from "../../context/Authcontext";
import toast from "react-hot-toast";
import { useRef } from "react";

const BannerList = ({ banners, loading, onUpdated, onDeleted }) => {
  const { token } = useAuth();
  const fileRef = useRef();

  const [editBanner, setEditBanner]   = useState(null);
  const [preview, setPreview]         = useState(null);
  const [imageFile, setImageFile]     = useState(null);
  const [submitting, setSubmitting]   = useState(false);
  const [deletingId, setDeletingId]   = useState(null);

  const openEdit = (banner) => {
    setEditBanner(banner);
    setPreview(banner.image);
    setImageFile(null);
  };

  const closeEdit = () => {
    setEditBanner(null);
    setPreview(null);
    setImageFile(null);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setImageFile(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleUpdate = async () => {
    if (!imageFile) {
      toast.error("Please select a new image");
      return;
    }
    const formData = new FormData();
    formData.append("image", imageFile);
    setSubmitting(true);
    try {
      const data = await updateBannerApi(editBanner._id, formData, token);
      onUpdated(data.banner);
      toast.success("Banner updated");
      closeEdit();
    } catch {
      toast.error("Failed to update banner");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    setDeletingId(id);
    try {
      await deleteBannerApi(id, token);
      onDeleted(id);
      toast.success("Banner deleted");
    } catch {
      toast.error("Failed to delete banner");
    } finally {
      setDeletingId(null);
    }
  };

  // ── Skeleton ──
  if (loading) {
    return (
      <div className="bg-white rounded-xl shadow-sm p-5">
        <h2 className="text-base font-bold text-gray-800 mb-4">All Banners</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="rounded-xl overflow-hidden border border-gray-100">
              <div className="w-full h-40 bg-gray-100 animate-pulse" />
              <div className="p-3 flex justify-end gap-2">
                <div className="h-7 w-14 bg-gray-100 rounded-lg animate-pulse" />
                <div className="h-7 w-14 bg-gray-100 rounded-lg animate-pulse" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // ── Empty ──
  if (banners.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-sm p-5">
        <h2 className="text-base font-bold text-gray-800 mb-4">All Banners</h2>
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <div className="w-16 h-16 rounded-2xl bg-blue-50 flex items-center justify-center mb-3">
            <ImagePlus size={28} className="text-blue-400" />
          </div>
          <p className="text-gray-500 text-sm font-medium">No banners yet</p>
          <p className="text-gray-400 text-xs mt-1">Upload banners from the left panel</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm p-5">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-base font-bold text-gray-800">All Banners</h2>
        <span className="text-xs text-gray-400 bg-gray-100 px-2.5 py-1 rounded-full font-medium">
          {banners.length} banner{banners.length !== 1 ? "s" : ""}
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {banners.map((banner) => (
          <div key={banner._id} className="rounded-xl overflow-hidden border border-gray-100 hover:shadow-md transition-shadow">
            <div className="w-full h-40 bg-gray-100">
              <img src={banner.image} alt="banner" className="w-full h-full object-cover" />
            </div>
            <div className="px-3 py-2.5 flex items-center justify-between bg-white">
              <span className="text-xs text-gray-400">
                {new Date(banner.createdAt).toLocaleDateString("en-GB", {
                  day: "numeric", month: "short", year: "numeric",
                })}
              </span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => openEdit(banner)}
                  className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-blue-50 text-blue-600 text-xs font-semibold hover:bg-blue-100 transition-colors"
                >
                  <Pencil size={11} /> Edit
                </button>
                <button
                  onClick={() => handleDelete(banner._id)}
                  disabled={deletingId === banner._id}
                  className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-red-50 text-red-500 text-xs font-semibold hover:bg-red-100 transition-colors disabled:opacity-40"
                >
                  {deletingId === banner._id
                    ? <Loader2 size={11} className="animate-spin" />
                    : <Trash2 size={11} />
                  }
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ── Edit Modal ── */}
      {editBanner && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ backdropFilter: "blur(6px)", background: "rgba(0,0,0,0.3)" }}
          onClick={closeEdit}
        >
          <div
            className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
              <h2 className="text-base font-bold text-gray-800">Edit Banner</h2>
              <button
                onClick={closeEdit}
                className="w-8 h-8 rounded-xl bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
              >
                <X size={15} className="text-gray-500" />
              </button>
            </div>

            <div className="p-6 space-y-4">
              {/* Image picker */}
              <div
                onClick={() => fileRef.current.click()}
                className="w-full rounded-2xl border-2 border-dashed border-gray-200 overflow-hidden cursor-pointer hover:border-blue-400 transition-all"
              >
                <div className="relative w-full h-48">
                  <img src={preview} alt="preview" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                    <p className="text-white text-sm font-semibold flex items-center gap-2">
                      <UploadCloud size={18} /> Click to change
                    </p>
                  </div>
                </div>
              </div>

              <input
                ref={fileRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageChange}
              />

              <div className="flex gap-3">
                <button
                  onClick={closeEdit}
                  className="flex-1 py-3 rounded-xl border border-gray-200 text-gray-600 text-sm font-semibold hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleUpdate}
                  disabled={submitting || !imageFile}
                  className="flex-1 py-3 rounded-xl bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700 transition-colors disabled:opacity-40 flex items-center justify-center gap-2"
                >
                  {submitting
                    ? <><Loader2 size={14} className="animate-spin" /> Updating...</>
                    : "Update Banner"
                  }
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BannerList;
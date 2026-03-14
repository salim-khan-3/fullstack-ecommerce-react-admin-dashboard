import { useState, useEffect, useRef } from "react";
import { Home, ChevronRight, Trash2, Pencil, Plus, X, Loader2, ImagePlus, UploadCloud } from "lucide-react";
import { useAuth } from "../../context/Authcontext";
import {
  getAllBannersApi,
  createBannerApi,
  updateBannerApi,
  deleteBannerApi,
} from "../../api/homeBannerApi";
import toast from "react-hot-toast";

export default function HomeBanners() {
  const { token } = useAuth();

  const [banners, setBanners]         = useState([]);
  const [loading, setLoading]         = useState(true);
  const [modalOpen, setModalOpen]     = useState(false);
  const [editBanner, setEditBanner]   = useState(null); // null = add, object = edit
  const [preview, setPreview]         = useState(null);
  const [imageFile, setImageFile]     = useState(null);
  const [submitting, setSubmitting]   = useState(false);
  const [deletingId, setDeletingId]   = useState(null);
  const fileRef = useRef();

  useEffect(() => { fetchBanners(); }, []);

  const fetchBanners = async () => {
    setLoading(true);
    try {
      const data = await getAllBannersApi();
      setBanners(data.banners || []);
    } catch {
      toast.error("Failed to load banners");
    } finally {
      setLoading(false);
    }
  };

  // ── Open modal ──
  const openAdd = () => {
    setEditBanner(null);
    setPreview(null);
    setImageFile(null);
    setModalOpen(true);
  };

  const openEdit = (banner) => {
    setEditBanner(banner);
    setPreview(banner.image);
    setImageFile(null);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setEditBanner(null);
    setPreview(null);
    setImageFile(null);
  };

  // ── Image pick ──
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setImageFile(file);
    setPreview(URL.createObjectURL(file));
  };

  // ── Submit ──
  const handleSubmit = async () => {
    if (!imageFile && !editBanner) {
      toast.error("Please select an image");
      return;
    }

    const formData = new FormData();
    if (imageFile) formData.append("image", imageFile);

    setSubmitting(true);
    try {
      if (editBanner) {
        const data = await updateBannerApi(editBanner._id, formData, token);
        setBanners((prev) =>
          prev.map((b) => b._id === editBanner._id ? data.banner : b)
        );
        toast.success("Banner updated");
      } else {
        const data = await createBannerApi(formData, token);
        setBanners((prev) => [data.banner, ...prev]);
        toast.success("Banner added");
      }
      closeModal();
    } catch {
      toast.error("Failed to save banner");
    } finally {
      setSubmitting(false);
    }
  };

  // ── Delete ──
  const handleDelete = async (id) => {
    setDeletingId(id);
    try {
      await deleteBannerApi(id, token);
      setBanners((prev) => prev.filter((b) => b._id !== id));
      toast.success("Banner deleted");
    } catch {
      toast.error("Failed to delete banner");
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-3 sm:p-6">

      {/* Page Header */}
      <div className="bg-white rounded-xl shadow-sm px-4 sm:px-6 py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-5">
        <div>
          <div className="flex items-center gap-1.5 text-sm text-gray-500 mb-1">
            <Home className="w-4 h-4 text-gray-400" />
            <span>Dashboard</span>
            <ChevronRight className="w-4 h-4 text-gray-400" />
            <span className="text-gray-700 font-medium">Home Banners</span>
          </div>
          <h1 className="text-xl font-semibold text-gray-800">Home Banners</h1>
        </div>
        <button
          onClick={openAdd}
          className="flex items-center gap-2 px-4 py-2.5 bg-blue-600 text-white rounded-xl text-sm font-semibold hover:bg-blue-700 transition-colors"
        >
          <Plus size={16} /> Add Banner
        </button>
      </div>

      {/* Banners Grid */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="bg-white rounded-xl overflow-hidden shadow-sm">
              <div className="w-full h-44 bg-gray-100 animate-pulse" />
              <div className="p-3 flex justify-end gap-2">
                <div className="h-8 w-16 bg-gray-100 rounded-lg animate-pulse" />
                <div className="h-8 w-16 bg-gray-100 rounded-lg animate-pulse" />
              </div>
            </div>
          ))}
        </div>
      ) : banners.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 text-center">
          <div className="w-20 h-20 rounded-2xl bg-blue-50 flex items-center justify-center mb-4">
            <ImagePlus size={36} className="text-blue-400" />
          </div>
          <h2 className="text-lg font-bold text-gray-700 mb-1">No banners yet</h2>
          <p className="text-gray-400 text-sm mb-5">Add your first home banner.</p>
          <button
            onClick={openAdd}
            className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white rounded-xl text-sm font-semibold hover:bg-blue-700 transition-colors"
          >
            <Plus size={15} /> Add Banner
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {banners.map((banner) => (
            <div key={banner._id} className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
              <div className="relative w-full h-44 bg-gray-100">
                <img
                  src={banner.image}
                  alt="banner"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="px-4 py-3 flex items-center justify-between border-t border-gray-100">
                <span className="text-xs text-gray-400">
                  {new Date(banner.createdAt).toLocaleDateString("en-GB", {
                    day: "numeric", month: "short", year: "numeric"
                  })}
                </span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => openEdit(banner)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-50 text-blue-600 text-xs font-semibold hover:bg-blue-100 transition-colors"
                  >
                    <Pencil size={12} /> Edit
                  </button>
                  <button
                    onClick={() => handleDelete(banner._id)}
                    disabled={deletingId === banner._id}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-50 text-red-500 text-xs font-semibold hover:bg-red-100 transition-colors disabled:opacity-40"
                  >
                    {deletingId === banner._id
                      ? <Loader2 size={12} className="animate-spin" />
                      : <Trash2 size={12} />
                    }
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ── ADD / EDIT MODAL ── */}
      {modalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ backdropFilter: "blur(6px)", background: "rgba(0,0,0,0.3)" }}
          onClick={closeModal}
        >
          <div
            className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
              <h2 className="text-base font-bold text-gray-800">
                {editBanner ? "Edit Banner" : "Add Banner"}
              </h2>
              <button
                onClick={closeModal}
                className="w-8 h-8 rounded-xl bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
              >
                <X size={15} className="text-gray-500" />
              </button>
            </div>

            <div className="p-6 space-y-5">

              {/* Image Upload Area */}
              <div
                onClick={() => fileRef.current.click()}
                className={`relative w-full rounded-2xl border-2 border-dashed cursor-pointer transition-all overflow-hidden
                  ${preview ? "border-blue-300 bg-blue-50/30" : "border-gray-200 bg-gray-50 hover:border-blue-300 hover:bg-blue-50/30"}`}
              >
                {preview ? (
                  <div className="relative w-full h-52">
                    <img src={preview} alt="preview" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                      <p className="text-white text-sm font-semibold flex items-center gap-2">
                        <UploadCloud size={18} /> Click to change image
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center py-14 gap-3">
                    <div className="w-14 h-14 rounded-2xl bg-blue-100 flex items-center justify-center">
                      <UploadCloud size={26} className="text-blue-500" />
                    </div>
                    <div className="text-center">
                      <p className="text-sm font-semibold text-gray-700">Click to upload image</p>
                      <p className="text-xs text-gray-400 mt-1">PNG, JPG, WEBP supported</p>
                    </div>
                  </div>
                )}
              </div>

              <input
                ref={fileRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageChange}
              />

              {/* Buttons */}
              <div className="flex gap-3">
                <button
                  onClick={closeModal}
                  className="flex-1 py-3 rounded-xl border border-gray-200 text-gray-600 text-sm font-semibold hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSubmit}
                  disabled={submitting || (!imageFile && !editBanner)}
                  className="flex-1 py-3 rounded-xl bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700 transition-colors disabled:opacity-40 flex items-center justify-center gap-2"
                >
                  {submitting
                    ? <><Loader2 size={15} className="animate-spin" /> Saving...</>
                    : editBanner ? "Update Banner" : "Add Banner"
                  }
                </button>
              </div>

            </div>
          </div>
        </div>
      )}
    </div>
  );
}
import { useState, useEffect } from "react";
import { Home, ChevronRight } from "lucide-react";
import { getAllBannersApi } from "../../api/homeBannerApi";
// import BannerUpload from "./BannerUpload";
// import BannerList from "./BannerList";
import toast from "react-hot-toast";
import BannerList from "./Bannerlist ";
import BannerUpload from "./Bannerupload ";

export default function HomeBanners() {
  const [banners, setBanners] = useState([]);
  const [loading, setLoading] = useState(true);

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

  // BannerUpload এ নতুন banners add হলে
  const handleUploaded = (newBanners) => {
    setBanners((prev) => [...newBanners, ...prev]);
  };

  // BannerList এ update হলে
  const handleUpdated = (updatedBanner) => {
    setBanners((prev) =>
      prev.map((b) => b._id === updatedBanner._id ? updatedBanner : b)
    );
  };

  // BannerList এ delete হলে
  const handleDeleted = (id) => {
    setBanners((prev) => prev.filter((b) => b._id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-100 p-3 sm:p-6">

      {/* Page Header */}
      <div className="bg-white rounded-xl shadow-sm px-4 sm:px-6 py-4 flex items-center justify-between mb-5">
        <h1 className="text-xl font-semibold text-gray-800">Home Banners</h1>
        <div className="flex items-center gap-1.5 text-sm text-gray-500">
          <Home className="w-4 h-4 text-gray-400" />
          <span>Dashboard</span>
          <ChevronRight className="w-4 h-4 text-gray-400" />
          <span className="text-gray-700 font-medium">Banners</span>
        </div>
      </div>

      {/* Two column layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">

        {/* Left — Upload */}
        <BannerUpload onUploaded={handleUploaded} />

        {/* Right — List */}
        <BannerList
          banners={banners}
          loading={loading}
          onUpdated={handleUpdated}
          onDeleted={handleDeleted}
        />

      </div>
    </div>
  );
}
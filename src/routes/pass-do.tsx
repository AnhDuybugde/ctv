import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import {
  Search,
  MapPin,
  ChevronRight,
  Plus,
  Info,
  DollarSign,
  Package,
  Calendar,
  Grid,
  FileText,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  Users,
  Compass,
  ArrowRight,
  Map,
  X,
} from "lucide-react";
import wormMascot from "@/assets/worm-mascot.png";

// Mock products
const initialProducts = [
  {
    id: "prod-01",
    title: "Bàn học gỗ gấp gọn gàng MDF tiện lợi",
    price: 120000,
    isFree: false,
    badge: "Mới 90%",
    location: "Liên Chiểu",
    school: "Gần ĐH Bách Khoa",
    category: "Bàn ghế & Nội thất",
    image:
      "https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: "prod-02",
    title: "Ghế xoay văn phòng có tựa lưng êm ái",
    price: 280000,
    isFree: false,
    badge: "Mới 95%",
    location: "Hải Châu",
    school: "Gần ĐH Duy Tân",
    category: "Bàn ghế & Nội thất",
    image:
      "https://images.unsplash.com/photo-1505797149-43b0069ec26b?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: "prod-03",
    title: "Nệm cao su non Thắng Lợi 1m2 x 2m x 10cm",
    price: 350000,
    isFree: false,
    badge: "Mới 90%",
    location: "Ngũ Hành Sơn",
    school: "Gần ĐH FPT",
    category: "Bàn ghế & Nội thất",
    image:
      "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: "prod-04",
    title: "Tủ vải quần áo khung gỗ 3 buồng chắc chắn",
    price: 150000,
    isFree: false,
    badge: "Mới 85%",
    location: "Sơn Trà",
    school: "Gần ĐH Ngoại Ngữ",
    category: "Bàn ghế & Nội thất",
    image:
      "https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: "prod-05",
    title: "Nồi cơm điện mini Elmich 1.2L lòng gốm",
    price: 190000,
    isFree: false,
    badge: "Mới 95%",
    location: "Liên Chiểu",
    school: "Gần ĐH Bách Khoa",
    category: "Đồ gia dụng & Bếp",
    image:
      "https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: "prod-06",
    title: "Bếp hồng ngoại Sunhouse siêu nhanh",
    price: 220000,
    isFree: false,
    badge: "Mới 90%",
    location: "Liên Chiểu",
    school: "Gần ĐH Sư phạm",
    category: "Đồ gia dụng & Bếp",
    image:
      "https://images.unsplash.com/photo-1574269909862-7e1d70bb8078?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: "prod-07",
    title: "Ấm đun nước siêu tốc Philips 1.8L inox 304",
    price: 80000,
    isFree: false,
    badge: "Mới 85%",
    location: "Ngũ Hành Sơn",
    school: "Gần ĐH FPT",
    category: "Đồ gia dụng & Bếp",
    image:
      "https://images.unsplash.com/photo-1574269909862-7e1d70bb8078?auto=format&fit=crop&w=400&q=80", // keeps safe
  },
  {
    id: "prod-08",
    title: "Kệ chén bát inox 2 tầng úp cực sạch sẽ",
    price: 60000,
    isFree: false,
    badge: "Mới 90%",
    location: "Hải Châu",
    school: "Gần ĐH Duy Tân",
    category: "Đồ gia dụng & Bếp",
    image:
      "https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: "prod-09",
    title: "Chuột không dây Logitech M220 Silent chính chủ",
    price: 90000,
    isFree: false,
    badge: "Mới 95%",
    location: "Ngũ Hành Sơn",
    school: "Gần ĐH FPT",
    category: "Thiết bị điện tử",
    image:
      "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: "prod-10",
    title: "Quạt đứng Senko gió cực mát có remote",
    price: 250000,
    isFree: false,
    badge: "Mới 95%",
    location: "Liên Chiểu",
    school: "Gần ĐH Bách Khoa",
    category: "Thiết bị điện tử",
    image:
      "https://images.unsplash.com/photo-1583863788434-e58a36330cf0?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: "prod-11",
    title: "Tai nghe chụp tai Sony WH-CH510 Bluetooth",
    price: 350000,
    isFree: false,
    badge: "Mới 90%",
    location: "Hải Châu",
    school: "Gần ĐH Duy Tân",
    category: "Thiết bị điện tử",
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: "prod-12",
    title: "Đèn học chống cận Điện Quang bảo vệ mắt",
    price: 70000,
    isFree: false,
    badge: "Mới 90%",
    location: "Liên Chiểu",
    school: "Gần ĐH Sư phạm",
    category: "Thiết bị điện tử",
    image:
      "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: "prod-13",
    title: "Giáo trình IELTS Cambridge 15-18 kèm đĩa",
    price: 50000,
    isFree: false,
    badge: "Mới 95%",
    location: "Sơn Trà",
    school: "Gần ĐH Ngoại Ngữ",
    category: "Sách & Học tập",
    image:
      "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: "prod-14",
    title: "Bảng viết note tự xóa thông minh kèm bút",
    price: 30000,
    isFree: false,
    badge: "Mới 99%",
    location: "Cẩm Lệ",
    school: "Gần ĐH Kinh Tế",
    category: "Sách & Học tập",
    image:
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: "prod-15",
    title: "Xe đạp thể thao cũ phục vụ đi học hàng ngày",
    price: 450000,
    isFree: false,
    badge: "Mới 80%",
    location: "Liên Chiểu",
    school: "Gần ĐH Bách Khoa",
    category: "Xe cộ & Khác",
    image:
      "https://images.unsplash.com/photo-1485965120184-e220f721d03e?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: "prod-16",
    title: "Tài liệu ôn thi đại cương FPT đầy đủ file PDF",
    price: 0,
    isFree: true,
    badge: "Tặng Free",
    location: "Ngũ Hành Sơn",
    school: "Gần ĐH FPT",
    category: "Đồ tặng miễn phí",
    image:
      "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: "prod-17",
    title: "Chậu cây sen đá mini để bàn siêu dễ thương",
    price: 0,
    isFree: true,
    badge: "Tặng Free",
    location: "Hải Châu",
    school: "Gần ĐH Duy Tân",
    category: "Đồ tặng miễn phí",
    image:
      "https://images.unsplash.com/photo-1545241047-6083a3684587?auto=format&fit=crop&w=400&q=80",
  },
];

const categoryPills = [
  "Tất cả",
  "Bàn ghế & Nội thất",
  "Thiết bị điện tử",
  "Sách & Học tập",
  "Đồ gia dụng & Bếp",
  "Xe cộ & Khác",
  "Đồ tặng miễn phí",
];

const formatVND = (n: number) =>
  new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
    maximumFractionDigits: 0,
  }).format(n);

export const Route = createFileRoute("/pass-do")({
  head: () => ({
    meta: [
      { title: "Chợ Pass Đồ Sinh Viên Đà Nẵng — Sâu tìm trọ" },
      {
        name: "description",
        content:
          "Thanh lý đồ dùng phòng trọ, mua lại đồ cũ giá rẻ cho sinh viên Đà Nẵng.",
      },
    ],
  }),
  component: PassDoPage,
});

function PassDoPage() {
  const [products, setProducts] = useState(initialProducts);
  const [selectedCategory, setSelectedCategory] = useState("Tất cả");
  const [searchText, setSearchText] = useState("");
  const [toastMessage, setToastMessage] = useState("");

  // Post Form State
  const [newTitle, setNewTitle] = useState("");
  const [newCategory, setNewCategory] = useState("Bàn ghế & Nội thất");
  const [newPrice, setNewPrice] = useState("");
  const [newLocation, setNewLocation] = useState("Hải Châu");
  const [newCondition, setNewCondition] = useState("Độ mới: 95%");
  const [isUploading, setIsUploading] = useState(false);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(""), 3500);
  };

  const handlePostItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle) return;

    const priceNum =
      newCategory === "Đồ tặng miễn phí" ? 0 : parseInt(newPrice) || 50000;

    // Create new product object
    const newItem = {
      id: `prod-${Date.now()}`,
      title: newTitle,
      price: priceNum,
      isFree: newCategory === "Đồ tặng miễn phí",
      badge: newCondition,
      location: newLocation,
      school: "Gần trường ĐH",
      category: newCategory,
      image:
        "https://images.unsplash.com/photo-1532372320572-cda25653a26d?auto=format&fit=crop&w=400&q=80", // Cozy chair default mock
    };

    setProducts([newItem, ...products]);
    showToast("Đăng tin thanh lý đồ thành công! Tin của bạn đã được duyệt.");

    // Reset form
    setNewTitle("");
    setNewPrice("");
  };

  const handleSimulateUpload = () => {
    setIsUploading(true);
    setTimeout(() => {
      setIsUploading(false);
      showToast("Tải ảnh sản phẩm thành công! (Simulated)");
    }, 1200);
  };

  const filteredProducts = products.filter((p) => {
    if (selectedCategory !== "Tất cả" && p.category !== selectedCategory)
      return false;
    if (searchText.trim()) {
      const q = searchText.toLowerCase();
      return (
        p.title.toLowerCase().includes(q) ||
        p.location.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{ backgroundColor: "#f8fafc" }}
    >
      <SiteHeader />

      {/* Toast popup */}
      {toastMessage && (
        <div className="fixed top-24 left-1/2 -translate-x-1/2 bg-[#1e293b] text-[#ffffff] px-6 py-3 rounded-full text-xs font-bold shadow-xl border border-slate-700 z-50 animate-bounce flex items-center gap-2">
          <CheckCircle2 className="h-4 w-4 text-[#ffc700]" />
          <span>{toastMessage}</span>
        </div>
      )}

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 py-8 md:py-10 space-y-12">
        {/* HERO BANNER */}
        <section className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-slate-100 flex flex-col md:flex-row justify-between items-center gap-8 relative overflow-hidden">
          <div className="space-y-5 max-w-xl text-center md:text-left">
            <h1 className="text-3xl md:text-4xl font-extrabold text-slate-800 tracking-tight leading-tight">
              Pass đồ sau chuyển trọ,
              <br />
              tiết kiệm hơn cho sinh viên
            </h1>
            <p className="text-sm text-slate-500 leading-relaxed max-w-md">
              Mua lại, pass lại hoặc tặng đồ dùng phòng trọ cho sinh viên quanh
              các trường đại học tại Đà Nẵng.
            </p>
            <div className="flex flex-wrap gap-3 justify-center md:justify-start">
              <a
                href="#post-form"
                className="px-6 py-3 rounded-full bg-brand-yellow font-bold text-slate-900 transition-all hover:opacity-95 shadow-md flex items-center gap-1.5 active:scale-95 text-xs"
                style={{ backgroundColor: "var(--brand-yellow)" }}
              >
                <span>Đăng món đồ cần pass</span>
                <ArrowRight className="h-4 w-4" />
              </a>
              <button
                onClick={() =>
                  showToast("Đang tìm các sản phẩm gần vị trí của bạn...")
                }
                className="px-6 py-3 rounded-full border border-slate-200 bg-white font-bold text-slate-700 hover:bg-slate-50 transition-all text-xs"
              >
                Xem đồ gần tôi
              </button>
            </div>
            <div className="flex flex-wrap gap-3 justify-center md:justify-start pt-2 border-t border-slate-100 text-[11px] font-bold text-[#8B5A2B]">
              <span className="flex items-center gap-1 bg-[#fff9e6] px-3 py-1 rounded-full">
                <MapPin className="h-3.5 w-3.5" /> Gần khu trọ
              </span>
              <span className="flex items-center gap-1 bg-[#fff9e6] px-3 py-1 rounded-full">
                <ShieldCheck className="h-3.5 w-3.5" /> Xác minh sinh viên
              </span>
              <span className="flex items-center gap-1 bg-[#fff9e6] px-3 py-1 rounded-full">
                <Users className="h-3.5 w-3.5" /> Cá nhân thật
              </span>
            </div>
          </div>

          {/* Mascot ôm thùng các-tông */}
          <div className="h-44 w-44 flex items-center justify-center relative shrink-0">
            <div className="absolute inset-0 bg-[#ffc700]/10 rounded-full scale-95 blur-md" />
            <img
              src={wormMascot}
              alt="Sâu ôm thùng đồ"
              className="h-32 w-auto object-contain animate-float relative z-10"
            />
            <div className="absolute -bottom-2 bg-white px-3 py-1.5 rounded-xl border border-slate-100 shadow-md text-[10px] font-bold text-slate-700 flex items-center gap-1">
              <Package className="h-3 w-3 text-[#ffc700]" /> Pass nhanh gọn!
            </div>
          </div>
        </section>

        {/* SEARCH WIDGET BAR */}
        <section className="bg-white p-4.5 rounded-2xl shadow-sm border border-slate-100 space-y-4">
          <div className="grid gap-3 sm:grid-cols-12 items-center">
            {/* Search inputs */}
            <div className="sm:col-span-5 relative flex items-center bg-slate-50 border border-slate-200 rounded-xl overflow-hidden focus-within:border-amber-300 transition-all">
              <Search className="h-4 w-4 ml-4 text-slate-400" />
              <input
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                placeholder="Tìm món đồ..."
                className="w-full px-3 py-3 text-xs bg-transparent outline-none text-slate-800"
              />
            </div>

            {/* Dropdown filters */}
            <div className="sm:col-span-2">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-3 text-xs font-bold outline-none text-slate-700"
              >
                <option value="Tất cả">Tất cả danh mục</option>
                {categoryPills
                  .filter((p) => p !== "Tất cả")
                  .map((p) => (
                    <option key={p} value={p}>
                      {p}
                    </option>
                  ))}
              </select>
            </div>

            <div className="sm:col-span-2">
              <select className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-3 text-xs font-bold outline-none text-slate-700">
                <option>Khu vực</option>
                <option>Hòa Hải</option>
                <option>Hòa Khánh</option>
                <option>Hải Châu</option>
                <option>Ngũ Hành Sơn</option>
              </select>
            </div>

            <div className="sm:col-span-2">
              <select className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-3 text-xs font-bold outline-none text-slate-700">
                <option>Trường gần nhất</option>
                <option>ĐH FPT</option>
                <option>ĐH Bách Khoa</option>
                <option>ĐH Duy Tân</option>
              </select>
            </div>

            {/* Search Button */}
            <button
              onClick={() => showToast("Đã áp dụng các bộ lọc tìm kiếm đồ cũ!")}
              className="sm:col-span-1 h-full py-3 bg-brand-yellow text-slate-800 hover:opacity-95 font-bold rounded-xl text-xs flex items-center justify-center shadow-sm"
              style={{ backgroundColor: "var(--brand-yellow)" }}
            >
              Tìm kiếm
            </button>
          </div>

          {/* Quick Categories pills */}
          <div className="flex flex-wrap gap-2 pt-2 border-t border-slate-100">
            {categoryPills.map((pill) => (
              <button
                key={pill}
                onClick={() => setSelectedCategory(pill)}
                className={`text-[10px] font-bold px-3.5 py-1.5 rounded-full uppercase tracking-wider transition-colors ${
                  selectedCategory === pill
                    ? "bg-slate-800 text-white font-extrabold"
                    : "bg-slate-50 hover:bg-slate-100 text-slate-500"
                }`}
              >
                {pill}
              </button>
            ))}
          </div>
        </section>

        {/* LATEST PRODUCTS GRID */}
        <section className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-extrabold text-slate-800 tracking-tight">
                Đồ pass mới nhất
              </h2>
              <p className="text-[11px] text-slate-500">
                Cập nhật liên tục từ sinh viên quanh bạn
              </p>
            </div>
            <button
              onClick={() => showToast("Hiển thị tất cả đồ cũ đang pass...")}
              className="text-xs font-bold text-[#8B5A2B] hover:underline"
            >
              Xem tất cả →
            </button>
          </div>

          {filteredProducts.length === 0 ? (
            <div className="bg-white rounded-3xl border border-slate-100 p-12 text-center shadow-sm">
              <Package className="h-12 w-12 text-slate-300 mx-auto" />
              <p className="font-bold text-slate-700 mt-4">
                Chưa có món đồ nào thuộc danh mục này 🥺
              </p>
              <p className="text-xs text-slate-400 mt-1">
                Thử chọn danh mục khác nhé.
              </p>
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filteredProducts.map((p) => (
                <div
                  key={p.id}
                  className="bg-white rounded-2xl border border-slate-100 shadow-sm hover-raise overflow-hidden group flex flex-col justify-between"
                >
                  <div className="relative aspect-[4/3] w-full overflow-hidden image-zoom-container">
                    <img
                      src={p.image}
                      alt={p.title}
                      className="w-full h-full object-cover loaded"
                    />

                    {/* Badge độ mới/tặng */}
                    {p.badge && (
                      <span
                        className="absolute top-3 left-3 px-2.5 py-0.5 rounded bg-[#ffc700] text-brand-brown text-[9px] font-extrabold uppercase tracking-wider"
                        style={{ backgroundColor: "var(--brand-yellow)" }}
                      >
                        {p.badge}
                      </span>
                    )}
                  </div>

                  <div className="p-4 space-y-4">
                    <div>
                      <h3 className="font-bold text-sm text-slate-800 line-clamp-1 group-hover:text-brand-brown transition-colors">
                        {p.title}
                      </h3>
                      <div className="flex items-center gap-1.5 text-[10px] text-slate-400 font-bold mt-1">
                        <MapPin className="h-3 w-3" />
                        <span>
                          {p.location} • {p.school}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between border-t border-slate-50 pt-3">
                      <span className="font-display font-extrabold text-sm text-[#8B5A2B]">
                        {p.isFree ? "Miễn phí" : formatVND(p.price)}
                      </span>
                      <button
                        onClick={() =>
                          showToast(`Mở hộp thoại liên hệ lấy đồ: ${p.title}`)
                        }
                        className="h-8 w-8 rounded-full bg-slate-50 hover:bg-[#ffc700]/20 text-slate-400 hover:text-slate-700 flex items-center justify-center transition-all"
                      >
                        <ChevronRight className="h-4.5 w-4.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* TRANSIT COMBOS */}
        <section className="space-y-6">
          <h3 className="text-base font-bold text-slate-800 tracking-tight flex items-center gap-1.5">
            <Package className="h-4.5 w-4.5 text-[#ffc700]" /> Combo chuyển trọ
            giá tốt
          </h3>
          <div className="grid gap-4 sm:grid-cols-3">
            {[
              {
                title: "Combo ga nệm",
                price: 650000,
                desc: "FPT City • Nệm lò xo + ga thun rời mới giặt",
              },
              {
                title: "Bộ nồi niêu",
                price: 150000,
                desc: "Hải Châu • 2 nồi inox + 1 chảo chống dính Sunhouse",
              },
              {
                title: "Tủ quần áo",
                price: 350000,
                desc: "Cẩm Lệ • Tủ nhựa Duy Tân 5 ngăn còn chắc chắn",
              },
            ].map((combo) => (
              <div
                key={combo.title}
                onClick={() => showToast(`Xem chi tiết ${combo.title}`)}
                className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all duration-300 flex items-center justify-between cursor-pointer group"
              >
                <div className="space-y-1">
                  <h4 className="text-xs font-extrabold text-slate-800 group-hover:text-brand-brown transition-colors">
                    {combo.title}
                  </h4>
                  <p className="text-[10px] text-slate-400 font-medium">
                    {combo.desc}
                  </p>
                  <span className="inline-block text-xs font-bold text-[#8B5A2B] mt-1">
                    {formatVND(combo.price)}
                  </span>
                </div>
                <div className="h-8 w-8 rounded-full bg-slate-50 text-slate-400 flex items-center justify-center group-hover:bg-[#ffc700]/20 group-hover:text-slate-700 transition-colors">
                  <ChevronRight className="h-4 w-4" />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* POSTING FORM & MAP PREVIEW */}
        <section
          id="post-form"
          className="grid gap-6 md:grid-cols-12 items-stretch"
        >
          {/* Map area */}
          <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm md:col-span-6 flex flex-col justify-between min-h-[350px]">
            <div className="space-y-1">
              <h3 className="font-bold text-slate-800 text-sm">
                Xem đồ pass quanh khu trọ
              </h3>
              <p className="text-[10px] text-slate-500">
                Khám phá các món đồ đang pass gần trường đại học của bạn.
              </p>
            </div>

            {/* Map Simulator */}
            <div className="bg-[#e2edf2] rounded-2xl flex-1 my-5 relative overflow-hidden flex items-center justify-center border border-slate-100">
              <div className="absolute top-1/3 left-1/3 bg-white px-2.5 py-1 rounded-full text-[9px] font-bold shadow-sm border border-slate-100 flex items-center gap-1">
                📍 ĐH Bách Khoa
              </div>
              <div className="absolute bottom-1/3 left-1/2 bg-white px-2.5 py-1 rounded-full text-[9px] font-bold shadow-sm border border-slate-100 flex items-center gap-1">
                📍 ĐH FPT
              </div>
              <div className="absolute top-1/2 left-2/3 bg-white px-2.5 py-1 rounded-full text-[9px] font-bold shadow-sm border border-slate-100 flex items-center gap-1">
                📍 ĐH Ngoại Ngữ
              </div>
              <span className="text-[10px] font-bold text-slate-400">
                Bản đồ vị trí đồ cũ thanh lý
              </span>
            </div>

            <button
              onClick={() => showToast("Mở bản đồ lớn toàn màn hình...")}
              className="w-full py-3 bg-brand-brown text-white font-bold rounded-xl text-xs flex items-center justify-center gap-1.5 shadow-sm active:scale-98"
              style={{ backgroundColor: "var(--brand-brown)" }}
            >
              <Map className="h-4 w-4" /> Mở bản đồ
            </button>
          </div>

          {/* Form area */}
          <form
            onSubmit={handlePostItem}
            className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm md:col-span-6 space-y-4"
          >
            <div>
              <h3 className="font-bold text-slate-800 text-sm">
                Bạn sắp chuyển trọ?
              </h3>
              <p className="text-[10px] text-slate-500">
                Đăng nhanh món đồ cần pass lại để dọn phòng nhẹ nhàng hơn.
              </p>
            </div>

            <div className="space-y-3">
              {/* Title input */}
              <input
                type="text"
                required
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                placeholder="Tên món đồ..."
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-3 text-xs outline-none text-slate-800"
              />

              <div className="grid grid-cols-2 gap-3">
                {/* Category select */}
                <select
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-3 text-xs outline-none text-slate-700"
                >
                  {categoryPills
                    .filter((p) => p !== "Tất cả")
                    .map((p) => (
                      <option key={p}>{p}</option>
                    ))}
                </select>

                {/* Price input */}
                <input
                  type="number"
                  placeholder="Giá (VNĐ)"
                  disabled={newCategory === "Đồ tặng miễn phí"}
                  value={newCategory === "Đồ tặng miễn phí" ? "" : newPrice}
                  onChange={(e) => setNewPrice(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-3 text-xs outline-none text-slate-800 disabled:opacity-50"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                {/* Location select */}
                <select
                  value={newLocation}
                  onChange={(e) => setNewLocation(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-3 text-xs outline-none text-slate-700"
                >
                  <option>Hòa Hải</option>
                  <option>Hòa Khánh</option>
                  <option>Hải Châu</option>
                  <option>Ngũ Hành Sơn</option>
                  <option>Cẩm Lệ</option>
                </select>

                {/* Condition select */}
                <select
                  value={newCondition}
                  onChange={(e) => setNewCondition(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-3 text-xs outline-none text-slate-700"
                >
                  <option>Độ mới: 95%</option>
                  <option>Dùng 3 tháng</option>
                  <option>Còn tốt</option>
                  <option>Hoạt động tốt</option>
                  <option>Mới 90%</option>
                  <option>Tặng lại</option>
                </select>
              </div>

              {/* Upload Box */}
              <button
                type="button"
                onClick={handleSimulateUpload}
                className="w-full border-2 border-dashed border-slate-200 rounded-xl py-4.5 flex flex-col items-center justify-center gap-1.5 hover:bg-slate-50 transition-all text-slate-400"
              >
                <Plus className="h-5 w-5" />
                <span className="text-[10px] font-bold text-slate-600">
                  Tải ảnh lên (Tối đa 3 ảnh)
                </span>
              </button>
            </div>

            {/* Submit button */}
            <button
              type="submit"
              className="w-full py-3.5 bg-brand-yellow text-slate-800 hover:opacity-95 font-bold rounded-xl text-xs flex items-center justify-center shadow-md active:scale-98"
              style={{ backgroundColor: "var(--brand-yellow)" }}
            >
              Đăng tin ngay
            </button>
          </form>
        </section>

        {/* SAFETY TIPS */}
        <section className="bg-white rounded-3xl p-6 md:p-8 border border-slate-100 shadow-sm space-y-6">
          <div className="space-y-1">
            <h3 className="font-bold text-slate-800 text-sm">
              Giao dịch an toàn hơn
            </h3>
            <p className="text-[10px] text-slate-500">
              Mẹo mua bán đồ cũ an tâm và chất lượng dành cho các bạn sinh viên.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-4">
            {[
              {
                icon: X,
                title: "Không cọc trước",
                desc: "Tránh chuyển tiền cọc khi chưa xem đồ trực tiếp.",
                isCross: true,
              },
              {
                icon: Users,
                title: "Gặp nơi đông người",
                desc: "Giao dịch tại quán cafe, cổng trường đại học.",
                isCross: false,
              },
              {
                icon: FileText,
                title: "Kiểm tra kỹ tình trạng",
                desc: "Xem đúng độ mới, tính năng hoạt động trước khi mua.",
                isCross: false,
              },
              {
                icon: Heart,
                title: "Báo cáo gian lận",
                desc: "Sử dụng nút 'Báo cáo' nếu thấy nội dung đáng ngờ.",
                isCross: false,
              },
            ].map(({ icon: Icon, title, desc, isCross }) => (
              <div
                key={title}
                className="p-4 bg-slate-50/50 rounded-2xl border border-slate-100 flex gap-3.5"
              >
                <div
                  className={`h-8 w-8 rounded-lg flex items-center justify-center shrink-0 border ${
                    isCross
                      ? "bg-red-50 text-red-500 border-red-100"
                      : title === "Báo cáo gian lận"
                        ? "bg-amber-50 text-[#ffc700] border-amber-100"
                        : "bg-blue-50 text-blue-500 border-blue-100"
                  }`}
                >
                  <Icon className="h-4.5 w-4.5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-800">{title}</h4>
                  <p className="text-[10px] text-slate-500 leading-relaxed mt-0.5">
                    {desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}

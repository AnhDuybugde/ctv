import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import {
  ArrowLeft,
  Heart,
  MapPin,
  Star,
  Check,
  MessageCircle,
  Clock,
  Ruler,
  AlertCircle,
  GraduationCap,
  Bookmark,
  Send,
  User,
  CheckCircle2,
  X,
} from "lucide-react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { rooms, formatVND, type Room } from "@/lib/rooms";
import { useFavorites } from "@/lib/favorites";
import { WormMascot } from "@/components/WormMascot";
import { getRoomLandlord, getLandlordReply } from "@/lib/landlords";

export const Route = createFileRoute("/room/$id")({
  loader: ({ params }) => {
    // Find the room
    const room = rooms.find((r) => r.id === params.id) || rooms[0];
    return { room };
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.room.title} — Sâu tìm trọ` },
          {
            name: "description",
            content: loaderData.room.description.slice(0, 160),
          },
        ]
      : [{ title: "Chi tiết phòng — Sâu tìm trọ" }],
  }),
  component: RoomPage,
});

// Mock chat messages
interface ChatMessage {
  sender: "user" | "landlord";
  text: string;
  time: string;
}

function RoomPage() {
  const { room } = Route.useLoaderData() as { room: Room };
  const { has, toggle } = useFavorites();
  const liked = has(room.id);
  const navigate = useNavigate();

  const [activeImage, setActiveImage] = useState(room.image);
  const [toastMessage, setToastMessage] = useState("");
  const [showChat, setShowChat] = useState(false);
  const [chatInput, setChatInput] = useState("");
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [isTyping, setIsTyping] = useState(false);

  const landlord = getRoomLandlord(room.id);

  // Sync active image when room changes
  useEffect(() => {
    setActiveImage(room.image);
  }, [room]);

  // Sync initial welcome message when room/landlord changes
  useEffect(() => {
    const welcomeText = getLandlordReply("chào", landlord, room);
    setChatMessages([
      {
        sender: "landlord",
        text: welcomeText,
        time: "Vừa xong",
      },
    ]);
  }, [room, landlord]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(""), 3000);
  };

  const handleSendMessage = (textToSend: string) => {
    if (!textToSend.trim()) return;

    // Add user message
    const userMsg: ChatMessage = {
      sender: "user",
      text: textToSend,
      time: "Vừa xong",
    };

    setChatMessages((prev) => [...prev, userMsg]);
    setChatInput("");

    // Simulate landlord typing and replying
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      const replyText = getLandlordReply(textToSend, landlord, room);

      setChatMessages((prev) => [
        ...prev,
        {
          sender: "landlord",
          text: replyText,
          time: "Vừa xong",
        },
      ]);
    }, 1500);
  };

  // Dynamically enrich gallery based on other rooms in the same building/district
  const getEnrichedGallery = () => {
    let galleryList = room.gallery ? [...room.gallery] : [];
    if (galleryList.length === 0 && room.image) {
      galleryList.push(room.image);
    }

    // Find other rooms in same address
    if (galleryList.length < 6) {
      const sameLocRooms = rooms.filter(
        (r) => r.address === room.address && r.id !== room.id,
      );
      for (const r of sameLocRooms) {
        if (galleryList.length >= 6) break;
        if (r.image && !galleryList.includes(r.image)) {
          galleryList.push(r.image);
        }
        if (r.gallery) {
          for (const img of r.gallery) {
            if (galleryList.length >= 6) break;
            if (img && !galleryList.includes(img)) {
              galleryList.push(img);
            }
          }
        }
      }
    }

    // Find other rooms in same district
    if (galleryList.length < 6) {
      const sameDistRooms = rooms.filter(
        (r) => r.district === room.district && r.id !== room.id,
      );
      for (const r of sameDistRooms) {
        if (galleryList.length >= 6) break;
        if (r.image && !galleryList.includes(r.image)) {
          galleryList.push(r.image);
        }
        if (r.gallery) {
          for (const img of r.gallery) {
            if (galleryList.length >= 6) break;
            if (img && !galleryList.includes(img)) {
              galleryList.push(img);
            }
          }
        }
      }
    }

    // Fallbacks
    const fallbackPhotos = [
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=400&q=80",
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=400&q=80",
      "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=400&q=80",
      "https://images.unsplash.com/photo-1554995207-c18c203602cb?auto=format&fit=crop&w=400&q=80",
      "https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=400&q=80",
    ];
    for (const photo of fallbackPhotos) {
      if (galleryList.length >= 6) break;
      if (!galleryList.includes(photo)) {
        galleryList.push(photo);
      }
    }
    return galleryList;
  };

  const thumbnails = getEnrichedGallery();

  // Room details mapping matching screenshot specs
  const serviceFees = [
    { label: "ĐIỆN", value: "3.500 đ/kWh" },
    { label: "NƯỚC", value: "50.000 đ/người" },
    { label: "CỌC", value: "1 tháng" },
  ];

  const amenities = [
    { label: "Free Wifi", icon: Check },
    { label: "Điều hòa", icon: Check },
    { label: "Gác lửng", icon: Check },
    { label: "Tủ lạnh", icon: Check },
  ];

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

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 py-6 md:py-8 space-y-10">
        {/* Back Link */}
        <Link
          to="/search"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-slate-800 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to list</span>
        </Link>

        {/* MAIN DETAIL GRID */}
        <section className="grid gap-6 lg:grid-cols-12 items-start">
          {/* LEFT: GALLERY & SPECS */}
          <div className="lg:col-span-8 space-y-6">
            {/* Gallery Frame */}
            <div className="space-y-3">
              <div className="relative rounded-3xl overflow-hidden shadow-sm border border-slate-100 bg-white aspect-[16/10] w-full">
                <img
                  src={activeImage}
                  alt={room.title}
                  className="w-full h-full object-cover transition-all duration-300 loaded"
                />
                <button
                  onClick={() => {
                    toggle(room.id);
                    showToast(
                      liked
                        ? "Đã bỏ lưu phòng này!"
                        : "Đã lưu phòng vào danh sách yêu thích! ❤️",
                    );
                  }}
                  className="absolute top-4 right-4 h-11 w-11 rounded-full bg-white/90 backdrop-blur flex items-center justify-center shadow-md hover:scale-105 transition-transform"
                >
                  <Heart
                    className={`h-5 w-5 ${liked ? "fill-red-500 text-red-500" : "text-slate-600"}`}
                  />
                </button>
              </div>

              {/* Thumbnails */}
              <div className="flex gap-3">
                {thumbnails.map((thumb, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImage(thumb)}
                    className={`h-16 w-24 rounded-xl overflow-hidden border-2 transition-all ${
                      activeImage === thumb
                        ? "border-brand-yellow scale-102"
                        : "border-transparent opacity-80 hover:opacity-100"
                    }`}
                  >
                    <img
                      src={thumb}
                      alt="thumbnail"
                      className="h-full w-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* TITLE & META CARD */}
            <div className="bg-white p-6 md:p-8 rounded-3xl border border-slate-100 shadow-sm space-y-5">
              <div className="flex flex-wrap gap-2">
                <span className="text-[10px] font-extrabold uppercase bg-green-100 text-green-700 px-3 py-1 rounded-full">
                  Nổi bật
                </span>
                <span className="text-[10px] font-bold uppercase bg-slate-100 text-slate-500 px-3 py-1 rounded-full flex items-center gap-1">
                  <Clock className="h-3 w-3" /> Cập nhật 1 giờ trước
                </span>
              </div>

              <div className="space-y-2">
                <h1 className="text-2xl md:text-3xl font-extrabold text-slate-800 leading-tight">
                  {room.title}
                </h1>
                <div className="flex items-center gap-1 text-xs text-slate-500 font-bold">
                  <MapPin className="h-4 w-4 text-slate-400" />
                  <span>{room.address}</span>
                </div>
              </div>

              {/* Price & Area bar */}
              <div className="flex items-center gap-4 py-2 border-y border-slate-150 my-2">
                <span className="text-2xl font-display font-extrabold text-[#8B5A2B]">
                  {(room.price || 3500000).toLocaleString("vi-VN")} đ/tháng
                </span>
                <span className="flex items-center gap-1 text-xs font-bold text-blue-700 bg-blue-50 px-3 py-1 rounded-full">
                  <Ruler className="h-3.5 w-3.5" /> {room.area || 25}m²
                </span>
              </div>

              {/* Amenities */}
              <div className="space-y-3">
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                  Tiện ích
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {(room.amenities || []).map((amenity) => (
                    <div
                      key={amenity}
                      className="flex items-center gap-2 bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 text-xs font-bold text-slate-700"
                    >
                      <Check className="h-4 w-4 text-[#ffc700] shrink-0" />
                      <span>{amenity}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Service Fees */}
              <div className="space-y-4 pt-2">
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                  Chi phí dịch vụ
                </h3>
                <div className="grid grid-cols-3 gap-3">
                  {serviceFees.map((fee) => (
                    <div
                      key={fee.label}
                      className="bg-slate-50 border border-slate-100 rounded-xl p-3 text-center"
                    >
                      <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                        {fee.label}
                      </div>
                      <div className="text-xs font-extrabold text-slate-700 mt-1">
                        {fee.value}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="text-xs text-slate-600 leading-relaxed space-y-2 pt-2">
                  <p className="font-bold text-slate-800 mb-2">
                    Thông tin chi tiết:
                  </p>
                  <div className="whitespace-pre-line text-xs text-slate-600 leading-relaxed font-semibold">
                    {room.description}
                  </div>
                </div>
              </div>
            </div>

            {/* LOCATION MAP CARD */}
            <div className="bg-white p-6 md:p-8 rounded-3xl border border-slate-100 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-slate-800 text-sm">Vị trí</h3>
                <button
                  onClick={() => showToast("Mở bản đồ vị trí phòng trọ...")}
                  className="text-xs font-bold text-[#8B5A2B] hover:underline"
                >
                  Xem bản đồ lớn →
                </button>
              </div>

              {/* Map Canvas */}
              <div className="h-60 bg-[#e2edf2] rounded-2xl relative overflow-hidden flex items-center justify-center border border-slate-100 shadow-inner">
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
                  <div className="h-10 w-10 bg-[#ffc700] rounded-full flex items-center justify-center border-4 border-white shadow-md text-base animate-bounce">
                    📍
                  </div>
                  <span className="bg-slate-800 text-white text-[10px] font-bold px-2.5 py-1 rounded-full mt-1.5 shadow-md">
                    Bản đồ khu vực {room.district}
                  </span>
                </div>
              </div>

              {/* School Proximity Box */}
              <div className="bg-[#fff9e6] border border-[#ffc700]/10 rounded-2xl p-4 flex gap-3 text-brand-brown text-xs font-bold">
                <GraduationCap className="h-5 w-5 shrink-0 text-[#ffc700]" />
                <div>
                  <span>Khoảng cách đến trường học</span>
                  <span className="text-slate-500 font-semibold block mt-0.5">
                    {room.school || "Lân cận trường đại học"}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT: LANDLORD CONTACT */}
          <aside className="lg:col-span-4 space-y-6">
            <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm text-center space-y-6">
              {/* Landlord Info */}
              <div className="space-y-4">
                <div className="mx-auto h-16 w-16 rounded-full overflow-hidden border border-slate-100 shadow-inner relative">
                  <img
                    src={landlord.avatar}
                    alt={landlord.name}
                    className="h-full w-full object-cover"
                  />
                  <span className="absolute bottom-0 right-0 h-5 w-5 bg-green-500 text-white rounded-full flex items-center justify-center font-bold text-[10px] border-2 border-white">
                    ✓
                  </span>
                </div>

                <div className="space-y-1">
                  <h3 className="font-extrabold text-slate-800">
                    {landlord.name}
                  </h3>
                  <span className="flex items-center justify-center gap-1 text-[10px] font-bold text-green-700 bg-green-50 px-3 py-0.5 rounded-full w-max mx-auto">
                    <CheckCircle2 className="h-3 w-3" /> Đã xác minh danh tính
                  </span>
                </div>
              </div>

              {/* Contact Actions */}
              <div className="space-y-2.5 pt-2 border-t border-slate-100">
                <button
                  onClick={() => setShowChat(true)}
                  className="w-full py-3.5 px-6 rounded-xl font-bold text-slate-800 hover:opacity-95 transition-all flex items-center justify-center gap-1.5 shadow-md"
                  style={{ backgroundColor: "var(--brand-yellow)" }}
                >
                  <MessageCircle className="h-4.5 w-4.5 fill-current" />
                  <span>Liên hệ qua Zalo</span>
                </button>

                <a
                  href={`tel:${landlord.phone}`}
                  onClick={(e) => {
                    e.preventDefault();
                    showToast(`Hotline liên hệ: ${landlord.phone}`);
                    alert(
                      `Đang giả lập cuộc gọi điện thoại đến chủ nhà:\n${landlord.name} - SĐT: ${landlord.phone}`,
                    );
                  }}
                  className="w-full py-3 px-6 rounded-xl border border-slate-200 bg-white text-slate-700 font-bold hover:bg-slate-50 transition-all flex items-center justify-center gap-1.5 shadow-sm text-xs"
                >
                  <svg
                    className="h-4.5 w-4.5 text-slate-400 shrink-0"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2.5}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.94.725l.548 2.2a1 1 0 01-.321.988l-1.305.98a10.582 10.582 0 004.872 4.872l.98-1.305a1 1 0 01.988-.321l2.2.548a1 1 0 01.725.94V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                  <span>Gọi điện: {landlord.phone}</span>
                </a>

                <button
                  onClick={() => {
                    toggle(room.id);
                    showToast(
                      liked ? "Đã bỏ lưu tin!" : "Đã lưu tin thành công!",
                    );
                  }}
                  className="w-full text-xs font-bold text-slate-500 hover:text-slate-800 flex items-center justify-center gap-1 pt-1.5"
                >
                  <Bookmark
                    className={`h-4 w-4 ${liked ? "fill-amber-500 text-amber-500" : ""}`}
                  />
                  <span>{liked ? "Đã lưu tin này" : "Lưu tin này"}</span>
                </button>
              </div>
            </div>

            {/* Safety Disclaimer */}
            <div className="bg-[#f8fafc] border border-slate-200/50 p-5 rounded-3xl flex gap-3 text-slate-500 text-[10px] leading-relaxed">
              <AlertCircle className="h-5 w-5 shrink-0 text-amber-500" />
              <span>
                Luôn yêu cầu xem hợp đồng và kiểm tra phòng trực tiếp trước khi
                đặt cọc, không chuyển tiền trước khi chưa xác minh.
              </span>
            </div>
          </aside>
        </section>

        {/* RELATED ROOMS SECTION */}
        <section className="space-y-6 pt-6 border-t border-slate-100">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-extrabold text-slate-800 tracking-tight">
              Phòng tương tự gần đây
            </h2>
            <Link
              to="/search"
              className="text-xs font-bold text-[#8B5A2B] hover:underline"
            >
              Xem tất cả →
            </Link>
          </div>

          <div className="grid gap-6 sm:grid-cols-3">
            {[
              {
                id: "sau-01",
                title: "Phòng trọ Hòa Hải giá rẻ",
                price: 3500000,
                area: 20,
                district: "Hòa Hải",
                image:
                  "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=400&q=80",
                showBadge: true,
              },
              {
                id: "sau-02",
                title: "Studio mini gần FPT",
                price: 4200000,
                area: 30,
                district: "Hòa Hải",
                image:
                  "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=400&q=80",
                showBadge: false,
              },
              {
                id: "sau-03",
                title: "Gác lửng mới xây Hòa Hải",
                price: 2800000,
                area: 22,
                district: "Hòa Hải",
                image:
                  "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=400&q=80",
                showBadge: false,
              },
            ].map((r) => (
              <Link
                key={r.id}
                to="/room/$id"
                params={{ id: r.id }}
                className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden hover-raise flex flex-col justify-between group cursor-pointer text-left"
              >
                <div className="relative aspect-[4/3] w-full overflow-hidden image-zoom-container">
                  <img
                    src={r.image}
                    alt={r.title}
                    className="w-full h-full object-cover loaded"
                  />
                  {r.showBadge && (
                    <span
                      className="absolute top-3 left-3 px-2.5 py-0.5 rounded bg-[#ffc700] text-slate-800 text-[9px] font-bold uppercase tracking-wider"
                      style={{ backgroundColor: "var(--brand-yellow)" }}
                    >
                      Mới
                    </span>
                  )}
                </div>

                <div className="p-4 space-y-4">
                  <div>
                    <h3 className="font-bold text-sm text-slate-800 line-clamp-1 group-hover:text-brand-brown transition-colors">
                      {r.title}
                    </h3>
                    <p className="text-[10px] text-slate-400 font-bold mt-1">
                      {r.district}, Đà Nẵng
                    </p>
                  </div>
                  <div className="flex items-center justify-between pt-2 border-t border-slate-50 font-display font-extrabold text-xs text-[#8B5A2B]">
                    <span>{r.price.toLocaleString("vi-VN")} đ/tháng</span>
                    <span className="text-[9px] text-slate-400 font-bold uppercase">
                      {r.area}m²
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </main>

      {/* CHAT WINDOW COMPONENT */}
      {showChat && (
        <div className="fixed bottom-6 right-6 h-[460px] w-80 bg-white border border-slate-200 rounded-3xl shadow-2xl flex flex-col overflow-hidden z-50 animate-fade-in">
          {/* Chat Header */}
          <div className="bg-[#0068ff] p-4 text-white flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-full overflow-hidden bg-white/20">
                <img
                  src={landlord.avatar}
                  alt={landlord.name}
                  className="h-full w-full object-cover"
                />
              </div>
              <div>
                <p className="font-bold text-xs">{landlord.name} (Chủ trọ)</p>
                <span className="text-[9px] text-emerald-300 font-semibold block mt-0.5">
                  Vừa mới hoạt động
                </span>
              </div>
            </div>
            <button
              onClick={() => setShowChat(false)}
              className="p-1.5 rounded-full hover:bg-white/10 text-white transition-colors"
            >
              <X className="h-4.5 w-4.5" />
            </button>
          </div>

          {/* Chat messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50/50 scrollbar-thin">
            {chatMessages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex gap-2 max-w-[85%] ${msg.sender === "user" ? "ml-auto justify-end" : ""}`}
              >
                {msg.sender === "landlord" && (
                  <div className="h-6 w-6 rounded-full bg-slate-200 overflow-hidden shrink-0">
                    <img
                      src={landlord.avatar}
                      alt={landlord.name}
                      className="h-full w-full object-cover"
                    />
                  </div>
                )}
                <div
                  className={`p-2.5 rounded-2xl shadow-sm text-xs leading-snug border ${
                    msg.sender === "user"
                      ? "bg-[#eef2ff] border-blue-50 text-slate-850 rounded-tr-none"
                      : "bg-white border border-slate-100 text-slate-800 rounded-tl-none shadow-sm"
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex items-start gap-2 max-w-[85%] text-slate-400 font-medium italic mt-2">
                <div className="h-6 w-6 rounded-full bg-slate-200 overflow-hidden shrink-0">
                  <img
                    src={landlord.avatar}
                    className="h-full w-full object-cover"
                    alt="avatar"
                  />
                </div>
                <div className="bg-white/60 p-2.5 rounded-2xl rounded-tl-none border border-slate-100 flex items-center gap-1">
                  <span
                    className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce"
                    style={{ animationDelay: "0s" }}
                  ></span>
                  <span
                    className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce"
                    style={{ animationDelay: "0.2s" }}
                  ></span>
                  <span
                    className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce"
                    style={{ animationDelay: "0.4s" }}
                  ></span>
                </div>
              </div>
            )}
          </div>

          {/* Predefined message quick options */}
          <div className="px-3 py-2 border-t border-slate-100 flex flex-wrap gap-1.5 bg-white overflow-x-auto whitespace-nowrap scrollbar-none">
            {(() => {
              const selfL = landlord.pronounSelf.toLowerCase();
              const selfU = landlord.pronounSelf;
              const userU = landlord.pronounUser;
              const quickReplies = [
                `Chào ${selfL}, phòng còn trống không ạ?`,
                `${selfU} cho ${userU} hỏi cọc phòng bao nhiêu ạ?`,
                `Cho ${userU} đặt lịch xem phòng vào chiều mai với ${selfL}`,
                `Điện nước ở đây tính thế nào vậy ${selfL}?`,
              ];
              const quickRepliesLabels = [
                "Còn trống không ạ?",
                "Cọc bao nhiêu ạ?",
                "Đặt lịch xem phòng",
                "Phí điện nước",
              ];
              return quickReplies.map((text, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSendMessage(text)}
                  className="text-[9px] font-bold text-slate-500 hover:text-slate-800 bg-slate-100 hover:bg-slate-200 px-2.5 py-1 rounded-full transition-all shrink-0"
                >
                  {quickRepliesLabels[idx]}
                </button>
              ));
            })()}
          </div>

          {/* Chat Input */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage(chatInput);
            }}
            className="p-3 border-t border-slate-100 bg-white flex gap-2"
          >
            <input
              type="text"
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              placeholder="Nhập tin nhắn..."
              className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs outline-none text-slate-800"
            />
            <button
              type="submit"
              className="h-8 w-8 bg-brand-yellow rounded-xl text-slate-800 flex items-center justify-center hover:opacity-90 transition-all shadow-sm shrink-0"
              style={{ backgroundColor: "var(--brand-yellow)" }}
            >
              <Send className="h-4 w-4" />
            </button>
          </form>
        </div>
      )}

      <SiteFooter />
    </div>
  );
}

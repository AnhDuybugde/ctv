import room1 from "@/assets/room-1.jpg";
import room2 from "@/assets/room-2.jpg";
import room3 from "@/assets/room-3.jpg";
import { vanminhRooms } from "./crawled_vanminh_rooms";

export type Room = {
  id: string;
  title: string;
  district: string;
  address: string;
  price: number; // VND/month
  area: number; // m2
  image: string;
  tags: string[];
  rating: number;
  reviews: number;
  description: string;
  amenities: string[];
  school?: string;
  gallery?: string[];
};

const originalRooms: Room[] = [
  {
    id: "sau-crawled-1",
    title: "👉👉 : CẦN TIỀN BÁN GẤP :   NHÀ KIỆT THÁI THỊ BÔI  2TANG RẤT ĐẸP",
    district: "Thanh Khê",
    address: "Quận Thanh Khê, Đà Nẵng",
    price: 3450000,
    area: 41,
    image: "/crawled_images/chotot-132817965_0.jpg",
    tags: ["Phòng sạch đẹp", "Rộng rãi", "Điều hòa"],
    rating: 4.8,
    reviews: 41,
    description:
      "Phòng cho thuê thực tế từ Nhà Tốt, tọa lạc tại Quận Thanh Khê, Đà Nẵng, diện tích 41m2, giá thuê tốt nhất.",
    amenities: ["Wifi", "Máy lạnh", "Nóng lạnh", "Chỗ để xe"],
  },
  {
    id: "sau-crawled-2",
    title:
      "CĂN BIỆT THỰ SIÊU ĐẴNG CẤP NGAY GÓC 2 MẶT TIỀN KHU ĐÔ THỊ SINH THÁI HO",
    district: "Ngũ Hành Sơn",
    address: "Quận Cẩm Lệ, Đà Nẵng",
    price: 2500000,
    area: 175,
    image: "/crawled_images/chotot-131438492_0.jpg",
    tags: ["Phòng sạch đẹp", "Rộng rãi", "Giá rẻ"],
    rating: 4.8,
    reviews: 41,
    description:
      "Phòng cho thuê thực tế từ Nhà Tốt, tọa lạc tại Quận Cẩm Lệ, Đà Nẵng, diện tích 175m2, giá thuê tốt nhất.",
    amenities: ["Wifi", "Máy lạnh", "Nóng lạnh", "Chỗ để xe"],
  },
  {
    id: "sau-crawled-3",
    title: "CHO THUÊ NHÀ VƯỜN ĐẶNG THÁI THÂN, NGŨ HÀNH SƠN",
    district: "Ngũ Hành Sơn",
    address: "Quận Ngũ Hành Sơn, Đà Nẵng",
    price: 1500000,
    area: 300,
    image: "/crawled_images/chotot-132815165_0.jpg",
    tags: ["Phòng sạch đẹp", "Rộng rãi", "Giá rẻ"],
    rating: 4.7,
    reviews: 45,
    description:
      "Phòng cho thuê thực tế từ Nhà Tốt, tọa lạc tại Quận Ngũ Hành Sơn, Đà Nẵng, diện tích 300m2, giá thuê tốt nhất.",
    amenities: ["Wifi", "Máy lạnh", "Nóng lạnh", "Chỗ để xe"],
  },
  {
    id: "sau-crawled-4",
    title: "TÒA NHÀ 2 MẶT TIỀN VỊ TRÍ VÀNG TRUNG TÂM TP. ĐÀ NẴNG",
    district: "Hải Châu",
    address: "Quận Hải Châu, Đà Nẵng",
    price: 1200000,
    area: 350,
    image: "/crawled_images/chotot-132751803_0.jpg",
    tags: ["Phòng sạch đẹp", "Rộng rãi", "Giá rẻ"],
    rating: 4.8,
    reviews: 46,
    description:
      "Phòng cho thuê thực tế từ Nhà Tốt, tọa lạc tại Quận Hải Châu, Đà Nẵng, diện tích 350m2, giá thuê tốt nhất.",
    amenities: ["Wifi", "Máy lạnh", "Nóng lạnh", "Chỗ để xe"],
  },
  {
    id: "sau-crawled-5",
    title:
      "SIÊU VIP NHÀ HOÀ XUÂN, ĐÀ NẴNG ! NHÀ MỚI 100% GIÁ CHỈ :7ty2 xx  có bớt",
    district: "Ngũ Hành Sơn",
    address: "Quận Cẩm Lệ, Đà Nẵng",
    price: 3500000,
    area: 100,
    image: "/crawled_images/chotot-129346019_0.jpg",
    tags: ["Phòng sạch đẹp", "Rộng rãi", "Điều hòa"],
    rating: 4.8,
    reviews: 45,
    description:
      "Phòng cho thuê thực tế từ Nhà Tốt, tọa lạc tại Quận Cẩm Lệ, Đà Nẵng, diện tích 100m2, giá thuê tốt nhất.",
    amenities: ["Wifi", "Máy lạnh", "Nóng lạnh", "Chỗ để xe"],
  },
  {
    id: "sau-crawled-6",
    title:
      "🇻🇳 Cho thuê biệt thự Euro Villa 1 - Trần Hưng Đạo , Sơn Trà - 55 Triệu",
    district: "Sơn Trà",
    address: "Quận Sơn Trà, Đà Nẵng",
    price: 1500000,
    area: 250,
    image: "/crawled_images/chotot-132855036_0.jpg",
    tags: ["Phòng sạch đẹp", "Rộng rãi", "Giá rẻ"],
    rating: 4.6,
    reviews: 59,
    description:
      "Phòng cho thuê thực tế từ Nhà Tốt, tọa lạc tại Quận Sơn Trà, Đà Nẵng, diện tích 250m2, giá thuê tốt nhất.",
    amenities: ["Wifi", "Máy lạnh", "Nóng lạnh", "Chỗ để xe"],
  },
];

const mappedVanMinhRooms: Room[] = vanminhRooms.map((r) => ({
  id: r.id,
  title: r.title,
  district: r.district,
  address: r.location,
  price: r.price,
  area: r.area,
  image: r.image,
  tags: r.tags || [],
  rating: 4.8,
  reviews: 15,
  description: r.description,
  amenities: [
    "Wifi",
    "Chỗ để xe",
    "Môi trường văn minh",
    ...(r.tags.includes("Full nội thất")
      ? ["Máy lạnh", "Nóng lạnh", "Bếp riêng", "Tủ quần áo"]
      : []),
  ],
  school: r.school,
  gallery: r.gallery,
}));

export const rooms: Room[] = [...originalRooms, ...mappedVanMinhRooms];

export const formatVND = (n: number) =>
  new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
    maximumFractionDigits: 0,
  }).format(n);

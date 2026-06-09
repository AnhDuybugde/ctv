import { Link, useNavigate } from "@tanstack/react-router";
import { WormMascot } from "./WormMascot";
import { Heart, Plus, Search, Menu, X, Bell } from "lucide-react";
import { useState, useEffect } from "react";
import { AboutModal } from "./AboutModal";

const navLinks = [
  { to: "/search", label: "Tìm phòng" },
  { to: "#about", label: "Về chúng tôi", isAbout: true },
  { to: "/search", label: "Cẩm nang" },
  { to: "/pass-do", label: "Pass đồ", isPass: true },
];

export function SiteHeader() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [aboutOpen, setAboutOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkLogin = () => {
      setIsLoggedIn(localStorage.getItem("sau_user_logged_in") === "true");
    };
    checkLogin();
    window.addEventListener("sau_login", checkLogin);
    window.addEventListener("storage", checkLogin);
    return () => {
      window.removeEventListener("sau_login", checkLogin);
      window.removeEventListener("storage", checkLogin);
    };
  }, []);

  const handleNavigateToSearch = () => {
    navigate({ to: "/search" });
  };

  return (
    <>
      {/* ── Global Nav — Height and styling matching screenshots ── */}
      <header className="sticky top-0 z-40 bg-white border-b border-slate-100 shadow-sm">
        <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-10 flex items-center justify-between gap-4 h-16 md:h-[72px] lg:h-[80px]">
          {/* ── Brand ── */}
          <Link
            to="/"
            className="flex items-center gap-2.5 flex-shrink-0 group"
          >
            <WormMascot
              className="h-10 w-10 group-hover:scale-105 transition-transform"
              animate
            />
            <div className="leading-tight">
              <div
                className="font-display text-xl font-extrabold text-[#5c4033]"
                style={{ letterSpacing: "-0.02em" }}
              >
                Sâu Tìm Trọ
              </div>
              <div className="text-[11px] text-muted-foreground -mt-0.5 font-medium tracking-wide">
                trọ xinh ở Đà Nẵng
              </div>
            </div>
          </Link>

          {/* ── Desktop nav links ── */}
          <nav
            className="hidden lg:flex items-center gap-6 text-sm font-semibold"
            aria-label="Primary navigation"
          >
            {navLinks.map((l) => {
              if (l.isAbout) {
                return (
                  <button
                    key={l.label}
                    onClick={() => setAboutOpen(true)}
                    className="px-1 py-2 text-cocoa/80 hover:text-brand-brown hover:scale-105 transition-all cursor-pointer font-bold"
                    style={{ letterSpacing: "-0.01em" }}
                  >
                    {l.label}
                  </button>
                );
              }
              return (
                <Link
                  key={l.label}
                  to={l.to}
                  className="px-1 py-2 text-cocoa/80 hover:text-brand-brown hover:scale-105 transition-all font-bold relative pb-1 border-b-2 border-transparent"
                  style={{ letterSpacing: "-0.01em" }}
                  activeProps={{
                    className: "text-brand-brown border-brand-yellow font-bold",
                  }}
                >
                  {l.label}
                </Link>
              );
            })}
          </nav>

          {/* ── Right actions ── */}
          <div className="flex items-center gap-2">
            {/* Search Icon */}
            <Link
              to="/search"
              className="p-2.5 rounded-full hover:bg-slate-100 transition-colors text-cocoa"
              aria-label="Tìm phòng"
            >
              <Search className="h-5 w-5" />
            </Link>

            {/* Notification Bell */}
            <button
              className="p-2.5 rounded-full hover:bg-slate-100 transition-colors text-cocoa relative"
              aria-label="Thông báo"
            >
              <Bell className="h-5 w-5" />
              <span className="absolute top-2.5 right-2.5 h-2 w-2 rounded-full bg-red-500 animate-pulse" />
            </button>

            {/* Favorites (Heart) */}
            <Link
              to="/favorites"
              className="hidden md:inline-flex p-2.5 rounded-full hover:bg-slate-100 transition-colors text-cocoa"
              aria-label="Yêu thích"
            >
              <Heart className="h-5 w-5" />
            </Link>

            {/* Logged in Avatar or Log In button */}
            {isLoggedIn ? (
              <Link
                to="/onboarding"
                className="flex items-center gap-2 px-3 py-1.5 rounded-full hover:bg-slate-100 transition-all border border-slate-200 animate-fade-in"
              >
                <div className="h-7 w-7 rounded-full bg-brand-yellow flex items-center justify-center font-bold text-xs text-brand-brown">
                  SV
                </div>
                <span className="hidden sm:inline text-xs font-bold text-cocoa">
                  Hoàng Phú
                </span>
              </Link>
            ) : (
              <Link
                to="/onboarding"
                className="inline-flex items-center px-4 py-[7px] text-sm font-semibold text-cocoa hover:text-brand-brown transition-all"
                style={{ letterSpacing: "-0.01em" }}
              >
                Đăng nhập
              </Link>
            )}

            {/* Post Button (Capsule, Greenish Brown) */}
            <Link
              to="/onboarding"
              className="inline-flex items-center gap-1.5 px-5 py-[8px] rounded-[50px] bg-brand-brown text-[#ffffff] hover:opacity-90 text-sm font-semibold transition-all active:scale-95 shadow-sm"
              style={{
                letterSpacing: "-0.01em",
                backgroundColor: "var(--brand-brown)",
              }}
            >
              <Plus className="h-4 w-4" />
              <span>Đăng phòng</span>
            </Link>

            {/* Hamburger mobile */}
            <button
              className="lg:hidden p-2.5 rounded-full hover:bg-slate-100 transition-colors text-cocoa"
              aria-label="Menu"
              onClick={() => setMobileOpen((v) => !v)}
            >
              {mobileOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>

        {/* ── Mobile drawer ── */}
        {mobileOpen && (
          <nav
            className="lg:hidden bg-white border-t border-slate-100 px-4 pb-4 pt-2 flex flex-col gap-1"
            aria-label="Mobile navigation"
          >
            {navLinks.map((l) => {
              if (l.isAbout) {
                return (
                  <button
                    key={l.label}
                    onClick={() => {
                      setAboutOpen(true);
                      setMobileOpen(false);
                    }}
                    className="w-full text-left px-4 py-3 rounded-xl text-sm font-bold text-cocoa hover:bg-slate-100 transition-colors"
                  >
                    {l.label}
                  </button>
                );
              }
              return (
                <Link
                  key={l.label}
                  to={l.to}
                  className="px-4 py-3 rounded-xl text-sm font-bold text-cocoa hover:bg-slate-100 transition-colors"
                  onClick={() => setMobileOpen(false)}
                >
                  {l.label}
                </Link>
              );
            })}
          </nav>
        )}
      </header>

      {/* About Us Modal popup */}
      <AboutModal
        isOpen={aboutOpen}
        onClose={() => setAboutOpen(false)}
        onNavigateToSearch={handleNavigateToSearch}
      />
    </>
  );
}

import LoggedInHeaderMenu from "@/components/header/LoggedInHeaderMenu";
import SideNavigation from "@/components/header/SideNavigation";
import UnLoggedInHeaderMenu from "@/components/header/UnLoggedInHeaderMenu";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { useEffect, useState } from "react";
import { Link } from "react-router";

export default function Header() {
  // 임시 로그인 상태 (추후 변경 예정)
  const [isLoggedIn] = useState(false);
  const [isSideNavOpen, setIsSideNavOpen] = useState(false);

  // Tailwind의 sm size
  const isMobile = useMediaQuery("(max-width: 640px)");

  // sm 사이즈 벗어나면 SideNavigation 자동 닫기
  useEffect(() => {
    if (!isMobile) setIsSideNavOpen(false);
  }, [isMobile]);

  return (
    <>
      <header className="flex justify-center bg-green-600 text-neutral-50">
        <div className="flex w-full max-w-[1440px] items-center justify-between p-3">
          <h1>
            <Link to="/" className="text-lg text-neutral-50 sm:text-2xl sm:font-medium">
              이건뭐약
            </Link>
          </h1>

          {isLoggedIn ? (
            <LoggedInHeaderMenu />
          ) : (
            <UnLoggedInHeaderMenu isMobile={isMobile} onMenuClick={() => setIsSideNavOpen(true)} />
          )}
        </div>
      </header>
      <SideNavigation isOpen={isSideNavOpen} onClose={() => setIsSideNavOpen(false)} />
    </>
  );
}

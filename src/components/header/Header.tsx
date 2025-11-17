import LoggedInHeaderMenu from "@/components/header/LoggedInHeaderMenu";
import SideNavigation from "@/components/header/SideNavigation";
import UnLoggedInHeaderMenu from "@/components/header/UnLoggedInHeaderMenu";
import useAuthStore from "@/hooks/stores/useAuthStore";
import useMediaQuery from "@/hooks/useMediaQuery";
import { useEffect, useState } from "react";
import { Link } from "react-router";

export default function Header() {
  const { isAuthed } = useAuthStore();
  const [isSideNavOpen, setIsSideNavOpen] = useState(false);

  // Tailwind의 sm size
  const isMobile = useMediaQuery("(max-width: 640px)");

  // sm 사이즈 벗어나면 SideNavigation 자동 닫기
  useEffect(() => {
    if (!isMobile) setIsSideNavOpen(false);
  }, [isMobile]);

  return (
    <>
      <header className="fixed top-0 left-0 flex w-full justify-center bg-green-600 text-neutral-50">
        <div className="flex w-full max-w-[1440px] items-center justify-between p-3">
          <h1>
            <Link to="/" className="text-lg text-neutral-50 sm:text-2xl sm:font-medium">
              <img src="/logo/logo.png" alt="이건뭐약 로고" className="h-10 w-auto sm:h-14" />
            </Link>
          </h1>

          {isAuthed ? (
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

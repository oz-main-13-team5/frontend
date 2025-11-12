import useBodyScrollLock from "@/hooks/useBodyScrollLock";
import { cn } from "@/libs/utils";
import { ChevronLeft } from "lucide-react";
import { Link } from "react-router";

interface SideNavigationProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SideNavigation({ isOpen, onClose }: SideNavigationProps) {
  useBodyScrollLock(isOpen); // 스크롤 락

  return (
    <aside
      className={cn(
        "fixed top-0 right-0 z-100 h-dvh w-full bg-neutral-50 transition-transform duration-300 ease-in-out sm:hidden",
        isOpen ? "translate-x-0" : "translate-x-full"
      )}
    >
      <header className="p-3">
        <h2 className="sr-only">사이드 메뉴</h2>
        <button
          className="inline-flex h-10 w-10 items-center justify-center text-green-600"
          aria-label="닫기"
          onClick={onClose}
        >
          <ChevronLeft />
        </button>
      </header>
      <ul className="border-y border-y-neutral-400 py-4">
        <li>
          <Link
            to="/login"
            onClick={onClose}
            className="inline-flex h-12 w-full items-center px-4 text-lg text-neutral-900 hover:text-green-600"
          >
            로그인
          </Link>
        </li>
        <li>
          <Link
            to="/sign-up"
            onClick={onClose}
            className="inline-flex h-12 w-full items-center px-4 text-lg text-neutral-900 hover:text-green-600"
          >
            회원가입
          </Link>
        </li>
      </ul>
    </aside>
  );
}

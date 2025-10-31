import { ChevronLeft } from "lucide-react";
import { Link } from "react-router";

export default function SideNavigation() {
  return (
    <aside className="block h-dvh sm:hidden">
      <header className="p-3">
        <h2 className="sr-only">사이드 메뉴</h2>
        <button
          className="inline-flex h-10 w-10 items-center justify-center text-green-600"
          aria-label="닫기"
          // TODO: 닫기 동작 시 onClose 실행 예정
        >
          <ChevronLeft />
        </button>
      </header>
      <ul className="border-y border-y-neutral-400 py-4">
        <li>
          <Link
            to="/login"
            className="inline-flex h-12 w-full items-center px-4 text-lg text-neutral-900 hover:text-green-600"
          >
            로그인
          </Link>
        </li>
        <li>
          <Link
            to="/sign-up"
            className="inline-flex h-12 w-full items-center px-4 text-lg text-neutral-900 hover:text-green-600"
          >
            회원가입
          </Link>
        </li>
      </ul>
    </aside>
  );
}

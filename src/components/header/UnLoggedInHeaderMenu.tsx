import Button from "@/components/common/Button";
import { MenuIcon } from "lucide-react";
import { Link } from "react-router";

export default function UnLoggedInHeaderMenu() {
  return (
    <nav className="flex gap-3">
      {/* 모바일 - 메뉴 아이콘 */}
      <Button
        variant={"primaryOutline"}
        size="sm"
        className="inline-flex h-10 w-10 items-center justify-center p-0 text-green-600 sm:hidden"
        aria-label="메뉴"
        // TODO: 사이드 네비게이션 바 구현 시 onClick 추가
      >
        <MenuIcon />
      </Button>

      {/* 로그인 */}
      <Link
        to="/login"
        className="hidden h-10 w-10 items-center justify-center rounded-lg border border-green-600 bg-neutral-50 text-green-600 hover:bg-neutral-200 sm:inline-flex sm:h-14 sm:w-auto"
        aria-label="로그인"
      >
        <span className="text-lg text-neutral-900 sm:px-6">로그인</span>
      </Link>

      {/* 회원가입 */}
      <Link
        to="/sign-up"
        className="hidden h-10 w-10 items-center rounded-lg border border-green-600 bg-neutral-50 text-green-600 hover:bg-neutral-200 sm:inline-flex sm:h-14 sm:w-auto sm:px-6"
        aria-label="회원가입"
      >
        <span className="text-lg text-neutral-900">회원가입</span>
      </Link>
    </nav>
  );
}

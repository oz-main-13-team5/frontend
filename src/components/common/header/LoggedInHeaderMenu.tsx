import Button from "@/components/common/Button";
import { LogOutIcon, User2Icon } from "lucide-react";
import { Link } from "react-router";

export default function LoggedInHeaderMenu() {
  return (
    <nav className="flex gap-3">
      {/* 마이페이지 */}
      <Link
        to="/mypage"
        className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-green-600 bg-neutral-50 text-green-600 hover:bg-neutral-200 sm:h-14 sm:w-auto"
        aria-label="마이페이지"
      >
        <User2Icon className="sm:hidden" />
        <span className="hidden text-lg text-neutral-900 sm:inline sm:px-6">마이페이지</span>
      </Link>

      {/* 로그아웃 */}
      <Button
        variant={"primaryOutline"}
        size="sm"
        className="inline-flex h-10 w-10 items-center justify-center p-0 text-green-600 sm:hidden"
        aria-label="로그아웃"
      >
        <LogOutIcon />
      </Button>
      <Button variant={"primaryOutline"} size="lg" className="hidden sm:block">
        로그아웃
      </Button>
    </nav>
  );
}

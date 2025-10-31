import LoggedInHeaderMenu from "@/components/header/LoggedInHeaderMenu";
import UnLoggedInHeaderMenu from "@/components/header/UnLoggedInHeaderMenu";
import { useState } from "react";
import { Link } from "react-router";

export default function Header() {
  // 임시 로그인 상태 (추후 변경 예정)
  const [isLoggedIn] = useState(false);

  return (
    <header className="flex justify-center bg-green-600 text-neutral-50">
      <div className="flex w-full max-w-[1440px] items-center justify-between p-3">
        <h1>
          <Link to="/" className="text-lg text-neutral-50 sm:text-2xl sm:font-medium">
            이건뭐약
          </Link>
        </h1>

        {isLoggedIn ? <LoggedInHeaderMenu /> : <UnLoggedInHeaderMenu />}
      </div>
    </header>
  );
}

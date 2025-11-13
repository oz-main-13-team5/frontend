import { JUST_LOGGED_IN } from "@/constants/key-constants";
import useAuthStore from "@/hooks/stores/useAuthStore";
import useToast from "@/hooks/useToast";
import { Navigate, Outlet } from "react-router";

export default function PublicRoute() {
  const isAuthed = useAuthStore((state) => state.isAuthed);
  const { triggerToast } = useToast();

  if (isAuthed) {
    const justLoggedIn = sessionStorage.getItem(JUST_LOGGED_IN);

    if (justLoggedIn) {
      sessionStorage.removeItem(JUST_LOGGED_IN);

      return <Outlet />;
    } else {
      triggerToast(
        "error",
        "로그인 상태 접근 제한",
        "해당 페이지는 로그인 상태에서 접근 할 수 없습니다."
      );

      return <Navigate to="/" replace />;
    }
  }

  return (
    <>
      <Outlet />
    </>
  );
}

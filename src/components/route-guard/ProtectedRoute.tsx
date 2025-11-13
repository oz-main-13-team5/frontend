import useAuthStore from "@/hooks/stores/useAuthStore";
import useToast from "@/hooks/useToast";
import { Navigate, Outlet } from "react-router";

export default function ProtectedRoute() {
  const isAuthed = useAuthStore((state) => state.isAuthed);
  const { triggerToast } = useToast();

  if (!isAuthed) {
    triggerToast(
      "error",
      "비로그인 상태 접근 제한",
      "해당 페이지는 비로그인 상태에서 접근 할 수 없습니다."
    );

    return <Navigate to="/login" replace />;
  }

  return (
    <>
      <Outlet />
    </>
  );
}

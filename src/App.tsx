import { Route, Routes } from "react-router";
import { lazy, Suspense } from "react";
import RootLayout from "@/components/layouts/RootLayout";
import PublicRoute from "@/components/route-guard/PublicRoute";
import ProtectedRoute from "@/components/route-guard/ProtectedRoute";
import Loading from "@/components/common/Loading";

// 페이지 단위 코드 스플리팅 (lazy 로딩)
const Home = lazy(() => import("@/pages/Home"));
const MyPageEdit = lazy(() => import("@/pages/MyPageEdit"));
const PillList = lazy(() => import("@/pages/PillList"));
const SignUp = lazy(() => import("@/pages/SignUp"));
const Login = lazy(() => import("@/pages/Login"));
const Mypage = lazy(() => import("@/pages/MyPage"));

function App() {
  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        <Route element={<RootLayout />}>
          <Route index element={<Home />} />
          <Route path="/pill" element={<PillList />} />

          <Route element={<PublicRoute />}>
            <Route path="/sign-up" element={<SignUp />} />
            <Route path="/login" element={<Login />} />
          </Route>

          <Route element={<ProtectedRoute />}>
            <Route path="/my-page" element={<Mypage />} />
            <Route path="/my-page/edit" element={<MyPageEdit />} />
          </Route>
        </Route>
      </Routes>
    </Suspense>
  );
}

export default App;

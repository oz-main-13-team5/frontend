import RootLayout from "@/components/layouts/RootLayout";
import Home from "@/pages/Home";
import MyPageEdit from "@/pages/MyPageEdit";
import PillList from "@/pages/PillList";
import SignUp from "@/pages/SignUp";
import Login from "@/pages/Login";
import { Route, Routes } from "react-router";
import Mypage from "@/pages/MyPage";
import PublicRoute from "@/components/route-guard/PublicRoute";

function App() {
  return (
    <Routes>
      <Route element={<RootLayout />}>
        <Route index element={<Home />} />
        <Route path="/pill" element={<PillList />} />

        <Route element={<PublicRoute />}>
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
        </Route>

        <Route path="/my-page" element={<Mypage />} />
        <Route path="/my-page/edit" element={<MyPageEdit />} />
      </Route>
    </Routes>
  );
}

export default App;

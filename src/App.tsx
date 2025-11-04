import RootLayout from "@/components/layouts/RootLayout";
import Home from "@/pages/Home";
import PillList from "@/pages/PillList";
import SignUp from "@/pages/SignUp";
import Login from "@/pages/Login";
import { Route, Routes } from "react-router";

function App() {
  return (
    <Routes>
      <Route element={<RootLayout />}>
        <Route index element={<Home />} />
        <Route path="/pill" element={<PillList />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
      </Route>
    </Routes>
  );
}

export default App;

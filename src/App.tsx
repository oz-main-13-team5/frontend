import RootLayout from "@/components/layouts/RootLayout";
import Home from "@/pages/Home";
import PillList from "@/pages/PillList";
import { Route, Routes } from "react-router";

function App() {
  return (
    <Routes>
      <Route element={<RootLayout />}>
        <Route index element={<Home />} />
        <Route path="/pill" element={<PillList />} />
      </Route>
    </Routes>
  );
}

export default App;

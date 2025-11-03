import RootLayout from "@/components/layouts/RootLayout";
import Home from "@/pages/Home";
import { Route, Routes } from "react-router";

function App() {
  return (
    <Routes>
      <Route element={<RootLayout />}>
        <Route index element={<Home />} />
      </Route>
    </Routes>
  );
}

export default App;

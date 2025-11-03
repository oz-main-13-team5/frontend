import Footer from "@/components/Footer";
import Header from "@/components/header/Header";
import { Outlet } from "react-router";

export default function RootLayout() {
  return (
    <div className="flex flex-col">
      <Header />
      <main className="min-h-screen">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

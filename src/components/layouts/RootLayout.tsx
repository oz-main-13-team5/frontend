import Footer from "@/components/Footer";
import Header from "@/components/header/Header";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { Outlet } from "react-router";

const DESKTOP_HEADER_HEIGHT_PX = 80;
const MOBILE_HEADER_HEIGHT_PX = 64;

export default function RootLayout() {
  // Tailwind의 sm size
  const isMobile = useMediaQuery("(max-width: 640px)");

  return (
    <div className="relative flex flex-col">
      <Header />
      <main
        className="min-h-screen"
        // tailwind는 템플릿 리터럴 미지원으로 부득이하게 style 태그 사용
        style={{
          paddingTop: isMobile ? `${MOBILE_HEADER_HEIGHT_PX}px` : `${DESKTOP_HEADER_HEIGHT_PX}px`,
        }}
      >
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

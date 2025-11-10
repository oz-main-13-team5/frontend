import axios from "axios";
import { MSW_BASE_URL } from "@/constants/url-constants";
import type { Pill } from "@/types/api-response-types/pill-response-types";
import PillSearchInput from "@/components/PillSearchInput";
import PillListItem from "@/components/PillListItem";
import { useEffect, useState } from "react";

export default function Home() {
  const [pillList, setPillList] = useState<Pill[]>([]);

  useEffect(() => {
    const fetchPills = async () => {
      try {
        const res = await axios.get(`${MSW_BASE_URL}/pills/`, {
          params: { page: 1 },
        });
        setPillList(res.data.pills);
      } catch (error) {
        console.error("❌ 약 목록 로딩 실패:", error);
      }
    };
    fetchPills();
  }, []);


  return (
    <div className="flex min-h-screen flex-col">
      {/* 메인 콘텐츠 */}
      <main className="flex-1 px-4 py-8 sm:px-8">
        <div className="max-w-5xl mx-auto flex flex-col gap-8">
          {/* 검색 바 */}
          <PillSearchInput className="w-full" />

          {/* 배너 (회색 영역) */}
          <div className="w-full bg-neutral-200 h-48 sm:h-64 rounded-lg flex items-center justify-center text-neutral-500 text-lg">
            배너 이미지 영역
          </div>

          {/* 약 리스트 */}
          <div className="flex flex-col gap-3">
            {pillList.map((pill) => (
              <PillListItem key={pill.item_seq} pill={pill} />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}

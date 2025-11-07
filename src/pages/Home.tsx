import PillSearchInput from "@/components/PillSearchInput";
import PillListItem from "@/components/PillListItem";
import { useState } from "react";

export default function Home() {

  const [_, search] = useState("");
  const dummyPills = [
    {
      item_seq: "1",
      item_name: "약",
      efcy_qesitm: "약 설명이 들어갑니다. 약 입니다요. 약 입니다요.",
      entp_name: "약",
      item_image_url: "_ ,",
    },
    {
      item_seq: "2",
      item_name: "약",
      efcy_qesitm: "약 설명이 들어갑니다. 약 입니다요. 약 입니다요.",
      entp_name: "약",
      item_image_url: "_ ,",
    },
    {
      item_seq: "3",
      item_name: "약",
      efcy_qesitm: "약 설명이 들어갑니다. 약 입니다요. 약 입니다요.",
      entp_name: "약",
      item_image_url: "_ ,",
    },
  ];

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
            {dummyPills.map((pill) => (
              <PillListItem key={pill.item_seq} pill={pill} />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}

import { cn } from "@/libs/utils";
import { CameraIcon, ImageIcon, SearchIcon } from "lucide-react";
import React, { useState } from "react";

interface PillSearchInputProps {
  className?: string;
}

const ICON_CLASS_NAME = "text-green-600 transition-colors hover:text-green-700";

export default function PillSearchInput({ className }: PillSearchInputProps) {
  //TODO: 전역상태 연결 혹은 데이터 fetching 연결
  const [search, setSearch] = useState("");

  const handleInputChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setSearch(e.target.value);
  };

  return (
    <div
      className={cn("flex items-center gap-2.5 rounded-lg border border-green-600 p-4", className)}
    >
      <SearchIcon className="text-neutral-400 transition-colors hover:text-neutral-500" />
      <input
        className="flex-1 text-neutral-900 placeholder:text-neutral-400 focus:outline-none"
        placeholder="약 이름을 입력해주세요."
        value={search}
        onChange={handleInputChange}
      />
      {/* //TODO: 이미지 아이콘 클릭 시 이미지 검색 모달 열기 */}
      <ImageIcon className={ICON_CLASS_NAME} />
      {/* //TODO: 카메라 아이콘 클릭 시 기기 카메라 열기 */}
      <CameraIcon className={ICON_CLASS_NAME} />
    </div>
  );
}

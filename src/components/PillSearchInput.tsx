import ImageSearchBarModal from "@/components/image-search-bar-modal/ImageSearchBarModal";
import Modal from "@/components/Modal";
import usePillSearchStore from "@/hooks/stores/usePillSearchStore";
import { cn } from "@/libs/utils";
import { CameraIcon, ImageIcon, SearchIcon } from "lucide-react";
import React, { useState } from "react";

interface PillSearchInputProps {
  className?: string;
}

const ICON_CLASS_NAME = "text-green-600 transition-colors hover:text-green-700";

export default function PillSearchInput({ className }: PillSearchInputProps) {
  const { setQueryParamValue } = usePillSearchStore();
  const [inputValue, setInputValue] = useState("");

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    setQueryParamValue(inputValue.trim());
  };

  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div
      className={cn("flex items-center gap-2.5 rounded-lg border border-green-600 p-4", className)}
    >
      <form onSubmit={handleSubmit} className="flex min-w-0 flex-1 items-center gap-2.5">
        <button type="submit">
          <SearchIcon className="text-neutral-400 transition-colors hover:text-neutral-500" />
        </button>

        <input
          className="min-w-0 flex-1 overflow-hidden text-neutral-900 placeholder:text-neutral-400 focus:outline-none"
          placeholder="약 이름을 입력해주세요."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
      </form>

      {/* //TODO: 이미지 아이콘 클릭 시 이미지 검색 모달 열기 */}
      <button
        onClick={() => {
          setIsModalOpen(true);
        }}
        className="cursor-pointer"
      >
        <ImageIcon className={ICON_CLASS_NAME} />
      </button>

      {/* //TODO: 카메라 아이콘 클릭 시 기기 카메라 열기 */}
      <CameraIcon className={ICON_CLASS_NAME} />

      <Modal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
        }}
        className="gap-0 sm:w-[90%] sm:max-w-2xl"
      >
        <ImageSearchBarModal />
      </Modal>
    </div>
  );
}

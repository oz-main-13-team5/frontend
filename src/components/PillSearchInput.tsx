import CameraModal from "@/components/CameraModal";
import ImageSearchBarModal from "@/components/image-search-bar-modal/ImageSearchBarModal";
import usePillSearchStore from "@/hooks/stores/usePillSearchStore";
import { cn } from "@/libs/utils";
import { SearchIcon } from "lucide-react";
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router";

const PILL_PATH = "/pill";

interface PillSearchInputProps {
  className?: string;
}

export default function PillSearchInput({ className }: PillSearchInputProps) {
  const { setQueryParamValue } = usePillSearchStore();
  const [inputValue, setInputValue] = useState("");

  const navigate = useNavigate();
  const location = useLocation();

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    if (location.pathname !== PILL_PATH) {
      navigate(PILL_PATH);
    }

    setQueryParamValue(inputValue.trim());
  };

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

      <ImageSearchBarModal />
      <CameraModal />
    </div>
  );
}

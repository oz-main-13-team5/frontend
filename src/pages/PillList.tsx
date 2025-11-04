import Button from "@/components/common/Button";
import PillSearchInput from "@/components/PillSearchInput";
import { ChevronLeftIcon } from "lucide-react";
import { Link } from "react-router";

export default function PillList() {
  return (
    <div className="flex w-full justify-center p-5">
      <div className="flex w-full max-w-7xl flex-col items-center gap-5">
        <Link to="/" className="flex w-full justify-start">
          <ChevronLeftIcon className="text-green-600" />
        </Link>
        <PillSearchInput className="w-full max-w-2xl" />
        <div className="flex w-full items-center justify-between">
          <span className="text-base text-neutral-900 sm:text-lg">검색 결과 리스트 (n)개</span>
          <Button className="h-14">북마크 필터</Button>
        </div>
      </div>
    </div>
  );
}

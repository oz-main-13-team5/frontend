import Button from "@/components/common/Button";
import PillSearchInput from "@/components/PillSearchInput";
import { ChevronLeftIcon } from "lucide-react";
import { Link } from "react-router";
import type { PillList } from "@/types/api-response-types/pill-response-types";
import usePillList from "@/hooks/api/usePillList";
import PillListItem from "@/components/PillListItem";

export default function PillList() {
  const { data, isPending, isError } = usePillList();

  return (
    <div className="flex w-full justify-center p-5">
      <div className="flex w-full max-w-7xl flex-col items-center gap-5">
        <Link to="/" className="flex w-full justify-start">
          <ChevronLeftIcon className="text-green-600" />
        </Link>
        <PillSearchInput className="w-full max-w-2xl" />
        <div className="flex w-full items-center justify-between">
          <span className="text-base text-neutral-900 sm:text-lg">{`검색 결과 리스트 ${data ? data.pills.length : 0}개`}</span>
          <Button className="h-14">북마크 필터</Button>
        </div>

        {/* 의약품 리스트 */}
        <section className="flex w-full flex-col gap-5">
          {/* 얼리 리턴을 위한 즉시 실행 함수 */}
          {(() => {
            if (isPending) {
              //TODO: 로딩 컴포넌트
              return <span>로딩중</span>;
            }

            if (isError || !data) {
              //TODO: 에러 코드별 분기 처리
              return (
                <span>데이터를 가져오는데 문제가 발생했습니다. 잠시 후 다시 시도해주세요.</span>
              );
            }

            return data.pills.map((pill) => <PillListItem pill={pill} key={pill.item_seq} />);
          })()}
        </section>
      </div>
    </div>
  );
}

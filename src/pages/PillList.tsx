import Button from "@/components/common/Button";
import PillSearchInput from "@/components/PillSearchInput";
import { ChevronLeftIcon } from "lucide-react";
import { Link } from "react-router";
import type { PillList } from "@/types/api-response-types/pill-response-types";

import PillListItem from "@/components/PillListItem";
import useInfinitePillList from "@/hooks/api/useInfinitePillList";
import React from "react";
import useObserver from "@/hooks/useObserver";
import SelectBox, { type Option } from "@/components/common/SelectBox";

const SELECT_OPTIONS: Option[] = [
  {
    value: "itemName",
    text: "의약품명",
  },
  {
    value: "enterpriseName",
    text: "제조사",
  },
  {
    value: "efficacy",
    text: "효능",
  },
];

export default function PillList() {
  const { data, isPending, isError, isFetchingNextPage, hasNextPage, fetchNextPage } =
    useInfinitePillList();

  const handleObserverIntersect = () => {
    if (hasNextPage) {
      fetchNextPage();
    }
  };

  const observerRef = useObserver(handleObserverIntersect);

  return (
    <div className="flex w-full justify-center p-5">
      <div className="flex w-full max-w-7xl flex-col items-center gap-5">
        <div className="flex w-full justify-start">
          <Link to="/">
            <ChevronLeftIcon className="text-green-600" />
          </Link>
        </div>

        <div className="flex w-full flex-col-reverse items-center gap-2 sm:flex-row">
          <SelectBox options={SELECT_OPTIONS} className="w-full sm:w-42" />
          <PillSearchInput className="w-full max-w-2xl sm:max-w-full sm:flex-1" />
          <div className="sm:w-42" />
        </div>

        <div className="flex w-full items-center justify-between">
          <span className="text-base text-neutral-900 sm:text-lg">{`검색 결과 리스트 ${data ? data.pages[0].total : 0}개`}</span>
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

            return data.pages.map((group, i) => (
              <React.Fragment key={i}>
                {group.pills.map((pill) => (
                  <PillListItem pill={pill} key={pill.item_seq} />
                ))}
              </React.Fragment>
            ));
          })()}
        </section>
        <div ref={observerRef} />
        {isFetchingNextPage && <span>로딩 중</span>}
        {hasNextPage || <span>모든 약 정보를 가져왔습니다.</span>}
      </div>
    </div>
  );
}

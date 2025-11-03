import { cn } from "@/libs/utils";
import { useState, type ReactNode } from "react";

interface TabItem {
  key: string;
  label: string;
  content: ReactNode;
  tabClassName?: string;
  activeClassName?: string;
  inactiveClassName?: string;
}

interface TabProps {
  items: TabItem[];
  showAllKey?: string;
  className?: string;
}

/**
 * 공용 탭 컴포넌트
 * - items 배열을 기반으로 탭 버튼과 콘텐츠를 렌더링합니다.
 * - 각 탭은 key, label, content를 필수 속성으로 가집니다.
 * - showAllKey가 설정된 경우, '전체 보기' 탭처럼 모든 탭 콘텐츠를 순차적으로 표시할 수 있습니다.
 */

export default function Tab({ items, showAllKey, className }: TabProps) {
  const [activeTab, setActiveTab] = useState(showAllKey || items[0]?.key);

  // showAllKey가 설정되어 있고 현재 활성 탭이 해당 key라면, 모든 탭의 콘텐츠를 순차적으로 렌더링
  const isShowAll = showAllKey && activeTab === showAllKey;

  const tabContent = isShowAll
    ? items
        .filter((item) => item.key !== showAllKey)
        .map((item) => <div key={item.key}>{item.content}</div>)
    : items.find((item) => item.key === activeTab)?.content;

  return (
    <div>
      <div
        role="tablist"
        className={cn(
          "flex justify-between overflow-hidden rounded-lg border border-neutral-300 bg-neutral-50",
          className
        )}
      >
        {items.map((item) => (
          <button
            key={item.key}
            role="tab"
            onClick={() => setActiveTab(item.key)}
            className={cn(
              "flex-1 px-6 py-1 text-lg text-neutral-600",
              activeTab === item.key
                ? cn("bg-green-600 text-neutral-50", item.activeClassName)
                : cn("bg-neutral-50 text-neutral-600", item.inactiveClassName)
            )}
          >
            {item.label}
          </button>
        ))}
      </div>
      {tabContent}
    </div>
  );
}

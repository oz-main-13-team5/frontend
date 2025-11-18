import { MSW_BASE_URL } from "@/constants/url-constants";
import type { Pill } from "@/types/api-response-types/pill-response-types";
import PillSearchInput from "@/components/PillSearchInput";
import PillListItem from "@/components/PillListItem";
import { useEffect, useState } from "react";
import { api } from "@/libs/axios";
import Loading from "@/components/common/Loading";
import bannerImage from "@/assets/images/banner/banner.png";

export default function Home() {
  const [pillList, setPillList] = useState<Pill[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPills = async () => {
      try {
        setLoading(true);
        const res = await api.get(`${MSW_BASE_URL}/pills/`, {
          params: { page: 1 },
        });
        setPillList(res.data.pills);
      } catch (err) {
        console.error("❌ 약 목록 로딩 실패:", err);
        setError("약 목록을 불러오는데 실패했습니다.");
      } finally {
        setLoading(false);
      }
    };
    fetchPills();
  }, []);

  return (
    <div className="flex min-h-screen flex-col">
      {/* 메인 콘텐츠 */}
      <main className="flex-1 px-4 py-8 sm:px-8">
        <div className="mx-auto flex max-w-5xl flex-col gap-8">
          {/* 검색 바 */}
          <PillSearchInput className="w-full" />

          {/* 배너 */}
          <div className="flex w-full items-center justify-center overflow-hidden rounded-lg bg-neutral-200 text-lg text-neutral-500">
            <img src={bannerImage} alt="배너" className="h-auto w-full" />
          </div>

          <h1 className="text-4xl font-semibold text-neutral-900">대표 의약품</h1>

          {/* 로딩 상태 */}
          {loading && (
            <div className="flex gap-2 py-8">
              <Loading />
              <span className="text-center text-neutral-500">약 목록을 불러오는 중입니다...</span>
            </div>
          )}

          {/* 에러 상태 */}
          {error && <div className="py-8 text-center text-red-500">{error}</div>}

          {/* 정상 데이터 */}
          {!loading && !error && (
            <div className="flex flex-col gap-3">
              {pillList.length > 0 ? (
                pillList.map((pill) => <PillListItem key={pill.item_seq} pill={pill} />)
              ) : (
                <div className="py-8 text-center text-neutral-500">표시할 약이 없습니다</div>
              )}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

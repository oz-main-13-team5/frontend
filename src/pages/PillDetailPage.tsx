import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { api } from "@/libs/axios";
import { MSW_BASE_URL } from "@/constants/url-constants";
import type { PillDetail } from "@/types/api-response-types/pill-response-types";
import Tab from "@/components/common/Tab";
import Bookmark from "@/components/common/Bookmark";
import Loading from "@/components/common/Loading";

export default function PillDetailPage() {
  const { itemSeq } = useParams<{ itemSeq: string }>();
  const [pill, setPill] = useState<PillDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPillDetail = async () => {
      try {
        setLoading(true);

        const res = await api.get(`${MSW_BASE_URL}/pills/${itemSeq}`);
        setPill(res.data);

      } catch (err) {
        console.error("❌ 약 상세 불러오기 실패:", err);
        setError("약 상세 정보를 불러오지 못했습니다 😢");
      } finally {
        setLoading(false);
      }
    };

    fetchPillDetail();
  }, [itemSeq]);

  if (loading) return <Loading />;
  if (error) return <p className="text-center text-red-500 py-8">{error}</p>;
  if (!pill) return <p className="text-center py-8">약 정보를 찾을 수 없습니다.</p>;
  
  const {
    item_name: name,
    efcy_qesitm: efficacy,
    item_image_url: imageUrl,
    item_seq: id,
    entp_name: company,
    is_marked: isMarked,
    use_method_qesitm: usage,
    atpn_warn_qesitm: caution,
    se_qesitm: sideEffects,
    deposit_method_qesitm: storage,
  } = pill;

  return (
    <div className="max-w-5xl mx-auto px-4 py-6 sm:py-8">
      {/* 상단 약 기본 정보 */}
      <div className="flex flex-col sm:flex-row gap-6">
        <img
          src={imageUrl || "/no_image.png"}
          alt={name}
          className="w-32 h-32 sm:w-40 sm:h-40 object-contain border rounded-md mx-auto sm:mx-0"
        />
        <div className="flex flex-col justify-center gap-1 text-center sm:text-left">
          <h1 className="text-2xl sm:text-3xl font-semibold">{name}</h1>
          <p className="text-sm text-gray-600">업체명: {company}</p>
          <p className="text-sm text-gray-600">제품코드: {id}</p>

          <div className="flex justify-center sm:justify-start">
            <Bookmark pillId={id} initialState={isMarked} className="mt-2" />
          </div>
        </div>
      </div>

      {/* 상세 정보 탭 */}
      <div className="mt-8 pb-16">
        <div className="sticky top-12 bg-white z-10 pb-2 sm:top-20">
          <Tab
            items={[
              {
                key: "전체",
                label: "전체 보기",
                content: (
                  <div className="space-y-6 mt-4 text-sm sm:text-base">
                    <section>
                      <h2 className="font-semibold text-lg mb-1">효능</h2>
                      <p className="whitespace-pre-line">
                        {efficacy || "등록된 효능 정보가 없습니다."}
                      </p>
                    </section>

                    <section>
                      <h2 className="font-semibold text-lg mb-1">사용법</h2>
                      <p className="whitespace-pre-line">
                        {usage || "등록된 사용법 정보가 없습니다."}
                      </p>
                    </section>

                    <section>
                      <h2 className="font-semibold text-lg mb-1">주의사항</h2>
                      <p className="whitespace-pre-line">
                        {caution || "등록된 주의사항 정보가 없습니다."}
                      </p>
                    </section>

                    <section>
                      <h2 className="font-semibold text-lg mb-1">부작용</h2>
                      <p className="whitespace-pre-line">
                        {sideEffects || "등록된 부작용 정보가 없습니다."}
                      </p>
                    </section>

                    <section>
                      <h2 className="font-semibold text-lg mb-1">보관방법</h2>
                      <p className="whitespace-pre-line">
                        {storage || "등록된 보관 정보가 없습니다."}
                      </p>
                    </section>
                  </div>
                ),
              },
              {
                key: "효능",
                label: "효능",
                content: (
                  <p className="mt-4 whitespace-pre-line">
                    {efficacy || "등록된 효능 정보가 없습니다."}
                  </p>
                ),
              },
              {
                key: "사용법",
                label: "사용법",
                content: (
                  <p className="mt-4 whitespace-pre-line">
                    {usage || "등록된 사용법 정보가 없습니다."}
                  </p>
                ),
              },
              {
                key: "주의사항",
                label: "주의사항",
                content: (
                  <p className="mt-4 whitespace-pre-line">
                    {caution || "등록된 주의사항 정보가 없습니다."}
                  </p>
                ),
              },
              {
                key: "부작용",
                label: "부작용",
                content: (
                  <p className="mt-4 whitespace-pre-line">
                    {sideEffects || "등록된 부작용 정보가 없습니다."}
                  </p>
                ),
              },
              {
                key: "보관방법",
                label: "보관방법",
                content: (
                  <p className="mt-4 whitespace-pre-line">
                    {storage || "등록된 보관 정보가 없습니다."}
                  </p>
                ),
              },
            ]}
          />
        </div>
      </div>
    </div>
  );
}


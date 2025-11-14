import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { MSW_BASE_URL } from "@/constants/url-constants";
import type { PillDetail } from "@/types/api-response-types/pill-response-types";
import Tab from "@/components/common/Tab";
import Button from "@/components/common/Button";

export default function PillDetailPage() {
  const { itemSeq } = useParams<{ itemSeq: string }>();
  const [pill, setPill] = useState<PillDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPillDetail = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`${MSW_BASE_URL}/pills/${itemSeq}`);
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

  if (loading) return <p className="text-center py-8">로딩 중...</p>;
  if (error) return <p className="text-center text-red-500 py-8">{error}</p>;
  if (!pill) return <p className="text-center py-8">약 정보를 찾을 수 없습니다.</p>;

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      {/* 상단 약 기본 정보 */}
      <div className="flex flex-col sm:flex-row gap-6">
        <img
          src={pill.item_image_url || "/no_image.png"}
          alt={pill.item_name}
          className="w-40 h-40 object-contain border rounded-md"
        />
        <div className="flex flex-col justify-center gap-1">
          <h1 className="text-2xl font-semibold">{pill.item_name}</h1>
          <p className="text-sm text-gray-600">업체명: {pill.entp_name}</p>
          <p className="text-sm text-gray-600">제품코드: {pill.item_seq}</p>
          <Button className="mt-2 w-fit">북마크</Button>
        </div>
      </div>

      {/* 상세 정보 탭 */}
      <div className="mt-8">
        <Tab
          items={[
            {
              key: "효능",
              label: "효능",
              content: (
                <p className="mt-4 whitespace-pre-line">
                  {pill.efcy_qesitm || "등록된 효능 정보가 없습니다."}
                </p>
              ),
            },
            {
              key: "사용법",
              label: "사용법",
              content: (
                <p className="mt-4 whitespace-pre-line">
                  {pill.use_method_qesitm || "등록된 사용법 정보가 없습니다."}
                </p>
              ),
            },
            {
              key: "주의사항",
              label: "주의사항",
              content: (
                <p className="mt-4 whitespace-pre-line">
                  {pill.atpn_warn_qesitm || "등록된 주의사항 정보가 없습니다."}
                </p>
              ),
            },
            {
              key: "부작용",
              label: "부작용",
              content: (
                <p className="mt-4 whitespace-pre-line">
                  {pill.se_qesitm || "등록된 부작용 정보가 없습니다."}
                </p>
              ),
            },
            {
              key: "보관방법",
              label: "보관방법",
              content: (
                <p className="mt-4 whitespace-pre-line">
                  {pill.deposit_method_qesitm || "등록된 보관 정보가 없습니다."}
                </p>
              ),
            },
          ]}
        />
      </div>
    </div>
  );
}

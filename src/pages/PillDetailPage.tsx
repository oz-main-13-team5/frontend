import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { api } from "@/libs/axios";
import { MSW_BASE_URL } from "@/constants/url-constants";
import type { PillDetail } from "@/types/api-response-types/pill-response-types";
import Bookmark from "@/components/common/Bookmark";
import Loading from "@/components/common/Loading";
import PillDetailTab from "@/components/pill-detail-tab/PillDetailTab";
import PillDetailTabItem from "@/components/pill-detail-tab/PillDetailTabItem";
import useMediaQuery from "@/hooks/useMediaQuery";

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

  const isMobile = useMediaQuery("(max-width: 640px)");

  if (loading) return <Loading />;
  if (error) return <p className="py-8 text-center text-red-500">{error}</p>;
  if (!pill) return <p className="py-8 text-center">약 정보를 찾을 수 없습니다.</p>;

  const {
    item_name: name,
    item_image_url: imageUrl,
    item_seq: id,
    entp_name: company,
    is_marked: isMarked,
    efcy_qesitm: efficacy,
    use_method_qesitm: usage,
    atpn_warn_qesitm: caution,
    se_qesitm: sideEffects,
    deposit_method_qesitm: storage,
  } = pill;

  return (
    <div className="mx-auto max-w-5xl px-4 py-6 sm:py-8">
      {/* 상단 약 기본 정보 */}
      <div className="flex flex-col gap-6 sm:flex-row">
        <img
          src={imageUrl || "/no_image.png"}
          alt={name}
          className="mx-auto h-32 w-32 rounded-md border object-contain sm:mx-0 sm:h-40 sm:w-40"
        />
        <div className="flex flex-col justify-center gap-1 text-center sm:text-left">
          <h1 className="text-2xl font-semibold sm:text-3xl">{name}</h1>
          <p className="text-sm text-gray-600">업체명: {company}</p>
          <p className="text-sm text-gray-600">제품코드: {id}</p>

          <div className="flex justify-center sm:justify-start">
            <Bookmark pillId={id} initialState={isMarked} className="mt-2" />
          </div>
        </div>
      </div>

      {/* 상세 정보 탭 */}
      <div className="mt-8 pb-16">
        {isMobile ? (
          <div className="space-y-6 text-sm sm:text-base">
            <PillDetailTabItem type="efficacy" description={efficacy} />
            <PillDetailTabItem type="usage" description={usage} />
            <PillDetailTabItem type="caution" description={caution} />
            <PillDetailTabItem type="sideEffects" description={sideEffects} />
            <PillDetailTabItem type="storage" description={storage} />
          </div>
        ) : (
          <PillDetailTab pillDetail={pill} />
        )}
      </div>
    </div>
  );
}

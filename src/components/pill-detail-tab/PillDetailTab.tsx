import Tab from "@/components/common/Tab";
import type { PillDetail } from "@/types/api-response-types/pill-response-types";

const TAB_CLASS_NAME = "p-4";

interface PillDetailTabProps {
  pillDetail: PillDetail;
}

export default function PillDetailTab({ pillDetail }: PillDetailTabProps) {
  const {
    efcy_qesitm: efficacy,
    use_method_qesitm: usage,
    atpn_warn_qesitm: caution,
    se_qesitm: sideEffects,
    deposit_method_qesitm: storage,
  } = pillDetail;

  return (
    <Tab
      items={[
        {
          key: "전체",
          label: "전체 보기",
          content: (
            <div className="mt-4 space-y-6 text-sm sm:text-base">
              <section>
                <h2 className="mb-1 text-lg font-semibold">효능</h2>
                <p className="whitespace-pre-line">{efficacy || "등록된 효능 정보가 없습니다."}</p>
              </section>

              <section>
                <h2 className="mb-1 text-lg font-semibold">사용법</h2>
                <p className="whitespace-pre-line">{usage || "등록된 사용법 정보가 없습니다."}</p>
              </section>

              <section>
                <h2 className="mb-1 text-lg font-semibold">주의사항</h2>
                <p className="whitespace-pre-line">
                  {caution || "등록된 주의사항 정보가 없습니다."}
                </p>
              </section>

              <section>
                <h2 className="mb-1 text-lg font-semibold">부작용</h2>
                <p className="whitespace-pre-line">
                  {sideEffects || "등록된 부작용 정보가 없습니다."}
                </p>
              </section>

              <section>
                <h2 className="mb-1 text-lg font-semibold">보관방법</h2>
                <p className="whitespace-pre-line">{storage || "등록된 보관 정보가 없습니다."}</p>
              </section>
            </div>
          ),
          tabClassName: TAB_CLASS_NAME,
        },
        {
          key: "효능",
          label: "효능",
          content: <p>{efficacy || "등록된 효능 정보가 없습니다."}</p>,
          tabClassName: TAB_CLASS_NAME,
        },
        {
          key: "사용법",
          label: "사용법",
          content: <p>{usage || "등록된 사용법 정보가 없습니다."}</p>,
          tabClassName: TAB_CLASS_NAME,
        },
        {
          key: "주의사항",
          label: "주의사항",
          content: <p>{caution || "등록된 주의사항 정보가 없습니다."}</p>,
          tabClassName: TAB_CLASS_NAME,
        },
        {
          key: "부작용",
          label: "부작용",
          content: <p>{sideEffects || "등록된 부작용 정보가 없습니다."}</p>,
          tabClassName: TAB_CLASS_NAME,
        },
        {
          key: "보관방법",
          label: "보관방법",
          content: <p>{storage || "등록된 보관 정보가 없습니다."}</p>,
          tabClassName: TAB_CLASS_NAME,
        },
      ]}
    />
  );
}

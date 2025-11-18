import Tab from "@/components/common/Tab";
import PillDetailTabItem from "@/components/pill-detail-tab/PillDetailTabItem";
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
      className="mb-4"
      items={[
        {
          key: "전체",
          label: "전체 보기",
          content: (
            <div className="space-y-6 text-sm sm:text-base">
              <PillDetailTabItem type="efficacy" description={efficacy} />
              <PillDetailTabItem type="usage" description={usage} />
              <PillDetailTabItem type="caution" description={caution} />
              <PillDetailTabItem type="sideEffects" description={sideEffects} />
              <PillDetailTabItem type="storage" description={storage} />
            </div>
          ),
          tabClassName: TAB_CLASS_NAME,
        },
        {
          key: "효능",
          label: "효능",
          content: <PillDetailTabItem type="efficacy" description={efficacy} />,
          tabClassName: TAB_CLASS_NAME,
        },
        {
          key: "사용법",
          label: "사용법",
          content: <PillDetailTabItem type="usage" description={usage} />,
          tabClassName: TAB_CLASS_NAME,
        },
        {
          key: "주의사항",
          label: "주의사항",
          content: <PillDetailTabItem type="caution" description={caution} />,
          tabClassName: TAB_CLASS_NAME,
        },
        {
          key: "부작용",
          label: "부작용",
          content: <PillDetailTabItem type="sideEffects" description={sideEffects} />,
          tabClassName: TAB_CLASS_NAME,
        },
        {
          key: "보관방법",
          label: "보관방법",
          content: <PillDetailTabItem type="storage" description={storage} />,
          tabClassName: TAB_CLASS_NAME,
        },
      ]}
    />
  );
}

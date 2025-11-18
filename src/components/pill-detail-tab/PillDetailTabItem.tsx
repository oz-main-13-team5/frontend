type pillItemType = "efficacy" | "usage" | "caution" | "sideEffects" | "storage";

const PillItemTypeMap: Record<pillItemType, string> = {
  efficacy: "효능",
  usage: "사용법",
  caution: "주의사항",
  sideEffects: "부작용",
  storage: "보관방법",
};

interface PillDetailTabItemProps {
  type: pillItemType;
  description: string;
}

export default function PillDetailTabItem({ type, description }: PillDetailTabItemProps) {
  return (
    <section>
      <h2 className="mb-1 text-lg font-semibold text-green-500">{PillItemTypeMap[type]}</h2>
      <p className="whitespace-pre-line text-neutral-900">
        {description || `등록된 ${PillItemTypeMap[type]} 정보가 없습니다.`}
      </p>
    </section>
  );
}

import Button from "@/components/common/Button";
import Input from "@/components/common/Input";

interface ImageUrlLinkFormProps {}

export default function ImageUrlLinkForm({}: ImageUrlLinkFormProps) {
  //TODO: 실제 폼 및 api에 연결
  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
  };

  return (
    <form onSubmit={handleSubmit} className="flex h-14 w-full items-center gap-2">
      <Input
        className="h-full flex-1 gap-0"
        inputClassName="h-full"
        placeholder="이미지 링크 붙여넣기"
      />
      <Button className="h-full" type="submit">
        검색
      </Button>
    </form>
  );
}

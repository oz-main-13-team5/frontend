import Button from "@/components/common/Button";
import Input from "@/components/common/Input";
import Loading from "@/components/common/Loading";
import { urlToFile } from "@/libs/utils";
import { useState } from "react";

interface ImageUrlLinkFormProps {
  onSubmit: () => void;
  setImageFile: React.Dispatch<React.SetStateAction<File | null>>;
  isPending?: boolean;
}

export default function ImageUrlLinkForm({
  onSubmit,
  setImageFile,
  isPending = false,
}: ImageUrlLinkFormProps) {
  const [imageUrl, setImageUrl] = useState("");

  //TODO: 실제 폼 및 api에 연결
  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    if (!imageUrl) return;

    const imageFile = await urlToFile(imageUrl);

    setImageFile(imageFile);

    onSubmit();
  };

  return (
    <form onSubmit={handleSubmit} className="flex h-14 w-full items-center gap-2">
      <Input
        className="h-full flex-1 gap-0"
        inputClassName="h-full"
        placeholder="이미지 링크 붙여넣기"
        value={imageUrl}
        onChange={(e) => {
          setImageUrl(e.target.value);
        }}
      />
      <Button
        className="flex h-full items-center justify-center"
        type="submit"
        disabled={isPending}
      >
        {isPending ? <Loading /> : " 검색"}
      </Button>
    </form>
  );
}

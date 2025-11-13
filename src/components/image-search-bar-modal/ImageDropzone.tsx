import Button from "@/components/common/Button";
import Loading from "@/components/common/Loading";
import { cn, fileToDataUrl } from "@/libs/utils";
import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";

const MAX_IMAGE_SIZE = 5 * 1024 * 1024;

interface ImageDropzoneProps {
  onSubmit: () => void;
  setImageFile: React.Dispatch<React.SetStateAction<File | null>>;
  isPending?: boolean;
}

export default function ImageDropzone({
  onSubmit,
  setImageFile,
  isPending = false,
}: ImageDropzoneProps) {
  const [previewUrl, setPreviewUrl] = useState("");
  const [error, setError] = useState("");

  const handleFile = useCallback(async (file: File | null) => {
    if (!file) return;

    //jpeg 혹은 png만 허용
    const isValidType = ["image/jpeg", "image/png"].includes(file.type);
    const isValidSize = file.size <= MAX_IMAGE_SIZE;

    if (!isValidType || !isValidSize) {
      setError("유효하지 않은 파일입니다. JPG 또는 PNG, 5MB 이하만 가능");

      return;
    }

    setImageFile(file);

    setError("");
    const dataUrl = await fileToDataUrl(file);
    setPreviewUrl(dataUrl);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      "image/jpeg": [],
      "image/png": [],
    },
    maxFiles: 1,
    onDrop: (acceptedFiles) => {
      handleFile(acceptedFiles[0] ?? null);
    },
  });

  if (previewUrl.length > 0) {
    //이미지 미리보기
    return (
      <div className="flex flex-col items-center gap-5">
        <img src={previewUrl} alt="preview" className="w-full rounded-xl object-contain" />
        <div className="flex items-center justify-center gap-2">
          <Button
            variant={"primaryOutline"}
            onClick={() => {
              setPreviewUrl("");
            }}
          >
            다른 사진 고르기
          </Button>
          <Button
            onClick={() => {
              if (!previewUrl) return;
              onSubmit();
            }}
            className="flex items-center justify-center"
            disabled={isPending}
          >
            {isPending ? <Loading /> : " 검색"}
          </Button>
        </div>
      </div>
    );
  } else {
    //이미지 드래그 앤 드랍
    return (
      <div
        className={cn(
          "flex h-36 w-full flex-col items-center justify-center gap-1 rounded-lg border bg-neutral-300 p-2",
          isDragActive ? "border-green-600" : "border-none"
        )}
        {...getRootProps()}
      >
        {error.length > 0 ? (
          <span className="text-red-500">{error}</span>
        ) : (
          <>
            <span className="text-neutral-600">
              여기로 이미지를 드래그하거나 파일을 업로드하세요.
            </span>
            <span className="text-neutral-600">5mb 이하의 png 혹은 jpg만 올려주세요.</span>
          </>
        )}

        <input className="hidden" {...getInputProps()} />
      </div>
    );
  }
}

interface ImageDropzoneProps {}

export default function ImageDropzone({}: ImageDropzoneProps) {
  return (
    <div className="flex h-36 w-full items-center justify-center rounded-lg bg-neutral-300 p-2">
      <span className="text-neutral-600">여기로 이미지를 드래그하거나 파일을 업로드하세요</span>
    </div>
  );
}

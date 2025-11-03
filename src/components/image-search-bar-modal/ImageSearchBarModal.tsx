import ImageUrlLinkForm from "@/components/image-search-bar-modal/ImageUrlLinkForm";

interface ImageSearchBarModalProps {}

export default function ImageSearchBarModal({}: ImageSearchBarModalProps) {
  return (
    <div className="flex w-full max-w-2xl flex-col items-center justify-center gap-5 rounded-xl border border-neutral-400 bg-neutral-50 p-6">
      <span className="text-2xl font-medium text-neutral-900">이미지 검색</span>

      {/* image drop zone */}
      <div className="flex h-36 w-full items-center justify-center rounded-lg bg-neutral-300 p-2">
        <span className="text-neutral-600">여기로 이미지를 드래그하거나 파일을 업로드하세요</span>
      </div>

      {/* divder */}
      <div className="relative w-full border border-green-600">
        <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-neutral-50 px-1 text-neutral-900">
          또는
        </span>
      </div>

      <ImageUrlLinkForm />
    </div>
  );
}

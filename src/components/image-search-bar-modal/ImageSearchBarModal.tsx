import ImageDropzone from "@/components/image-search-bar-modal/ImageDropzone";
import ImageUrlLinkForm from "@/components/image-search-bar-modal/ImageUrlLinkForm";

interface ImageSearchBarModalProps {}

export default function ImageSearchBarModal({}: ImageSearchBarModalProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-5">
      <span className="text-2xl font-medium text-neutral-900">이미지 검색</span>

      <ImageDropzone />

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

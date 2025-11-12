import ImageDropzone from "@/components/image-search-bar-modal/ImageDropzone";
import ImageUrlLinkForm from "@/components/image-search-bar-modal/ImageUrlLinkForm";
import Modal from "@/components/Modal";
import usePillImageSearch from "@/hooks/api/usePillImageSearch";
import useAuthStore from "@/hooks/stores/useAuthStore";
import useToast from "@/hooks/useToast";
import { createImageName } from "@/libs/utils";
import { ImageIcon } from "lucide-react";
import { useState } from "react";

interface ImageSearchBarModalProps {}

export default function ImageSearchBarModal({}: ImageSearchBarModalProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  //TODO: 비로그인 시 접근 제한
  const { user } = useAuthStore((state) => state);
  const { triggerToast } = useToast();

  const { mutate } = usePillImageSearch({
    onSuccess: () => {
      setIsModalOpen(false);
      triggerToast("success", "업로드 성공!", "업로드 내역은 마이페이지에서 확인해주세요.");
    },
    onError: () => {
      triggerToast("error", "업로드 실패", "이미지 전송에 실패했습니다. 잠시후 다시 시도해주세요.");
    },
  });

  const onSubmit = () => {
    if (!imageFile) return;

    const nickname = user ? user.nickname : "anonymous";

    const imageType = imageFile.type === "image/png" ? "png" : "jpg";

    const filename = createImageName(imageType, nickname);

    mutate({ image: imageFile, filename });
  };

  return (
    <>
      <button
        onClick={() => {
          setIsModalOpen(true);
        }}
        className="cursor-pointer"
      >
        <ImageIcon className="text-green-600 transition-colors hover:text-green-700" />
      </button>

      <Modal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
        }}
        className="gap-0 sm:w-[90%] sm:max-w-2xl"
      >
        <div className="flex flex-col items-center justify-center gap-5">
          <span className="text-2xl font-medium text-neutral-900">이미지 검색</span>

          <ImageDropzone onSubmit={onSubmit} setImageFile={setImageFile} />

          {/* divder */}
          <div className="relative w-full border border-green-600">
            <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-neutral-50 px-1 text-neutral-900">
              또는
            </span>
          </div>

          <ImageUrlLinkForm onSubmit={onSubmit} setImageFile={setImageFile} />
        </div>
      </Modal>
    </>
  );
}

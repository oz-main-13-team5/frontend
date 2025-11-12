import ImageDropzone from "@/components/image-search-bar-modal/ImageDropzone";
import ImageUrlLinkForm from "@/components/image-search-bar-modal/ImageUrlLinkForm";
import Modal from "@/components/Modal";
import { ImageIcon } from "lucide-react";
import { useState } from "react";

interface ImageSearchBarModalProps {}

export default function ImageSearchBarModal({}: ImageSearchBarModalProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

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
        {" "}
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
      </Modal>
    </>
  );
}

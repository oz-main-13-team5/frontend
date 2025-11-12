import Button from "@/components/common/Button";
import Modal from "@/components/Modal";
import usePillImageSearch from "@/hooks/api/usePillImageSearch";
import useAuthStore from "@/hooks/stores/useAuthStore";
import useToast from "@/hooks/useToast";
import { createImageName, fileToDataUrl } from "@/libs/utils";
import { CameraIcon } from "lucide-react";
import { useEffect, useRef, useState } from "react";

interface CameraModalProps {}

export default function CameraModal({}: CameraModalProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  //TODO: 비로그인 시 접근 제한
  const { user } = useAuthStore((state) => state);

  const [mediaStream, setMediaStream] = useState<MediaStream | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [error, setError] = useState("");
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  //TODO: 이미지 파일 서버로 전송
  const [imageFile, setImageFile] = useState<File | null>(null);

  const handleCameraClick = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment" },
      });
      setMediaStream(stream);
      setIsModalOpen(true);
      setError("");
      setPreviewImage(null);
      setImageFile(null);
    } catch (error) {
      setError("카메라 실행에 실패했습니다. 브라우저 권한을 확인 후 잠시 후 다시 시도해주세요.");
    }
  };

  useEffect(() => {
    if (isModalOpen && videoRef.current && mediaStream) {
      videoRef.current.srcObject = mediaStream;
      videoRef.current.play().catch((err) => {
        setError(`비디오 재생 실패: ${err}`);
      });
    }
  }, [isModalOpen, mediaStream]);

  const handleClose = () => {
    setIsModalOpen(false);
    if (mediaStream) {
      mediaStream.getTracks().forEach((track) => track.stop());
      setMediaStream(null);
    }
  };

  const handleCapture = async () => {
    if (!videoRef.current) return;

    const video = videoRef.current;
    let width = video.videoWidth;
    let height = video.videoHeight;

    const MAX_SIZE = 5 * 1024 * 1024; // 5MB
    const MIN_QUALITY = 0.1;
    const QUALITY_STEP = 0.05;
    const RESIZE_STEP = 0.9; // 90%씩 줄이기

    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    if (!ctx) {
      setError("캔버스 렌더링 컨텍스트를 가져올 수 없습니다.");
      return;
    }

    let quality = 0.9;
    let blob: Blob | null = null;

    const createBlob = (): Promise<Blob | null> => {
      canvas.width = width;
      canvas.height = height;
      ctx.drawImage(video, 0, 0, width, height);
      return new Promise((resolve) => {
        canvas.toBlob((b) => resolve(b), "image/jpeg", quality);
      });
    };

    // 반복: 파일이 5MB 이상이면 품질 먼저 줄이고, 그래도 안되면 크기 줄이기
    do {
      blob = await createBlob();

      if (!blob) {
        setError("이미지 변환 중 오류가 발생했습니다.");
        return;
      }

      if (blob.size > MAX_SIZE) {
        if (quality > MIN_QUALITY + QUALITY_STEP) {
          quality -= QUALITY_STEP; // 품질 낮추기
        } else {
          width = Math.floor(width * RESIZE_STEP);
          height = Math.floor(height * RESIZE_STEP); // 캔버스 크기 줄이기
        }
      }
    } while (blob.size > MAX_SIZE);

    const file = new File([blob], `capture_${Date.now()}.jpeg`, { type: "image/jpeg" });
    setImageFile(file);

    const dataUrl = await fileToDataUrl(file);
    setPreviewImage(dataUrl);
  };

  const handleRetake = () => {
    setPreviewImage(null);
    setImageFile(null);
    handleCameraClick();
  };

  const { triggerToast } = useToast();

  const { mutate } = usePillImageSearch({
    onSuccess: () => {
      triggerToast("success", "업로드 성공!", "업로드 내역은 마이페이지에서 확인해주세요.");
      handleClose();
    },
    onError: () => {
      triggerToast("error", "업로드 실패", "이미지 전송에 실패했습니다. 잠시후 다시 시도해주세요.");
      setError("이미지 전송에 실패했습니다. 잠시후 다시 시도해주세요.");
    },
  });

  const handleSubmit = () => {
    if (!imageFile) return;

    const nickname = user ? user.nickname : "anonymous";

    const filename = createImageName("jpg", nickname);

    mutate({ image: imageFile, filename });
  };

  return (
    <>
      <button onClick={handleCameraClick} className="cursor-pointer">
        <CameraIcon className="text-green-600 transition-colors hover:text-green-700" />
      </button>

      <Modal isOpen={isModalOpen} onClose={handleClose} className="gap-0">
        <div className="flex flex-col items-center justify-center gap-5">
          {error ? (
            <span className="text-neutral-900">{error}</span>
          ) : previewImage ? (
            // 촬영 후 프리뷰
            <div className="flex flex-col items-center gap-3">
              <img
                src={previewImage}
                alt="촬영된 이미지"
                className="w-full max-w-md rounded-lg shadow-md"
              />
              <div className="flex gap-3">
                <Button onClick={handleRetake} variant="primaryOutline">
                  다시 촬영
                </Button>
                {/* TODO:  */}
                <Button onClick={handleSubmit} variant="primary">
                  이미지 검색
                </Button>
              </div>
            </div>
          ) : (
            // 촬영 전 카메라 화면
            <>
              <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                className="w-full max-w-md rounded-lg shadow-md"
              />
              <div className="flex gap-3">
                <Button onClick={handleClose} variant="primaryOutline">
                  닫기
                </Button>
                <Button onClick={handleCapture} variant="primary">
                  촬영
                </Button>
              </div>
            </>
          )}
        </div>
      </Modal>
    </>
  );
}

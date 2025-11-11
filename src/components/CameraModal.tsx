import Button from "@/components/common/Button";
import Modal from "@/components/Modal";
import { CameraIcon } from "lucide-react";
import { useEffect, useRef, useState } from "react";

interface CameraModalProps {}

export default function CameraModal({}: CameraModalProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const [mediaStream, setMediaStream] = useState<MediaStream | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [error, setError] = useState("");
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  //TODO: 이미지 파일 서버로 전송
  const [, setImageFile] = useState<File | null>(null);

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
    const width = video.videoWidth;
    const height = video.videoHeight;

    // 캔버스 생성
    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext("2d");

    if (!ctx) {
      setError("캔버스 렌더링 컨텍스트를 가져올 수 없습니다.");
      return;
    }

    // 비디오 프레임을 캔버스에 그리기
    ctx.drawImage(video, 0, 0, width, height);

    // 캔버스 데이터를 Blob으로 변환 (jpeg 또는 png)
    canvas.toBlob(
      (blob) => {
        if (!blob) {
          setError("이미지 변환 중 오류가 발생했습니다.");
          return;
        }

        // Blob을 File로 변환
        const mimeType = "image/jpeg";
        const file = new File([blob], `capture_${Date.now()}.jpeg`, { type: mimeType });
        setImageFile(file);

        // FileReader로 프리뷰 URL 생성
        const reader = new FileReader();
        reader.onloadend = () => setPreviewImage(reader.result as string);
        reader.readAsDataURL(file);
      },
      "image/jpeg",
      0.9 // 이미지 품질
    );
  };

  const handleRetake = () => {
    setPreviewImage(null);
    setImageFile(null);
    handleCameraClick();
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
            // 📸 촬영 후 프리뷰
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
                <Button onClick={handleClose} variant="primary">
                  이미지 검색
                </Button>
              </div>
            </div>
          ) : (
            // 🎥 촬영 전 카메라 화면
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

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

  const handleCameraClick: React.MouseEventHandler<HTMLButtonElement> = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment" },
      });
      setMediaStream(stream);
      setIsModalOpen(true);
      setError("");
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

    // 카메라 스트림 정지
    if (mediaStream) {
      mediaStream.getTracks().forEach((track) => track.stop());
      setMediaStream(null);
    }
  };

  return (
    <>
      <button onClick={handleCameraClick} className="cursor-pointer">
        <CameraIcon className="text-green-600 transition-colors hover:text-green-700" />
      </button>

      <Modal isOpen={isModalOpen} onClose={handleClose}>
        <div className="flex flex-col items-center justify-center gap-5">
          {error ? (
            <span className="text-neutral-900">{error}</span>
          ) : (
            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted
              className="w-full max-w-md rounded-lg shadow-md"
            />
          )}

          <Button onClick={handleClose} variant={"primaryOutline"}>
            닫기
          </Button>
        </div>
      </Modal>
    </>
  );
}

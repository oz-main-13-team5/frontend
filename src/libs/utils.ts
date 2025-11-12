import useAuthStore from "@/hooks/stores/useAuthStore";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};

/**
 * File 객체를 Base64 Data URL로 변환하는 유틸 함수
 * @param file 변환할 File 객체
 * @returns Promise<string> 변환된 Data URL (ex: data:image/png;base64,...)
 */
export async function fileToDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onloadend = () => {
      if (reader.result) {
        resolve(reader.result as string);
      } else {
        reject(new Error("파일 변환 실패"));
      }
    };

    reader.onerror = () => reject(new Error("파일을 읽는 중 오류 발생"));
    reader.readAsDataURL(file);
  });
}

/**
 * 이미지 URL을 File 객체로 변환하는 유틸 함수
 * @param imageUrl 변환할 이미지의 URL
 * @param fileName 생성할 파일 이름 (기본값: "image.jpg")
 * @returns Promise<File>
 */
export async function urlToFile(imageUrl: string, fileName = "image.jpg"): Promise<File> {
  try {
    // URL에서 이미지 데이터 가져오기
    const response = await fetch(imageUrl);
    const blob = await response.blob();

    // MIME 타입 추출 (ex. "image/png")
    const mimeType = blob.type || "image/jpeg";

    // File 객체로 변환
    return new File([blob], fileName, { type: mimeType });
  } catch (error) {
    console.error("이미지 URL을 File로 변환하는 중 오류:", error);
    throw new Error("이미지를 불러올 수 없습니다.");
  }
}

/**
 * 이미지 파일 이름을 만드는 유틸 함수
 * 유저 닉네임 - 생성 날짜(연-월-일-시간-분) - image.jpg(png) 반환
 */
export const createImageName = (imageType: "jpg" | "png") => {
  const user = useAuthStore((state) => state.user);

  const nickname = user ? user.nickname : "anonymous";

  const date = new Date();
  const dateString = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}-${date.getHours()}-${date.getMinutes()}`;

  return `${nickname}-${dateString}-image.${imageType}`;
};

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

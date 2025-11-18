import { API_BASE_URL } from "@/constants/url-constants";
import { api } from "@/libs/axios";
import { useMutation, type UseMutationOptions } from "@tanstack/react-query";

interface PillImageSearchParams {
  image: File;
  filename: string;
}

export default function usePillImageSearch(
  options?: Omit<
    UseMutationOptions<unknown, Error, PillImageSearchParams>,
    "mutationFn" | "mutationKey"
  >
) {
  return useMutation({
    mutationKey: ["image", "search"],
    mutationFn: async ({ image, filename }) => {
      const formData = new FormData();

      formData.append("image_base64", image);
      formData.append("filename", filename);

      await api.post(`${API_BASE_URL}/pills/image`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
    },
    ...options,
  });
}

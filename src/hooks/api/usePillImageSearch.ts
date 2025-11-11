import { MSW_BASE_URL } from "@/constants/url-constants";
import { useMutation, type UseMutationOptions } from "@tanstack/react-query";
import axios from "axios";

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

      await axios.post(`${MSW_BASE_URL}/pills/image`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
    },
    ...options,
  });
}

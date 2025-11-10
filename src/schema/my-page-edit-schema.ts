import { nicknameSchema, passwordSchema } from "@/schema/auth-schema";
import z from "zod";

export const nicknameEditSchema = z.object({
  nickname: nicknameSchema,
});

export const passwordEditSchema = z
  .object({
    currentPassword: passwordSchema,
    newPassword: passwordSchema,
    confirmPassword: z.string().min(1, "비밀번호를 다시 입력해주세요."),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "비밀번호가 일치하지 않습니다",
  });

export type NicknameEditSchema = z.infer<typeof nicknameEditSchema>;
export type PasswordEditSchema = z.infer<typeof passwordEditSchema>;

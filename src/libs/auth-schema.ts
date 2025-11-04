import { z } from "zod";

// 이메일
export const emailSchema = z
  .string()
  .min(1, "이메일을 입력해주세요.")
  .email("이메일 형식 오류입니다.");

// 비밀번호
export const passwordSchema = z
  .string()
  .min(8, "비밀번호는 최소 8자 이상이어야 합니다.")
  .max(64, "비밀번호는 최대 64자까지 가능합니다.")
  .regex(/(?=.*[a-zA-Z])/, "영문을 포함해야 합니다.")
  .regex(/(?=.*\d)/, "숫자를 포함해야 합니다.")
  .regex(/(?=.*[!@#$%^&*(),.?":{}|<>])/, "특수문자를 포함해야 합니다.");

// 닉네임
export const nicknameSchema = z
  .string()
  .trim()
  .min(2, "닉네임은 2자 이상이어야 합니다.")
  .max(20, "닉네임은 20자 이하로 입력해주세요.")
  .regex(/^[가-힣a-zA-Z0-9]+$/, "닉네임은 한글, 영문, 숫자만 사용할 수 있습니다.");

// 인증코드
export const verificationCodeSchema = z
  .string()
  .length(6, "인증코드는 6자리여야 합니다.")
  .regex(/^\d+$/, "숫자만 입력해주세요.");

// 회원가입 스키마
export const signupSchema = z
  .object({
    email: emailSchema,
    verificationCode: verificationCodeSchema,
    nickname: nicknameSchema,
    password: passwordSchema,
    confirmPassword: z.string().min(1, "비밀번호를 다시 입력해주세요."),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "비밀번호가 일치하지 않습니다",
  });

export type SignupSchema = z.infer<typeof signupSchema>;

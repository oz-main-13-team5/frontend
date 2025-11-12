import Button from "@/components/common/Button";
import Input from "@/components/common/Input";
import { Link, useNavigate } from "react-router";
import { useForm, useWatch } from "react-hook-form";
import { signupSchema, type SignupSchema } from "@/schema/auth-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import type { SignUpApiErrorResponse } from "@/types/api-response-types/auth-response-types";
import type { AxiosError } from "axios";
import { useSendCodeMutation, useSignupMutation, useVerifyCodeMutation } from "@/hooks/api/auth";
import KakaoButton from "@/components/social-login-button/KakaoButton";
import GoogleButton from "@/components/social-login-button/GoogleButton";

const getApiError = (error: unknown) => {
  const axiosError = error as AxiosError<SignUpApiErrorResponse>;
  return axiosError?.response?.data?.error ?? null;
};

export default function SignUp() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
    control,
    getValues,
  } = useForm<SignupSchema>({
    resolver: zodResolver(signupSchema),
    mode: "onChange",
  });

  // 이메일 / 인증코드 실시간 감시 (버튼 색상 반응용)
  const email = useWatch({ control, name: "email" });
  const verificationCode = useWatch({ control, name: "verificationCode" });

  // 인증코드 전송 여부
  const [codeSent, setCodeSent] = useState(false);
  const [codeVerified, setCodeVerified] = useState(false);

  // 이메일 지워지면 인증 단계 리셋
  useEffect(() => {
    if (!email) {
      setCodeSent(false);
      setCodeVerified(false);
    }
  }, [email]);

  // 입력 유효성 검사
  const isEmailReady = !!email && !errors.email;
  const isCodeValid = /^\d{6}$/.test(verificationCode || "");

  // 인증하기 버튼 라벨 / 색상 상태 스위칭
  const btnVerifyLabel = codeVerified ? "인증완료" : codeSent ? "인증하기" : "코드전송";
  const btnVerifyColor = codeSent ? isCodeValid : isEmailReady;

  // TanStack Query mutations
  // 인증코드 전송
  const sendCode = useSendCodeMutation({
    onSuccess: () => {
      setCodeSent(true);
      console.log("인증코드 전송", getValues("email"));
    },
    onError: (error) => {
      const msg = getApiError(error) || "인증번호 전송 실패";
      setError("email", { message: msg });
    },
  });

  // 인증코드 확인
  const verifyCode = useVerifyCodeMutation({
    onSuccess: (res) => {
      if (res.verified) {
        setCodeVerified(true);
        console.log("인증 성공", getValues("email"));
      }
    },
    onError: (error) => {
      const msg = getApiError(error) ?? "인증코드가 일치하지 않습니다.";
      console.log("인증코드 오류", error);
      setError("verificationCode", { message: msg });
    },
  });

  // 회원가입
  const signup = useSignupMutation({
    onSuccess: () => {
      console.log("회원가입 성공");
      navigate("/login", { replace: true });
    },
    onError: (error) => {
      const axiosError = error as AxiosError<SignUpApiErrorResponse>;
      const status = axiosError?.response?.status ?? axiosError?.response?.data?.code;
      const msg = getApiError(error) ?? "회원가입 중 오류가 발생했습니다.";

      if (status === 400) {
        // 닉네임 중복은 고려하지 않음, 이메일에만 매핑
        setError("email", { message: msg });
      } else if (status === 500) {
        setError("email", { message: "서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요." });
      } else {
        setError("email", { message: msg });
      }
    },
  });

  // 인증코드 전송
  const handleSendVerifyCode = () => {
    if (!isEmailReady) return;
    sendCode.mutate({ email: getValues("email") });
  };

  // 인증코드 확인
  const handleVerifyCode = async () => {
    if (!isEmailReady || !isCodeValid) return;
    verifyCode.mutate({
      email: getValues("email"),
      auth_code: getValues("verificationCode"),
    });
  };

  // 회원가입 요청
  const onSubmit = async (data: SignupSchema) => {
    if (!codeVerified) {
      setError("verificationCode", {
        message: "이메일 인증을 먼저 진행해주세요.",
      });
      return;
    }
    signup.mutate({
      email: data.email,
      password: data.password,
      nickname: data.nickname,
    });
  };

  return (
    <div className="mx-auto flex w-full max-w-md flex-col justify-center gap-6 p-3 py-10 sm:py-20">
      <div className="grid gap-2">
        <p className="text-base text-neutral-900 sm:text-lg">이게뭐약 사용자 회원가입</p>
        <h2 className="text-4xl font-semibold text-neutral-900 sm:text-5xl">회원가입</h2>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="grid gap-5" noValidate>
        <Input
          label="이메일"
          type="email"
          placeholder="example@example.com"
          autoComplete="email"
          {...register("email")}
          errorMessage={errors.email?.message}
          inputClassName="h-14 p-4"
          className="flex-1"
        />

        <div className="flex justify-between gap-2">
          <Input
            label="인증코드"
            type="text"
            pattern="[0-9]*"
            inputMode="numeric"
            maxLength={6}
            placeholder="인증코드를 입력하세요."
            autoComplete="one-time-code"
            {...register("verificationCode")}
            errorMessage={errors.verificationCode?.message}
            inputClassName="h-14 p-4"
            className="flex-1"
          />
          <Button
            type="button"
            variant={btnVerifyColor ? "primary" : "neutral"}
            size="lg"
            onClick={codeSent ? handleVerifyCode : handleSendVerifyCode}
            className="mt-7 h-14"
          >
            {btnVerifyLabel}
          </Button>
        </div>

        <Input
          label="닉네임"
          type="text"
          placeholder="닉네임을 입력하세요."
          {...register("nickname")}
          errorMessage={errors.nickname?.message}
          inputClassName="h-14 p-4"
        />

        <Input
          label="비밀번호"
          type="password"
          placeholder="비밀번호를 입력하세요. (8자 이상)"
          autoComplete="new-password"
          {...register("password")}
          errorMessage={errors.password?.message}
          inputClassName="h-14 p-4"
        />

        <Input
          label="비밀번호 확인"
          type="password"
          placeholder="비밀번호를 다시 입력해주세요."
          autoComplete="new-password"
          {...register("confirmPassword")}
          errorMessage={errors.confirmPassword?.message}
          inputClassName="h-14 p-4"
        />

        <Button
          type="submit"
          variant={"primary"}
          size={"lg"}
          className="h-14 w-full"
          disabled={isSubmitting}
        >
          {isSubmitting ? "처리 중" : "회원가입"}
        </Button>

        <div className="grid gap-1">
          <p className="text-base text-neutral-900">아이디가 있다면?</p>
          <Link to="/login">
            <Button variant={"primaryOutline"} size={"lg"} className="h-14 w-full">
              로그인
            </Button>
          </Link>
        </div>

        <div className="flex gap-3">
          <GoogleButton />
          <KakaoButton />
        </div>
      </form>
    </div>
  );
}

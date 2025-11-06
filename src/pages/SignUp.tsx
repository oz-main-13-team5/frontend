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

const getApiError = (error: unknown) => {
  const axiosError = error as AxiosError<SignUpApiErrorResponse>;
  const msg = axiosError?.response?.data?.error;
  return msg ? msg : null;
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

  // TanStack Query mutations
  const sendCode = useSendCodeMutation();
  const verifyCode = useVerifyCodeMutation();
  const signup = useSignupMutation();

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

  // 인증코드 전송
  const handleSendVerifyCode = async () => {
    if (!isEmailReady) return;
    const currentEmail = getValues("email");

    try {
      await sendCode.mutateAsync({ email: currentEmail });
      setCodeSent(true);
      console.log("인증코드가 전송되었습니다.");
    } catch (error) {
      const msg = getApiError(error) || "인증번호 전송 실패";
      setError("email", { message: msg });
    }
  };

  // 인증코드 확인
  const handleVerifyCode = async () => {
    if (!isEmailReady || !isCodeValid) return;
    const email = getValues("email");
    const code = getValues("verificationCode");

    try {
      const res = await verifyCode.mutateAsync({ email, auth_code: code });
      if (res?.verified) {
        setCodeVerified(true);
        console.log("인증 성공");
      }
    } catch (error) {
      const msg = getApiError(error) ?? "인증코드가 일치하지 않습니다.";
      setError("verificationCode", { message: msg });
    }
  };

  // 회원가입 요청
  const onSubmit = async (data: SignupSchema) => {
    if (!codeVerified) {
      setError("verificationCode", {
        message: "이메일 인증을 먼저 진행해주세요.",
      });
      return;
    }

    try {
      await signup.mutateAsync({
        email: data.email,
        password: data.password,
        nickname: data.nickname,
      });
      console.log("회원가입 성공");
      navigate("/login", { replace: true });
    } catch (error) {
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
    }
  };

  return (
    <div className="mx-auto flex w-full max-w-md flex-col justify-center gap-6 pt-10 pb-10">
      <div className="grid gap-2">
        <p className="text-lg text-neutral-900">이게뭐약 사용자 회원가입</p>
        <h2 className="text-5xl font-semibold text-neutral-900">회원가입</h2>
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
          <Link
            to="/login"
            className="inline-flex h-14 w-full items-center justify-center rounded-lg border border-green-600 bg-neutral-50 px-6 py-3 text-lg text-neutral-900 transition-colors hover:bg-neutral-200 focus:outline-none disabled:saturate-50"
          >
            로그인
          </Link>
        </div>

        <div className="flex gap-3">
          <button
            type="button"
            className="relative flex h-14 flex-1 cursor-pointer items-center justify-center gap-6 rounded-xl border border-[#DADCE0] bg-white p-2 transition hover:bg-neutral-50 active:bg-neutral-100"
          >
            <img src="/social-icons/google.svg" alt="google login" className="absolute left-4" />
            <span className="font-roboto ml-7 text-sm font-medium text-neutral-700">
              Google 계정으로 로그인
            </span>
          </button>
          <button
            type="button"
            className="relative flex h-14 flex-1 cursor-pointer items-center justify-center gap-6 rounded-xl bg-[#FEE500] p-2 transition hover:bg-[#F7D700] active:bg-[#E6C600]"
          >
            <img
              src="/social-icons/kakao.svg"
              alt="kakao login"
              className="absolute left-4 h-5 w-5"
            />
            <span className="ml-6 text-sm font-medium text-neutral-900">카카오 로그인</span>
          </button>
        </div>
      </form>
    </div>
  );
}

import Button from "@/components/common/Button";
import Input from "@/components/common/Input";
import Loading from "@/components/common/Loading";
import GoogleButton from "@/components/social-login-button/GoogleButton";
import KakaoButton from "@/components/social-login-button/KakaoButton";
import { useLoginMutation } from "@/hooks/api/auth";
import useAuthStore from "@/hooks/stores/useAuthStore";
import { loginSchema, type LoginSchema } from "@/schema/auth-schema";
import type { LoginApiErrorResponse } from "@/types/api-response-types/auth-response-types";
import { zodResolver } from "@hookform/resolvers/zod";
import type { AxiosError } from "axios";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";

const getApiError = (error: unknown) => {
  const axiosError = error as AxiosError<LoginApiErrorResponse>;
  return axiosError?.response?.data?.error ?? null;
};

export default function Login() {
  const navigate = useNavigate();
  const setAuth = useAuthStore((state) => state.setAuth);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    mode: "onChange",
  });

  // TanStack Query mutations 로그인
  const login = useLoginMutation({
    onSuccess: (data) => {
      // 로그인 성공 시, 유저 정보와 엑세스 토근을 전역 상태에 저장
      setAuth({
        user: data.user,
        accessToken: data.tokens.access_token,
      });
      navigate("/", { replace: true });
    },
    onError: (error) => {
      const axiosError = error as AxiosError<LoginApiErrorResponse>;
      const status = axiosError?.response?.status ?? axiosError?.response?.data?.code;
      const msg = getApiError(error) ?? "로그인 중 오류가 발생했습니다.";

      if (status === 400 || status === 401) {
        setError("email", { message: "이메일 또는 비밀번호를 확인해주세요." });
      } else if (status === 500) {
        setError("email", { message: "서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요." });
      } else {
        setError("email", { message: msg });
      }
    },
  });

  // 로그인 요청
  const onSubmit = (data: LoginSchema) => {
    login.mutate(data);
  };

  const handleGoogleLogin = () => {
    // TODO: 구글 로그인 로직
  };

  const handleKakaoLogin = () => {
    // TODO: 카카오 로그인 로직
  };

  return (
    <div className="mx-auto flex w-full max-w-md flex-col justify-center gap-6 p-3 py-10 sm:py-20">
      <div className="grid gap-2">
        <p className="text-base text-neutral-900 sm:text-lg">이게뭐약 사용자 로그인</p>
        <h2 className="text-4xl font-semibold text-neutral-900 sm:text-5xl">로그인</h2>
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
        />

        <Input
          type="password"
          label="비밀번호"
          placeholder="비밀번호를 입력하세요. (8자 이상)"
          autoComplete="current-password"
          {...register("password")}
          errorMessage={errors.password?.message}
          inputClassName="h-14 p-4"
        />

        <Button
          type="submit"
          variant={"primary"}
          size={"lg"}
          className="h-14 w-full"
          disabled={isSubmitting || login.isPending}
        >
          {isSubmitting || login.isPending ? <Loading /> : "로그인"}
        </Button>

        <div className="grid gap-1">
          <p className="text-base text-neutral-900">아이디가 없다면?</p>
          <Link to="/sign-up">
            <Button variant={"primaryOutline"} size={"lg"} className="h-14 w-full">
              회원가입
            </Button>
          </Link>
        </div>

        <div className="flex gap-3">
          <GoogleButton onClick={handleGoogleLogin} />
          <KakaoButton onClick={handleKakaoLogin} />
        </div>
      </form>
    </div>
  );
}

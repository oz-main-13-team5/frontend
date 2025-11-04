import Button from "@/components/common/Button";
import Input from "@/components/common/Input";
import { Link } from "react-router";

export default function Login() {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // TODO: 로그인 요청 로직
  };

  const handleGoogleLogin = () => {
    // TODO: 구글 로그인 로직
  };

  const handleKakaoLogin = () => {
    // TODO: 카카오 로그인 로직
  };

  return (
    <div className="mx-auto flex w-full max-w-md flex-col justify-center gap-6 pt-20">
      <div className="grid gap-2">
        <p className="text-lg text-neutral-900">이게뭐약 사용자 로그인</p>
        <h2 className="text-5xl text-neutral-900">로그인</h2>
      </div>

      <form onSubmit={handleSubmit} className="grid gap-5">
        <Input
          label="이메일"
          type="email"
          placeholder="example@example.com"
          autoComplete="email"
          required
          errorMessage="이메일 형식을 지켜주세요."
        />
        <Input
          type="password"
          label="비밀번호"
          placeholder="비밀번호를 입력하세요."
          minLength={10}
          required
          errorMessage="비밀번호를 10자리 이상 입력해주세요."
        />
        <Button type="submit" variant={"primary"} size={"lg"} className="w-full">
          로그인
        </Button>
        <div>
          <p>아이디가 없다면?</p>
          <Link
            to="/sign-up"
            className="inline-flex w-full items-center justify-center rounded-lg border border-green-600 bg-neutral-50 px-6 py-3 text-lg text-neutral-900 transition-colors hover:bg-neutral-200 focus:outline-none disabled:saturate-50"
          >
            회원가입
          </Link>
        </div>

        <div className="flex gap-3">
          <Button
            type="button"
            variant={"neutralOutline"}
            size={"lg"}
            className="flex-1"
            onClick={handleGoogleLogin}
          >
            구글 로그인
          </Button>
          <Button
            type="button"
            variant={"neutralOutline"}
            size={"lg"}
            className="flex-1"
            onClick={handleKakaoLogin}
          >
            카카오 로그인
          </Button>
        </div>
      </form>
    </div>
  );
}

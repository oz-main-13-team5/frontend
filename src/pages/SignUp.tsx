import Button from "@/components/common/Button";
import Input from "@/components/common/Input";
import { Link } from "react-router";

export default function SignUp() {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // TODO: 회원가입 요청 로직
  };

  const handleVerifyCode = () => {
    // TODO: 인증코드 검증
  };

  return (
    <div className="mx-auto flex w-full max-w-md flex-col justify-center gap-6 pt-10 pb-10">
      <div className="grid gap-2">
        <p className="text-lg text-neutral-900">이게뭐약 사용자 회원가입</p>
        <h2 className="text-5xl font-semibold text-neutral-900">회원가입</h2>
      </div>

      <form onSubmit={handleSubmit} className="grid gap-5">
        <Input
          label="이메일"
          type="email"
          placeholder="example@example.com"
          autoComplete="email"
          required
          inputClassName="h-14 p-4"
          className="flex-1"
        />
        <div className="flex justify-between gap-2">
          <Input
            label="인증코드"
            type=""
            placeholder="인증코드를 입력하세요."
            autoComplete="one-time-code"
            required
            inputClassName="h-14 p-4"
            className="flex-1"
          />
          <Button
            type="button"
            variant={"neutral"}
            size="lg"
            onClick={handleVerifyCode}
            className="mt-7 h-14"
          >
            인증하기
          </Button>
        </div>
        <Input
          label="닉네임"
          type="text"
          placeholder="닉네임을 입력하세요."
          autoComplete="nickname"
          minLength={2}
          required
          inputClassName="h-14 p-4"
        />
        <Input
          label="비밀번호"
          type="password"
          placeholder="비밀번호를 입력하세요. (10자 이상)"
          autoComplete="new-password"
          minLength={10}
          required
          inputClassName="h-14 p-4"
        />
        <Input
          label="비밀번호 확인"
          type="password"
          placeholder="비밀번호를 다시 입력해주세요."
          autoComplete="new-password"
          minLength={10}
          required
          inputClassName="h-14 p-4"
        />
        <Button type="submit" variant={"primary"} size={"lg"} className="h-14 w-full">
          회원가입
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
          <Button
            type="button"
            variant={"neutralOutline"}
            size={"lg"}
            className="h-14 flex-1"
            // onClick={}
          >
            구글 회원가입
          </Button>
          <Button
            type="button"
            variant={"neutralOutline"}
            size={"lg"}
            className="h-14 flex-1"
            // onClick={}
          >
            카카오 회원가입
          </Button>
        </div>
      </form>
    </div>
  );
}

import kakaoImage from "@/assets/images/social-icons/kakao.svg";
import { kakaoLogin } from "@/hooks/api/social-login/useKakaoAuth";

export default function KakaoButton() {
  return (
    <button
      type="button"
      onClick={kakaoLogin}
      className="relative flex h-14 flex-1 cursor-pointer items-center justify-center rounded-xl bg-[#FEE500] p-2 transition hover:bg-[#F7D700] active:bg-[#E6C600]"
    >
      <img src={kakaoImage} alt="kakao login" className="absolute left-4 h-5 w-5" />
      <span className="ml-6 text-sm font-medium text-neutral-900">카카오 로그인</span>
    </button>
  );
}

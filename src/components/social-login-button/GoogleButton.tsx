import googleImage from "@/assets/images/social-icons/google.svg";
import { googleLogin } from "@/hooks/api/social-login/useGoogleAuth";

export default function GoogleButton() {
  return (
    <button
      type="button"
      onClick={googleLogin}
      className="relative flex h-14 flex-1 cursor-pointer items-center justify-center gap-6 rounded-xl border border-[#DADCE0] bg-white p-2 transition hover:bg-neutral-50 active:bg-neutral-100"
    >
      <img src={googleImage} alt="google login" className="absolute left-4" />
      <span className="ml-7 text-sm font-medium text-neutral-700">Google 계정으로 로그인</span>
    </button>
  );
}

export default function GoogleButton({ onClick }: { onClick?: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="relative flex h-14 flex-1 cursor-pointer items-center justify-center gap-6 rounded-xl border border-[#DADCE0] bg-white p-2 transition hover:bg-neutral-50 active:bg-neutral-100"
    >
      <img src="/social-icons/google.svg" alt="google login" className="absolute left-4" />
      <span className="ml-7 text-sm font-medium text-neutral-700">Google 계정으로 로그인</span>
    </button>
  );
}

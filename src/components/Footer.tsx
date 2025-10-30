export default function Footer() {
  return (
    <footer className="flex justify-center bg-neutral-100">
      <div className="grid w-full max-w-[1440px] gap-6 px-4 py-6">
        <h2 className="text-lg text-neutral-900">이건뭐약</h2>
        <ul className="flex gap-6 text-sm text-neutral-900">
          <li className="hover:underline">개인정보처리방침</li>
          <li className="hover:underline">이용약관</li>
        </ul>
        <p className="text-sm text-neutral-500">
          © 2025 OZ Main Project 5팀. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

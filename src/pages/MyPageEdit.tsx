import Tab from "@/components/common/Tab";
import NicknameEditForm from "@/components/my-page/edit/NicknameEditForm";
import PasswordEditForm from "@/components/my-page/edit/PasswordEditForm";
import { useAuthStore } from "@/hooks/stores/useAuthStore";
import { useEffect, useState } from "react";

export default function MyPageEdit() {
  const [isSocialLogin, setIsSocialLogin] = useState(true);

  const user = useAuthStore((state) => state.user);

  useEffect(() => {
    if (user && user.provider) {
      setIsSocialLogin(false);
    }
  }, [user]);

  return (
    <div className="flex justify-center p-5">
      <div className="flex w-full flex-col items-center justify-start sm:max-w-96 sm:justify-center">
        <div className="mb-10 flex w-full flex-col items-start justify-center gap-2 sm:items-center">
          <span className="text-lg text-neutral-900">이게뭐약 사용자 회원 정보 수정</span>
          <h1 className="text-5xl font-semibold">내 정보 수정</h1>
        </div>

        {isSocialLogin ? (
          <NicknameEditForm />
        ) : (
          <Tab
            items={[
              { key: "nickname", label: "닉네임 수정", content: <NicknameEditForm /> },
              { key: "password", label: "비밀번호 수정", content: <PasswordEditForm /> },
            ]}
            className="mb-5 w-full"
          />
        )}
      </div>
    </div>
  );
}

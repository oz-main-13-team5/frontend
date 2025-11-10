import Button from "@/components/common/Button";
import Input from "@/components/common/Input";
import Tab from "@/components/common/Tab";
import Modal from "@/components/Modal";
import PillListItem from "@/components/PillListItem";
import { DELETE_ACCOUNT_CONFIRM_TEXT } from "@/constants/api-constants";
import { useDeleteAccount } from "@/hooks/api/auth";
import useBookmarkList from "@/hooks/api/my-page/useBookmarkList";
import useAuthStore from "@/hooks/stores/useAuthStore";
import { useState } from "react";
import { Link, useNavigate } from "react-router";

export default function Mypage() {
  const { data } = useBookmarkList();
  const bookmarkedPills = data?.pills ?? [];
  const { user, clearAuth } = useAuthStore();
  const navigate = useNavigate();

  // 회원 탈퇴 모달 여부 및 입력값 상태
  const [open, setOpen] = useState(false);
  const [confirmText, setConfirmText] = useState("");

  // TanStack Query mutations 회원탈퇴
  const { mutate: deleteAccount, isPending } = useDeleteAccount({
    onSuccess: () => {
      clearAuth();
      navigate("/", { replace: true });
    },
  });

  const canDelete = confirmText === DELETE_ACCOUNT_CONFIRM_TEXT;

  return (
    <div className="flex w-full justify-center gap-5 pt-10 sm:pt-20">
      <div className="flex w-full max-w-[1440px] flex-col items-start sm:flex-row">
        {/* 유저 프로필 */}
        <div className="grid w-full gap-2 px-10 text-center sm:w-auto">
          <p className="text-2xl font-medium text-neutral-900">{user?.nickname ?? "이건뭐약"}</p>
          <p className="text-sm text-neutral-500"> {`${user?.nickname ?? "회원"}님 환영합니다.`}</p>
          <p className="text-md text-neutral-500">{user?.email ?? "이메일"}</p>
          <div className="flex gap-2 pt-5">
            <Link to="/my-page/edit" className="flex-1 sm:flex-none">
              <Button variant={"primary"} size={"lg"} className="h-14 w-full sm:w-auto">
                내 정보 수정
              </Button>
            </Link>
            <div className="flex-1 sm:flex-none">
              <Button
                variant={"primaryOutline"}
                size={"lg"}
                className="h-14 w-full sm:w-auto"
                onClick={() => {
                  setConfirmText("");
                  setOpen(true);
                }}
              >
                회원 탈퇴
              </Button>
            </div>
          </div>
        </div>

        {/* 리스트 렌더링 */}
        <div className="w-full flex-1 px-3 sm:px-5">
          <h2 className="pt-10 pb-5 text-2xl font-medium text-neutral-900 sm:pt-0 sm:text-5xl sm:font-semibold">
            북마크 목록
          </h2>
          <div className="flex flex-col items-center justify-center gap-3 sm:gap-10">
            <Tab
              className="w-full max-w-[640px] rounded-4xl p-1"
              items={[
                {
                  key: "bookmark",
                  label: "북마크",
                  content: (
                    <div className="grid w-full gap-5">
                      {bookmarkedPills.length === 0 && (
                        <p className="text-center text-neutral-500">북마크된 약이 없습니다.</p>
                      )}
                      {bookmarkedPills.map((pill) => (
                        <PillListItem key={pill.item_seq} pill={pill} />
                      ))}
                    </div>
                  ),
                  activeClassName: "rounded-2xl",
                },
                {
                  key: "image-search",
                  label: "이미지 검색",
                  content: (
                    <div>
                      <p>이미지 검색</p>
                      {/* 이미지 검색 리스트 */}
                    </div>
                  ),
                  activeClassName: "rounded-2xl",
                },
              ]}
            />
          </div>
        </div>
      </div>

      <Modal
        isOpen={open}
        onClose={() => {
          setOpen(false);
        }}
        title="회원 탈퇴"
        description="탈퇴 시, 계정과 모든 데이터가 삭제되며 복구할 수 없습니다."
        className="text-left sm:w-[60%]"
      >
        <p className="text-md -mt-4 text-neutral-900">그래도 계속 진행하시겠습니까?</p>
        <p className="text-md text-neutral-900">
          <span className="font-semibold">"{DELETE_ACCOUNT_CONFIRM_TEXT}"</span>라고 입력해주세요.
        </p>

        <Input
          type="text"
          placeholder={DELETE_ACCOUNT_CONFIRM_TEXT}
          inputClassName="h-14 p-4"
          value={confirmText}
          onChange={(e) => setConfirmText(e.target.value)}
        />
        <div className="flex justify-end gap-2 pt-10">
          <Button
            variant="neutral"
            size="lg"
            onClick={() => setOpen(false)}
            className="h-14 flex-1"
          >
            취소
          </Button>
          <Button
            variant="primary"
            size="lg"
            className="h-14 flex-1"
            disabled={!canDelete || isPending}
            onClick={() => deleteAccount()}
          >
            {isPending ? "탈퇴 중" : "탈퇴하기"}
          </Button>
        </div>
      </Modal>
    </div>
  );
}

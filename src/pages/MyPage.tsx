import Button from "@/components/common/Button";
import Tab from "@/components/common/Tab";
import PillListItem from "@/components/PillListItem";
import useBookmarkList from "@/hooks/api/my-page/useBookmarkList";
import useAuthStore from "@/hooks/stores/useAuthStore";
import { Link } from "react-router";

export default function Mypage() {
  const { data } = useBookmarkList();
  const bookmarkedPills = data?.pills ?? [];
  const { user } = useAuthStore();

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
              <Button variant={"primaryOutline"} size={"lg"} className="h-14 w-full sm:w-auto">
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
    </div>
  );
}

import Button from "@/components/common/Button";
import Tab from "@/components/common/Tab";
import { Link } from "react-router";

export default function Mypage() {
  return (
    <div className="flex w-full justify-center gap-5 pt-10 sm:pt-20">
      <div className="flex w-full max-w-[1440px] flex-col items-start gap-10 sm:flex-row">
        {/* 유저 프로필 */}
        <div className="grid w-full gap-2 px-10 text-center sm:w-auto">
          <p className="text-2xl font-medium text-neutral-900">이건뭐약</p>
          <p className="text-sm text-neutral-500">회원님 환영합니다.</p>
          <p className="text-md text-neutral-500">유저 이메일</p>
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
        <div className="w-full flex-1 px-3 sm:px-0">
          <h2 className="pb-5 text-2xl font-medium text-neutral-900 sm:text-5xl sm:font-semibold">
            북마크 목록
          </h2>
          <div className="flex flex-col items-center justify-center">
            <Tab
              className="w-full max-w-[640px] rounded-4xl p-1"
              items={[
                {
                  key: "bookmark",
                  label: "북마크",
                  content: (
                    <div>
                      <p>북마크</p>
                      {/* 북마크 리스트 */}
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

import Button from "@/components/common/Button";
import Input from "@/components/common/Input";
import { cn } from "@/libs/utils";

interface NicknameEditFormProps {
  className?: string;
}

export default function NicknameEditForm({ className }: NicknameEditFormProps) {
  return (
    <form className={cn("flex w-full flex-col gap-5", className)}>
      <Input inputClassName="p-4" placeholder="닉네임을 입력하세요." label="닉네임 변경" />
      <Button className="p-4">닉네임 수정하기</Button>
    </form>
  );
}

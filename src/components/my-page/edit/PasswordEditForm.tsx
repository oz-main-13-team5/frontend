import Button from "@/components/common/Button";
import Input from "@/components/common/Input";
import { cn } from "@/libs/utils";

interface PasswordEditFormProps {
  className?: string;
}

export default function PasswordEditForm({ className }: PasswordEditFormProps) {
  return (
    <form className={cn("flex w-full flex-col gap-5", className)}>
      <Input placeholder="비밀번호를 입력하세요." label="현재 비밀번호" inputClassName="p-4" />
      <Input placeholder="새 비밀번호를 입력하세요." label="새 비밀번호" inputClassName="p-4" />
      <Input
        placeholder="비밀번호를 한번 더 입력하세요."
        label="새 비밀번호 확인"
        inputClassName="p-4"
      />
      <Button className="p-4">비밀번호 수정하기</Button>
    </form>
  );
}

import Button from "@/components/common/Button";
import Input from "@/components/common/Input";
import Loading from "@/components/common/Loading";
import { usePasswordEdit } from "@/hooks/api/my-page";
import { cn } from "@/libs/utils";
import { passwordEditSchema, type PasswordEditSchema } from "@/schema/my-page-edit-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { AxiosError } from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";

interface PasswordEditFormProps {
  className?: string;
}

export default function PasswordEditForm({ className }: PasswordEditFormProps) {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<PasswordEditSchema>({
    resolver: zodResolver(passwordEditSchema),
  });

  const [error, setError] = useState("");

  const navigate = useNavigate();

  const { mutate, isPending } = usePasswordEdit({
    onSuccess: () => {
      navigate("/my-page");
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        if (error.status === 400) {
          setError("올바른 폼을 제출해주세요.");
        } else if (error.status === 500) {
          setError("서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.");
        } else {
          setError("알 수 없는 에러가 발생했습니다. 잠시후 다시 시도해주세요.");
        }
      } else {
        setError("알 수 없는 에러가 발생했습니다. 잠시후 다시 시도해주세요.");
      }
    },
  });

  const onSubmit = (form: PasswordEditSchema) => {
    mutate(form);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={cn("flex w-full flex-col gap-5", className)}>
      <Input
        placeholder="비밀번호를 입력하세요."
        label="현재 비밀번호"
        inputClassName="p-4"
        type="password"
        errorMessage={errors.currentPassword?.message}
        {...register("currentPassword")}
      />
      <Input
        placeholder="새 비밀번호를 입력하세요."
        label="새 비밀번호"
        inputClassName="p-4"
        type="password"
        errorMessage={errors.newPassword?.message}
        {...register("newPassword")}
      />
      <Input
        placeholder="비밀번호를 한번 더 입력하세요."
        label="새 비밀번호 확인"
        inputClassName="p-4"
        type="password"
        errorMessage={errors.confirmPassword?.message}
        {...register("confirmPassword")}
      />
      <Button type="submit" className="flex items-center justify-center p-4" disabled={isPending}>
        {isPending ? <Loading /> : "비밀번호 수정하기"}
      </Button>
      <span className="text-sm text-red-500">{error}</span>
    </form>
  );
}

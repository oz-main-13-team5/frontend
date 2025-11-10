import Button from "@/components/common/Button";
import Input from "@/components/common/Input";
import { useNicknameEdit } from "@/hooks/api/my-page";
import { cn } from "@/libs/utils";
import { nicknameEditSchema, type NicknameEditSchema } from "@/schema/my-page-edit-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { AxiosError } from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";

interface NicknameEditFormProps {
  className?: string;
}

export default function NicknameEditForm({ className }: NicknameEditFormProps) {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<NicknameEditSchema>({
    resolver: zodResolver(nicknameEditSchema),
  });

  const [error, setError] = useState("");

  const navigate = useNavigate();

  const { mutate, isPending } = useNicknameEdit({
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

  const onSubmit = (form: NicknameEditSchema) => {
    mutate(form);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={cn("flex w-full flex-col gap-5", className)}>
      <Input
        inputClassName="p-4"
        placeholder="닉네임을 입력하세요."
        label="닉네임 변경"
        errorMessage={errors.nickname?.message}
        {...register("nickname")}
      />
      <Button type="submit" className="p-4" disabled={isPending}>
        {isPending ? "닉네임을 수정 중입니다." : "닉네임 수정하기"}
      </Button>
      <span className="text-sm text-red-500">{error}</span>
    </form>
  );
}

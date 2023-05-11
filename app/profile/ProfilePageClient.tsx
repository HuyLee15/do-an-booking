"use client";

import Button from "@/app/components/Button";
import Container from "@/app/components/Container";
import EyeIcon from "@/app/components/icons/Eye";
import ImageUpload from "@/app/components/inputs/ImageUpload";
import Input from "@/app/components/inputs/Input";
import { SafeUser } from "@/app/types";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm, FieldValues, SubmitHandler } from "react-hook-form";
import toast from "react-hot-toast";

interface ProfilePageClientProps {
  currentUser: SafeUser;
}

const ProfilePageClient = ({ currentUser }: ProfilePageClientProps) => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isDirty },
    reset,
  } = useForm<FieldValues>({
    defaultValues: {
      name: currentUser.name,
      phoneNumber: currentUser.phoneNumber,
      image: currentUser.image,
    },
  });

  const [isLoading, setIsLoading] = useState(false);

  const setCustomValue = (id: string, value: any) => {
    setValue(id, value, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    });
  };
  console.log(watch("image"));

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);

    axios
      .put("/api/me", data)
      .then(() => {
        toast.success("Updated information!");
        router.refresh();
        reset(data);
      })
      .catch(() => {
        toast.error("Something went wrong.");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <Container>
      <div className="max-w-[500px] flex flex-col justify-center gap-5 mx-auto mt-12">
        <div className="flex justify-between items-center">
          <span className="font-bold text-3xl text-[#484848]">Personal Information</span>
          <EyeIcon />
        </div>
        <hr />
        <Input id="name" label="Name" register={register} errors={errors} required />
        <Input id="phoneNumber" label="Phone number" type="number" register={register} errors={errors} required />
        <hr />
        <span className="text-[#484848] font-[500]">Avatar:</span>
        <div className="w-[70%] mx-auto">
          <ImageUpload onChange={(value) => setCustomValue("image", value)} value={watch("image")} />
        </div>
        <Button label="Update" disabled={!isDirty || isLoading} onClick={handleSubmit(onSubmit)} />
      </div>
    </Container>
  );
};

export default ProfilePageClient;

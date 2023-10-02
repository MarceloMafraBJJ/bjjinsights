"use client";

import { User } from "@/types";
import Image from "next/image";
import React from "react";
import { Button } from "../shared";
import { SocialIcon } from "react-social-icons";
import { useRouter } from "next/navigation";

const MeetCard = ({ user }: { user: User }) => {
  const router = useRouter();

  const isNewUser = () => {
    const currentDate = new Date();
    const createdAt = new Date(user.createdAt);
    const timeDifferenceInMillis = currentDate.getTime() - createdAt.getTime();
    const daysDifference = timeDifferenceInMillis / (1000 * 60 * 60 * 24);
    return daysDifference <= 3;
  };

  return (
    <div className="relative flex h-[280px] max-w-max items-end justify-end">
      <div className="flex h-[180px] w-[300px] flex-col items-center justify-start space-y-2 rounded-md bg-secondary py-10 shadow-md">
        <div className="absolute top-0 z-40 h-36 w-36">
          <Image
            src={user?.image!}
            alt="user image"
            fill
            className="rounded-full border-2 border-emerald-500 p-1 dark:border-emerald-500"
          />
        </div>

        <div>
          <h1 className="text-center text-xl font-semibold tracking-wider">
            {user?.name?.substring(0, 22)}
            {user?.name?.length! > 22 && ".."}
          </h1>

          {user?.location && (
            <div className="flex items-center justify-center">
              📍 {user.location.city} - {user.location.uf}
            </div>
          )}
        </div>

        <div className="absolute bottom-5 flex w-full items-center justify-center space-x-2">
          <Button
            onClick={() => router.push(`/profile/?email=${user.email}`)}
            className={`bg-emerald-500 font-bold ${
              !user?.youtube && !user?.instagram ? "w-[80%]" : null
            }`}
          >
            Ver Perfil
          </Button>

          <div className="flex space-x-3">
            {user?.instagram && (
              <Button className="rounded-full border border-emerald-500 bg-transparent p-1">
                <SocialIcon
                  url={user?.instagram}
                  className="!h-8 !w-8"
                  target="_blank"
                />
              </Button>
            )}
            {user?.youtube && (
              <Button className="rounded-full border border-emerald-500 bg-transparent p-1">
                <SocialIcon
                  url={user?.youtube}
                  className="!h-8 !w-8"
                  target="_blank"
                />
              </Button>
            )}
          </div>
        </div>

        {isNewUser() && (
          <span className="absolute left-8 top-6 z-50 rounded-md bg-emerald-500 px-4 py-2 text-sm font-semibold uppercase text-white">
            novo
          </span>
        )}
      </div>
    </div>
  );
};

export default MeetCard;

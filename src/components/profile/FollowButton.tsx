"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { Button } from "../shared";
import { RocketLaunchIcon } from "@heroicons/react/24/solid";

const FollowButton = ({
  userIdToFollow,
  currentUserId,
  isFollowing,
}: {
  userIdToFollow: string;
  currentUserId: string;
  isFollowing: boolean;
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const { status } = useSession();
  const router = useRouter();

  const handleFollow = async () => {
    setIsLoading(true);

    if (status == "unauthenticated") {
      return toast.error("Você precisa estar logado para seguir um usuário.");
    }

    try {
      const response = await fetch("/api/user/follow", {
        method: "POST",
        body: JSON.stringify({ userIdToFollow, currentUserId }),
      });

      if (response.ok) {
        router.refresh();
      } else {
        console.error("Failed to follow user");
      }
    } catch (error) {
      console.error("Error while following/unfollowing user:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      className={`w-full font-semibold uppercase tracking-widest md:w-[250px]`}
      onClick={handleFollow}
      disabled={isLoading}
    >
      {!isLoading ? (
        isFollowing ? (
          "Seguindo"
        ) : (
          "Seguir"
        )
      ) : (
        <svg
          className="mx-auto h-5 w-5 animate-spin text-white"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            stroke-width="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>
      )}
    </Button>
  );
};

export default FollowButton;

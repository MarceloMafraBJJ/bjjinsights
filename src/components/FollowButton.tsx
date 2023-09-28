"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

const FollowButton = ({
  userIdToFollow,
  currentUserId,
  isFollowing,
}: {
  userIdToFollow: string;
  currentUserId: string;
  isFollowing: boolean;
}) => {
  const { status } = useSession();
  const router = useRouter();

  const handleFollow = async () => {
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
    }
  };

  return (
    <button
      onClick={handleFollow}
      className={`w-full rounded-md bg-accent py-[10px] font-semibold uppercase tracking-widest dark:bg-accent_secondary
      `}
    >
      {isFollowing ? "Seguindo" : "Seguir"}
    </button>
  );
};

export default FollowButton;

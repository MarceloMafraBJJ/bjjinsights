"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { Button } from "../shared";

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
      {isFollowing ? "Seguindo" : "Seguir"}
    </Button>
  );
};

export default FollowButton;

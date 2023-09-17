"use client";

import { fetcher } from "@/constants";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import useSWR from "swr";

const LikeButton = ({ postId }: { postId: string }) => {
  const router = useRouter();
  const { data, status } = useSession();

  const { data: likeData, mutate } = useSWR(
    `http://localhost:3000/api/posts/like?postId=${postId}&userEmail=${data?.user?.email}`,
    fetcher,
  );

  const handleLike = async () => {
    if (status == "unauthenticated") {
      return toast.error("Você precisa estar logado para curtir um post.");
    }

    try {
      const response = await fetch("/api/posts/like", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ postId, userEmail: data?.user?.email }),
      });

      if (response.ok) {
        mutate();
        router.refresh();
      } else {
        console.error("Failed to like/unlike post");
      }
    } catch (error) {
      console.error("Error while liking/unliking post:", error);
    }
  };

  return (
    <button onClick={handleLike}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className={`h-6 w-6 ${
          likeData ? "fill-red-500 text-red-500" : "fill-white "
        }`}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
        />
      </svg>
    </button>
  );
};

export default LikeButton;

"use client";

import { useState } from "react";
import { signIn, useSession } from "next-auth/react";
import Image from "next/image";
import { toast } from "react-hot-toast";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline";
import useSWR from "swr";

import { apiUrl, fetcher } from "@/constants";
import Button from "../shared/Button";
import { Pagination } from "../shared";
import { Comment } from "@/types";

const Comments = ({ postSlug, page }: { postSlug: string; page: number }) => {
  const [desc, setDesc] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [editCommentId, setEditCommentId] = useState("");

  const { data: UserData, status } = useSession();

  const { data, mutate, isLoading } = useSWR(
    `${apiUrl}/api/comments?postSlug=${postSlug}&page=${page}`,
    fetcher,
  );

  const comments = data?.comments as Comment[];
  const count = data?.count as number;

  const COMMENT_PER_PAGE = 10;
  const hasPrev = COMMENT_PER_PAGE * (page - 1) > 1;
  const hasNext = COMMENT_PER_PAGE * (page - 1) + COMMENT_PER_PAGE < count;

  const handleSubmit = async () => {
    if (!desc) {
      return toast.error("Escreva algo para comentar.");
    }

    if (!isEditing) {
      await fetch("/api/comments", {
        method: "POST",
        body: JSON.stringify({ desc, postSlug }),
      });
    } else if (isEditing) {
      await fetch(`/api/comments?id=${editCommentId}`, {
        method: "PATCH",
        body: JSON.stringify({
          desc,
        }),
      });
    }

    setIsEditing(false);
    setDesc("");
    mutate();
  };

  const handleDelete = async (id: string) => {
    await fetch(`/api/comments?id=${id}`, {
      method: "DELETE",
    });

    mutate();
  };

  const handleEdit = (desc: string, id: string) => {
    setIsEditing(!isEditing);

    if (!isEditing) {
      setDesc(desc);
      setEditCommentId(id);
    } else {
      setDesc("");
    }
  };

  return (
    <div className="mt-12">
      <h1 className="mb-3 text-2xl font-semibold text-default_text">
        Comentários
      </h1>

      {status === "authenticated" ? (
        <div className="mt-8 flex max-w-[800px] flex-col gap-8 md:flex-row md:justify-between">
          <textarea
            placeholder="Escreva um comentário..."
            className="h-[100px] w-full resize-none rounded border-none bg-secondary px-3 py-5 outline-none scrollbar-thin"
            onChange={(e) => setDesc(e.target.value)}
            value={desc}
          />
          <Button onClick={handleSubmit} className="h-[40px]">
            {isEditing ? "Editar" : "Comentar"}
          </Button>
        </div>
      ) : (
        <button
          onClick={() => signIn("google")}
          className="text-left text-xs md:text-sm"
        >
          Faça o login para escrever um comentário.
        </button>
      )}

      <div className="my-10 space-y-8">
        {isLoading ? (
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
        ) : (
          comments?.map((item) => (
            <>
              <div className="flex max-w-[800px] justify-between" key={item.id}>
                <div className="flex gap-4" key={item.id}>
                  <div className="relative h-12 w-12">
                    <Image
                      src={item.user.image!}
                      alt="User Image"
                      fill
                      className="rounded-full object-cover"
                    />
                  </div>

                  <div className="flex flex-col items-start justify-center gap-1 text-gray-400">
                    <span className="text-lg font-semibold">
                      {item?.user?.name}
                    </span>
                    <span>{item.createdAt.substring(0, 10)}</span>
                  </div>
                </div>

                {UserData?.user?.email === item.userEmail && (
                  <div className="flex gap-4">
                    <PencilIcon
                      className={`h-6 w-6 cursor-pointer opacity-80 transition-all hover:opacity-100 ${
                        isEditing && "fill-accent"
                      }`}
                      onClick={() => handleEdit(item.desc, item.id)}
                    />
                    <TrashIcon
                      className="h-6 w-6 cursor-pointer opacity-80 transition-all hover:opacity-100"
                      onClick={() => handleDelete(item.id)}
                    />
                  </div>
                )}
              </div>

              <p className="max-w-[800px] font-light">{item.desc}</p>
            </>
          ))
        )}

        <Pagination page={page} hasPrev={hasPrev} hasNext={hasNext} />
      </div>
    </div>
  );
};

export default Comments;

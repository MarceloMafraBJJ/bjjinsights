"use client";

import { useState } from "react";
import { signIn, useSession } from "next-auth/react";
import Image from "next/image";
import { toast } from "react-hot-toast";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline";
import useSWR from "swr";

import { fetcher } from "@/constants";
import { Comment } from "@/types";
import Button from "../shared/Button";

const Comments = ({ postSlug }: { postSlug: string }) => {
  const [desc, setDesc] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [editCommentId, setEditCommentId] = useState("");

  const { data: UserData, status } = useSession();

  const { data, mutate, isLoading } = useSWR(
    `http://localhost:3000/api/comments?postSlug=${postSlug}`,
    fetcher,
  ) as { data: Comment[]; mutate: () => void; isLoading: boolean };

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
        <div className="mt-8 flex justify-between gap-8">
          <textarea
            placeholder="Escreva um comentário..."
            className="h-[80px] w-full resize-none rounded border-none bg-secondary px-3 py-5 outline-none scrollbar-thin"
            onChange={(e) => setDesc(e.target.value)}
            value={desc}
          />
          <Button onClick={handleSubmit} className="h-[40px]">
            Enviar
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

      <div className="my-10 space-y-10">
        {isLoading
          ? "Loading"
          : data?.map((item) => (
              <>
                <div className="flex justify-between" key={item.id}>
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
                    <div className="mr-10 flex gap-4">
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

                <p className="pr-5 font-light">{item.desc}</p>
              </>
            ))}
      </div>
    </div>
  );
};

export default Comments;

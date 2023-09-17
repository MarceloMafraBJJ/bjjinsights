"use client";

import { useSession } from "next-auth/react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import "react-quill/dist/quill.bubble.css";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import { app } from "@/utils/firebase";
import { Category, Post } from "@/types";
import SelectCategory from "./SelectCategory";
import { toast } from "react-hot-toast";
import {
  ArrowDownTrayIcon,
  PlusIcon,
  TrashIcon,
} from "@heroicons/react/24/solid";

interface WriteProps {
  categories: Category[];
  cat: string;
  post?: Post;
  type: "create" | "edit";
}

const Write = ({ categories, cat, post, type }: WriteProps) => {
  const [open, setOpen] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [media, setMedia] = useState(post?.img || "");
  const [title, setTitle] = useState(post?.title || "");
  const [description, setDescription] = useState(post?.desc || "");

  const { status } = useSession();
  const router = useRouter();
  const storage = getStorage(app);

  // if (status === "unauthenticated") {
  // return  router.push("/");
  // }

  useEffect(() => {
    const upload = () => {
      const name = new Date().getTime() + file?.name!;
      const storageRef = ref(storage, name);
      const uploadTask = uploadBytesResumable(storageRef, file!);

      uploadTask.on(
        "state_changed",
        (snapshot) => {},
        (error) => {},
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setMedia(downloadURL);
            toast.success("Imagem enviada com sucesso.");
          });
        },
      );
    };

    file && upload();
  }, [file]);

  const slugify = (str: string) =>
    str
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/[\s_-]+/g, "-")
      .replace(/^-+|-+$/g, "");

  const handleSubmit = async () => {
    if (!title || !description) {
      return toast.error("Preencha todos os campos.");
    }
    try {
      if (type === "create") {
        if (!cat) {
          return toast.error("Selecione uma categoria.");
        }

        await fetch("/api/posts", {
          method: "POST",
          body: JSON.stringify({
            title,
            desc: description,
            img: media,
            slug: slugify(title),
            catSlug: cat || post?.cat,
          }),
        });

        toast.success("Post criado com sucesso!");
      } else if (type == "edit") {
        await fetch(`/api/posts/${post?.slug}`, {
          method: "PATCH",
          body: JSON.stringify({
            title,
            desc: description,
            img: media,
            slug: slugify(title),
            catSlug: cat,
          }),
        });

        toast.success("Post editado com sucesso!");
      }

      router.push("/");
    } catch (err) {
      console.error(err);
    }
  };

  const deleteImage = async (url: string) => {
    if (!url) {
      return toast.error("Não há imagens para excluir.");
    }

    try {
      deleteObject(ref(storage, url));
      await fetch(`/api/posts/${post?.slug}`, {
        method: "PATCH",
        body: JSON.stringify({
          img: "",
        }),
      });

      toast.success("Imagem excluída com suceso.");
      router.push(`/posts/${post?.slug}`);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async () => {
    try {
      console.log(post?.img);
      post?.img && deleteObject(ref(storage, post?.img));

      await fetch(`/api/posts/${post?.slug}`, {
        method: "DELETE",
      });

      router.push("/");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <div className="flex w-full flex-col items-center space-y-5 py-5 md:flex-row md:p-12">
        <input
          type="text"
          placeholder="Título"
          className="w-[90%] border-none bg-transparent text-3xl text-[#b3b3b1] outline-none md:w-full lg:text-5xl"
          onChange={(e) => setTitle(e.target.value)}
          value={title}
        />

        <SelectCategory categories={categories} cat={cat} />
      </div>

      <div
        className={`relative flex gap-5 ${media && !open && "items-center"}`}
      >
        <button onClick={() => setOpen(!open)} className="h-10 w-10">
          <PlusIcon className="h-8 w-8 fill-accent" />
        </button>

        {media && !open && (
          <span className="text-xs md:text-sm">
            Boa! você já selecionou uma imagem.
          </span>
        )}

        {open && (
          <div className="absolute left-14 z-10 flex flex-col gap-3 bg-white dark:bg-dark_primary">
            <div className="flex items-center gap-3">
              <input
                type="file"
                id="image"
                onChange={(e) =>
                  setFile(e.target.files ? e.target.files[0] : null)
                }
                className="hidden"
              />
              <label htmlFor="image">
                <div className="flex h-12 w-12 cursor-pointer items-center justify-center rounded-full border-2 border-accent">
                  <ArrowDownTrayIcon className="h-5 w-5 fill-accent" />
                </div>
              </label>

              <div
                onClick={() => deleteImage(media)}
                className="flex h-12 w-12 cursor-pointer items-center justify-center rounded-full border-2 border-accent"
              >
                <TrashIcon className="h-5 w-5 fill-accent" />
              </div>
            </div>

            {media && (
              <Image
                src={media}
                alt="Post Image"
                width={200}
                height={200}
                className="h-[200px] w-[200px] rounded-md object-cover"
              />
            )}
          </div>
        )}
      </div>

      <ReactQuill
        theme="bubble"
        value={description}
        onChange={setDescription}
        placeholder="Escreva sua história..."
        className="mx-auto mt-6 min-h-[600px]"
      />

      <button
        onClick={handleSubmit}
        className="absolute right-5 top-8 rounded-3xl border-none bg-accent px-5 py-2 font-semibold text-white"
      >
        {type == "create" ? "Publicar" : "Editar"}
      </button>

      {type === "edit" && (
        <button
          onClick={handleDelete}
          className="absolute bottom-20 mx-auto rounded-3xl border-none bg-accent px-5 py-2 font-semibold text-white"
        >
          Excluir Postagem
        </button>
      )}
    </>
  );
};

export default Write;
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import { app } from "@/utils/firebase";
import SelectCategory from "../shared/SelectCategory";
import { Button } from "../shared";
import { Category, Post } from "@/types";

import dynamic from "next/dynamic";

import "react-quill/dist/quill.bubble.css";
import MediaUploader from "./MediaUploader";
export const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

export interface WriteProps {
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
  const [videoURL, setVideoURL] = useState(post?.videoURL || "");
  const [description, setDescription] = useState(post?.desc || "");

  const router = useRouter();
  const storage = getStorage(app);

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
    if (!title || !description || !cat) {
      return toast.error("Preencha todos os campos.");
    }

    if (!media && !videoURL) {
      return toast.error(
        "Você precisar adicionar uma imagem ou um vídeo do youtube para criar um post.",
      );
    }

    try {
      if (type === "create") {
        await fetch("/api/posts", {
          method: "POST",
          body: JSON.stringify({
            title,
            desc: description,
            img: media,
            slug: slugify(title),
            catSlug: cat || post?.cat,
            videoURL,
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

      toast.success("Imagem excluída com sucesso.");
      router.push(`/posts/${post?.slug}`);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async () => {
    try {
      post?.img && deleteObject(ref(storage, post?.img));

      await fetch(`/api/posts/${post?.slug}`, {
        method: "DELETE",
      });

      router.push("/");
      router.refresh();
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
          className="w-[90%] border-none bg-transparent pr-6 text-3xl text-[#b3b3b1] outline-none md:w-full lg:text-5xl"
          onChange={(e) => setTitle(e.target.value)}
          value={title}
        />

        <div className="flex flex-col gap-2">
          <SelectCategory categories={categories} cat={cat} />
          <span className="text-xs">
            se a subcategoria não atende a sua necessidade selecione uma
            categoria genérica.
          </span>
        </div>
      </div>

      <MediaUploader
        media={media}
        open={open}
        setOpen={setOpen}
        setFile={setFile}
        deleteImage={deleteImage}
        setVideoURL={setVideoURL}
        videoURL={videoURL}
      />

      {!open ? (
        <ReactQuill
          theme="bubble"
          value={description}
          onChange={setDescription}
          placeholder="Escreva sua história..."
          className="mx-auto mt-6 min-h-[600px]"
        />
      ) : (
        <div className="min-h-[600px]" />
      )}

      <Button
        onClick={handleSubmit}
        className="absolute right-5 top-8 rounded-3xl bg-emerald-500"
      >
        {type == "create" ? "Publicar" : "Editar"}
      </Button>

      {type === "edit" && (
        <Button
          onClick={() =>
            toast((t) => (
              <div className="flex flex-col">
                <p>Tem certeza que deseja excluir este post?</p>
                <div className="mt-2 flex items-center justify-center gap-2">
                  <Button
                    className="w-full font-medium"
                    onClick={() => handleDelete()}
                  >
                    Excluir
                  </Button>
                  <Button
                    className="w-full bg-emerald-500 font-medium"
                    onClick={() => toast.dismiss(t.id)}
                  >
                    Cancelar
                  </Button>
                </div>
              </div>
            ))
          }
          className="absolute bottom-20"
        >
          Excluir Postagem
        </Button>
      )}
    </>
  );
};

export default Write;

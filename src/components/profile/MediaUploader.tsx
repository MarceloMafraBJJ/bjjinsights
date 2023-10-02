import Image from "next/image";
import {
  ArrowDownTrayIcon,
  PlusIcon,
  TrashIcon,
} from "@heroicons/react/24/solid";

interface MediaUploaderProps {
  media: string;
  open: boolean;
  setOpen: (open: boolean) => void;
  setFile: (file: File | null) => void;
  deleteImage: (url: string) => void;
  setVideoURL: (url: string) => void;
  videoURL: string;
}

const MediaUploader = ({
  media,
  open,
  setOpen,
  setFile,
  deleteImage,
  setVideoURL,
  videoURL,
}: MediaUploaderProps) => {
  return (
    <div className={`relative flex gap-5 ${media && !open && "items-center"}`}>
      <button onClick={() => setOpen(!open)} className="h-10 w-10">
        <PlusIcon className="h-8 w-8 fill-accent" />
      </button>

      {media && !open && (
        <span className="text-xs md:text-sm">
          Boa! Você já selecionou uma imagem.
        </span>
      )}

      {open && (
        <div className="absolute left-14 z-10 flex flex-col gap-3">
          <div className="flex gap-3">
            <input
              type="file"
              id="image"
              onChange={(e) =>
                setFile(e.target.files ? e.target.files[0] : null)
              }
              className="hidden"
            />
            <label htmlFor="image">
              <div
                className={`relative flex cursor-pointer items-center justify-center rounded-md border-2 border-accent ${
                  media ? "h-36 w-36" : "h-12 w-12"
                }`}
              >
                {media ? (
                  <Image
                    src={media}
                    alt="Post Image"
                    fill
                    className="object-cover"
                  />
                ) : (
                  <ArrowDownTrayIcon className="h-5 w-5 fill-accent" />
                )}
              </div>
            </label>

            <div
              onClick={() => deleteImage(media)}
              className="flex h-12 w-12 cursor-pointer items-center justify-center rounded-md border-2 border-accent"
            >
              <TrashIcon className="h-5 w-5 fill-accent" />
            </div>

            <input
              placeholder="Youtube URL: Ex.:https://youtu.be/L2-lSnPlDaQ?si=y-wCLYHIhxC5Uw6E "
              className="h-12 rounded-md border-2 border-accent bg-transparent px-4 outline-none"
              onChange={(e) => setVideoURL(e.target.value)}
              value={videoURL}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default MediaUploader;

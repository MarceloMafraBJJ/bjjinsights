"use client";

import { Fragment, useEffect, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface FollowersModalProps {
  open: boolean;
  onClose: () => void;
  modalType: "followers" | "following";
  followingIds: string[];
}
interface UsersProps {
  name: string;
  email: string;
  image: string;
  instagram?: string;
}

const FollowersModal = ({
  open,
  onClose,
  modalType,
  followingIds,
}: FollowersModalProps) => {
  const title = modalType === "followers" ? "Seguidores" : "Seguindo";

  const router = useRouter();

  const [users, setUsers] = useState<UsersProps[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setIsLoading(true);

        const res = await fetch("/api/user/followers", {
          method: "POST",
          body: JSON.stringify({ usersId: followingIds }),
        });

        if (res.ok) {
          const data = await res.json();
          setUsers(data.users);
        }
      } catch (error) {
        console.error("Error while fetching users:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (open) {
      fetchUsers();
    }
  }, [open, followingIds]);

  const extractInstagramUsername = (url: string) => {
    const regex = /instagram\.com\/([^/]+)/;
    const match = url.match(regex);

    if (match) {
      return match[1];
    } else {
      return null;
    }
  };

  return (
    <Transition appear show={open} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-50 overflow-y-auto"
        onClose={onClose}
      >
        <div className="min-h-screen px-4 text-center">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-black opacity-60" />
          </Transition.Child>

          {/* This is the modal container */}
          <span
            className="inline-block h-screen align-middle"
            aria-hidden="true"
          >
            &#8203;
          </span>

          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <div className="!text-default_text bg-primary my-8 inline-block max-h-[450px] min-h-[350px] w-full max-w-sm transform  overflow-y-auto rounded-2xl p-10 text-left align-middle shadow-xl transition-all scrollbar-thin scrollbar-track-white scrollbar-thumb-gray-300 dark:scrollbar-track-dark_primary dark:scrollbar-thumb-dark_secondary md:max-w-md">
              <Dialog.Title as="h3" className="text-lg font-medium leading-6">
                {title}
              </Dialog.Title>

              <div className="mt-2">
                {isLoading ? (
                  <p className="">Carregando..</p>
                ) : (
                  <>
                    {users.length <= 0 && "Nenhum seguidor encontrado."}

                    {users.map(({ name, image, instagram, email }, index) => (
                      <div
                        onClick={() => {
                          onClose();
                          router.push(`/profile?email=${email}`);
                        }}
                        key={index}
                        className="my-3 flex max-w-max cursor-pointer items-center justify-start gap-3"
                      >
                        <Image
                          src={image}
                          alt="User Image"
                          width={45}
                          height={45}
                          className="rounded-full"
                        />

                        <div className="flex flex-col space-y-1">
                          <span>{name}</span>
                          {instagram && (
                            <Link
                              href={instagram}
                              className="text-xs"
                              target="_blank"
                            >
                              @{extractInstagramUsername(instagram)}
                            </Link>
                          )}
                        </div>
                      </div>
                    ))}
                  </>
                )}
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
};

export default FollowersModal;

"use client";

import Link from "next/link";
import Image from "next/image";
import { signIn, signOut, useSession } from "next-auth/react";
import { Fragment, useState } from "react";
import { Menu, Transition } from "@headlessui/react";
import { ThemeToggle } from "@/components";
import { UserCircleIcon } from "@heroicons/react/24/solid";
import { usePathname } from "next/navigation";

const ProfileMenu = () => {
  const { data, status } = useSession();
  const [openModal, setOpenModal] = useState(false);
  const pathname = usePathname();

  if (pathname.includes("write") || pathname.includes("posts/edit")) return;

  return (
    <div className="relative z-10 flex flex-col items-center">
      <Menu as="div">
        <Menu.Button
          className="flex items-center"
          onClick={() => setOpenModal(!openModal)}
        >
          {data?.user?.image ? (
            <Image
              src={data.user.image}
              width={50}
              height={50}
              className="rounded-full border-2 dark:border-accent_secondary"
              alt="user profile image"
            />
          ) : (
            <UserCircleIcon className="h-10 w-10" />
          )}
        </Menu.Button>

        <Transition
          show={openModal}
          as={Fragment}
          enter="transition ease-out duration-200"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items
            static
            className="absolute right-28 mt-3 flex min-w-max translate-x-1/2 flex-col items-center justify-center rounded-xl border bg-white p-7 dark:border-accent_secondary dark:bg-dark_primary sm:min-w-[300px] lg:right-1/2"
            onMouseLeave={() => setOpenModal(false)}
          >
            <div className="flex flex-col items-center gap-y-4">
              {data?.user?.image && (
                <Image
                  src={data?.user?.image}
                  className="rounded-full"
                  width={80}
                  height={80}
                  alt="profile Image"
                />
              )}
              <p className="font-semibold">{data?.user?.name}</p>
            </div>

            {status === "unauthenticated" ? (
              <>
                <Menu.Item>
                  <button
                    className={"text-center font-bold"}
                    onClick={() => signIn("google")}
                  >
                    Entrar com o Google
                  </button>
                </Menu.Item>
              </>
            ) : (
              <>
                <div className="flex w-full flex-col items-start gap-3 space-y-1 pt-10">
                  <Menu.Item>
                    <Link href={`/write`} className="text-sm">
                      Novo Post
                    </Link>
                  </Menu.Item>

                  <Menu.Item>
                    <Link
                      href={`/profile?email=${data?.user?.email}`}
                      className="text-sm"
                    >
                      Perfil
                    </Link>
                  </Menu.Item>

                  <Menu.Item>
                    <Link
                      href={`/profile/edit?email=${data?.user?.email}`}
                      className="text-sm"
                    >
                      Editar Perfil
                    </Link>
                  </Menu.Item>
                </div>

                <div className="mt-5 flex w-full items-center justify-between border-t pt-5 dark:border-accent_secondary">
                  <Menu.Item>
                    <button
                      type="button"
                      className="text-sm"
                      onClick={() => signOut()}
                    >
                      Sair
                    </button>
                  </Menu.Item>

                  <Menu.Item>
                    <ThemeToggle />
                  </Menu.Item>
                </div>
              </>
            )}
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
};

export default ProfileMenu;

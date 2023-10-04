"use client";

import { Fragment, useEffect, useRef, useState } from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Menu, Transition } from "@headlessui/react";
import { UserCircleIcon } from "@heroicons/react/24/solid";
import { ThemeToggle } from "@/components/shared";
import { Bars3Icon } from "@heroicons/react/24/outline";

const ProfileMenu = () => {
  const { data, status } = useSession();
  const [openModal, setOpenModal] = useState(false);
  const pathname = usePathname();
  const modalRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const closeOnOutsideClick = (e: MouseEvent) => {
      if (
        openModal &&
        modalRef.current &&
        !modalRef.current.contains(e.target as Node)
      ) {
        setOpenModal(false);
      }
    };

    document.addEventListener("click", closeOnOutsideClick);

    return () => {
      document.removeEventListener("click", closeOnOutsideClick);
    };
  }, [openModal]);

  if (pathname.includes("write") || pathname.includes("posts/edit"))
    return null;

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
              className="rounded-full border-2 border-accent p-[2px]"
              alt="user profile image"
            />
          ) : (
            <>
              <UserCircleIcon className="hidden h-10 w-10 lg:block" />
              <Bars3Icon className="h-10 w-10 lg:hidden" />
            </>
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
            className="absolute right-28 mt-3 flex min-w-max translate-x-1/2 flex-col items-center justify-center rounded-xl border border-secondary bg-primary p-7 sm:min-w-[300px] lg:right-1/2"
            onMouseLeave={() => setOpenModal(false)}
            ref={modalRef}
          >
            <div className="flex flex-col items-center gap-y-4">
              {data?.user?.image && (
                <Image
                  src={data?.user?.image}
                  className="rounded-full border-2 border-accent p-1"
                  width={80}
                  height={80}
                  alt="profile Image"
                />
              )}
              <p className="font-semibold">{data?.user?.name}</p>
            </div>

            {status === "unauthenticated" ? (
              <>
                <Menu.Button
                  className={"text-center font-bold"}
                  onClick={() => signIn("google")}
                >
                  Entrar com o Google
                </Menu.Button>

                <div className="mt-5 flex w-full items-center justify-between border-t border-secondary pt-5">
                  <Menu.Item>
                    <ThemeToggle />
                  </Menu.Item>
                </div>
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

                <div className="mt-5 flex w-full items-center justify-between border-t border-secondary pt-5">
                  <Menu.Button className="text-sm" onClick={() => signOut()}>
                    Sair
                  </Menu.Button>

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

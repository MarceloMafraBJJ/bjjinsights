"use client";

import { getVideoID } from "@/constants";
import { User } from "@/types";
import { CursorArrowRaysIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import Link from "next/link";
import { SocialIcon } from "react-social-icons";
import { Card } from ".";
import FollowButton from "./FollowButton";
import FollowersModal from "./FollowersModal";
import { useState } from "react";

interface ProfileProps {
  user: User;
  currentUserId: string;
}

const ProfilePage = ({ user, currentUserId }: ProfileProps) => {
  const isFollowing = user?.followersIds?.includes(currentUserId);

  const [modalType, setModalType] = useState<"followers" | "following">(
    "followers",
  );

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [followingIds, setFollowingIds] = useState<string[]>(
    isFollowing ? [currentUserId] : [],
  );

  const formatFollowersCount = (followersCount: number) => {
    if (followersCount < 1000) {
      return followersCount.toString();
    } else if (followersCount < 1000000) {
      return (followersCount / 1000).toFixed(1) + "K";
    } else {
      return (followersCount / 1000000).toFixed(1) + "M";
    }
  };

  return (
    <>
      <div className="flex justify-around gap-10 rounded-md md:bg-zinc-100 md:p-20 md:px-10 md:py-16 md:dark:bg-dark_secondary">
        <section className="flex flex-1 flex-col items-center justify-center space-y-4 md:items-start">
          <div className="flex flex-col items-center gap-10 md:flex-row">
            <Image
              src={user?.image!}
              className="rounded-full border-2 border-white p-1 dark:border-accent_secondary"
              width={140}
              height={140}
              alt="profile image"
            />

            <div className="flex items-center justify-center space-x-6 md:text-lg">
              <button
                onClick={() => {
                  setIsModalOpen(true);
                  setFollowingIds(user.followersIds || []);
                  setModalType("followers");
                }}
              >
                <strong className="text-xl">
                  {formatFollowersCount(user?.followersIds?.length || 0)}
                </strong>
                <p>Seguidores</p>
              </button>
              <button
                onClick={() => {
                  setIsModalOpen(true);
                  setFollowingIds(user.followingIds || []);
                  setModalType("following");
                }}
              >
                <strong className="text-xl">
                  {formatFollowersCount(52200 || 0)}
                </strong>
                <p>Seguindo</p>
              </button>

              <div className="flex flex-col items-center">
                <strong className="text-xl">
                  {formatFollowersCount(user?.posts?.length || 0)}
                </strong>
                <p>postagens</p>
              </div>
            </div>
          </div>

          <p className="text-left text-lg font-bold tracking-wider md:text-3xl">
            {user?.name}
          </p>

          {user?.description && (
            <p className="md:text-lg">{user?.description}</p>
          )}

          <div className="flex w-full items-center justify-center space-x-6 md:justify-start">
            {user?.belt || user.location ? (
              <>
                <p className="text-center md:text-lg">{`🥋 ${user?.belt}`}</p>
                <p className="text-center md:text-lg">
                  {`📍 ${user.location.city} - ${user.location.uf}`}
                </p>
              </>
            ) : null}
          </div>

          <FollowButton
            userIdToFollow={user?.id}
            currentUserId={currentUserId}
            isFollowing={isFollowing || false}
          />

          {isModalOpen && (
            <FollowersModal
              modalType={modalType}
              followingIds={followingIds}
              open={isModalOpen}
              onClose={() => setIsModalOpen(false)}
            />
          )}
          <div className="flex space-x-3">
            {user?.instagram && (
              <SocialIcon
                url={user?.instagram}
                className="!h-8 !w-8"
                target="_blank"
              />
            )}
            {user?.youtube && (
              <SocialIcon
                url={user?.youtube}
                className="!h-8 !w-8"
                target="_blank"
              />
            )}
          </div>
        </section>

        <section className="hidden flex-1 flex-col items-end justify-center gap-5 xl:flex">
          {user?.posts.slice(0, 1).map(({ img, videoURL, title, slug, id }) => (
            <Link
              href={`/posts/${slug}`}
              className="group relative flex h-full w-full items-center justify-center rounded-lg bg-black"
              key={id}
            >
              <Image
                src={
                  img ||
                  `https://img.youtube.com/vi/${getVideoID(
                    videoURL,
                  )}/maxresdefault.jpg`
                }
                alt="Post Featured Image"
                className="rounded-md object-cover opacity-70 transition-all group-hover:opacity-60"
                fill
              />

              <div className="absolute top-5 uppercase text-white transition-all">
                <h1 className="mt-6 text-center font-bold tracking-widest">
                  {title}
                </h1>
                <p className="text-center text-sm">Clique para ver mais</p>
              </div>

              <div className="absolute transition-all">
                <CursorArrowRaysIcon className="h-8 w-8 animate-pulse fill-white" />
              </div>
            </Link>
          ))}
        </section>
      </div>

      <section>
        <h1 className="mb-6 mt-8 text-xl font-semibold">Postagens recentes</h1>

        <div className="grid md:grid-cols-2 md:gap-8">
          {user?.posts?.map((post) => <Card key={post.id} {...post} />)}
        </div>
      </section>
    </>
  );
};

export default ProfilePage;

import { getAuthSession } from "@/utils/auth";
import {
  HomeIcon,
  MagnifyingGlassIcon,
  SquaresPlusIcon,
  UsersIcon,
} from "@heroicons/react/24/solid";
import Image from "next/image";
import Link from "next/link";

const BottomBar = async () => {
  const session = await getAuthSession();

  return (
    <nav className="sticky bottom-0 z-50 border-t-2 border-secondary bg-primary pb-6 pt-4">
      <div className="flex flex-row items-center justify-around">
        <Link href={"/"}>
          <HomeIcon className="h-6 w-6" />
        </Link>
        <Link href={"/blog"}>
          <MagnifyingGlassIcon className="h-6 w-6" />
        </Link>
        {session?.user && (
          <Link href={"/write"}>
            <SquaresPlusIcon className="h-6 w-6" />
          </Link>
        )}
        <Link href={"/meet"}>
          <UsersIcon className="h-6 w-6" />
        </Link>

        {session?.user && (
          <Link
            href={`/profile/?email=${session.user.email}`}
            className="relative h-8 w-8"
          >
            <Image
              src={session?.user?.image!}
              alt="User image"
              fill
              className="rounded-full border border-accent p-[2px]"
            />
          </Link>
        )}
      </div>
    </nav>
  );
};

export default BottomBar;

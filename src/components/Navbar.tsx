import Link from "next/link";
import ProfileMenu from "./ProfileMenu";
import Image from "next/image";

const Navbar = () => {
  return (
    <div className="flex h-24 items-center justify-between">
      <div className="flex items-center gap-2">
        <Image
          src="/dark-logo.svg"
          alt="Logo"
          width={50}
          height={50}
          className="block dark:hidden"
        />
        <Image
          src="/light-logo.svg"
          alt="Logo"
          width={50}
          height={50}
          className="hidden dark:block"
        />
        <Link href="/" className="text-xl font-bold md:text-3xl">
          BJJ<span className="tracking-tighter">Insights</span>
        </Link>
      </div>

      <div className="flex flex-1 items-center justify-between gap-x-5 lg:justify-end">
        <div className="flex items-center gap-5 text-lg font-medium uppercase">
          <Link className="hidden lg:block" href="/">
            home
          </Link>
          <Link className="hidden lg:block" href="/blog">
            buscar
          </Link>
        </div>

        <ProfileMenu />
      </div>
    </div>
  );
};

export default Navbar;

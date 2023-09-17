import Link from "next/link";
import ProfileMenu from "./ProfileMenu";

const Navbar = () => {
  return (
    <div className="flex h-24 items-center justify-between">
      <Link href="/" className="flex-1 text-xl font-bold md:text-3xl">
        MMM_Blog
      </Link>

      <div className="flex flex-1 items-center justify-between gap-x-5 lg:justify-end">
        <div className="flex items-center gap-5 text-lg">
          <Link className="hidden md:block" href="/">
            home
          </Link>
          <Link className="hidden md:block" href="/">
            Contact
          </Link>
          <Link className="hidden md:block" href="/">
            About
          </Link>
        </div>

        <ProfileMenu />
      </div>
    </div>
  );
};

export default Navbar;

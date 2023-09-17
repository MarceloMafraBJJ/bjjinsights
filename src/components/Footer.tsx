import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  return (
    <div className="mt-12 flex flex-col items-center justify-between gap-y-10 py-5 text-gray-400 md:flex-row md:gap-y-0">
      <div className="flex flex-1 flex-col gap-4">
        <div className="flex items-center gap-2">
          <Image src="/logo.png" alt="Logo" width={50} height={50} />
          <h1 className="text-2xl font-semibold">MMM_BLOG</h1>
        </div>

        <p className="font-light">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla,
          repellat nam pariatur provident architecto modi rem ipsa quidem? Quis
          animi nesciunt repellendus nisi esse veniam error voluptates quam
          ducimus assumenda.
        </p>
        <div className="hidden flex-1 gap-3 lg:flex">
          <Image src="/facebook.png" alt="facebook" width={24} height={24} />
          <Image src="/instagram.png" alt="instagram" width={24} height={24} />
          <Image src="/tiktok.png" alt="tiktok" width={24} height={24} />
          <Image src="/youtube.png" alt="youtube" width={24} height={24} />
        </div>
      </div>

      <div className="flex w-full flex-1 justify-between gap-x-10 md:justify-end lg:gap-x-20">
        <div className="flex flex-col gap-2">
          <span className="font-semibold">Links</span>

          <Link href="/">HomePage</Link>
          <Link href="/">Blog</Link>
          <Link href="/">About</Link>
          <Link href="/">Contact</Link>
        </div>

        <div className="flex flex-col gap-2">
          <span className="font-semibold">Tags</span>

          <Link href="/">Style</Link>
          <Link href="/">Fashion</Link>
          <Link href="/">Coding</Link>
          <Link href="/">Travek</Link>
        </div>

        <div className="flex flex-col gap-2">
          <span className="font-semibold">Social</span>

          <Link href="/">Facebook</Link>
          <Link href="/">Instagram</Link>
          <Link href="/">Tiktok</Link>
          <Link href="/">Youtube</Link>
        </div>
      </div>
    </div>
  );
};

export default Footer;

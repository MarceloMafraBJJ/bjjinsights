import { LightBulbIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  return (
    <>
      <div className="mt-12 flex flex-col items-center justify-between gap-y-10 py-5  md:flex-row md:gap-y-0">
        <div className="flex flex-1 flex-col gap-4">
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
            <h1 className="text-2xl font-semibold">
              BJJ<span className="tracking-tighter">Insights</span>
            </h1>
          </div>

          <p className="py-4 font-light">
            Explore técnicas, estratégias e histórias. Este é o seu guia
            definitivo para aprimorar suas habilidades, entender a filosofia e
            mergulhar na comunidade apaixonada do Jiu-jítsu. Aprofunde-se nas
            raízes do <b>Brazilian Jiu-Jitsu</b> e leve sua jornada nesse mundo
            fascinante.
          </p>

          <Link
            href="https://officialmafra.vercel.app/"
            className="flex max-w-max items-center gap-2 text-sm"
            target="_blank"
          >
            <LightBulbIcon className="h-6 w-6 fill-accent" />
            <i>Marcelo Mafra | Creator and developer</i>
          </Link>
        </div>

        <div className="flex w-full flex-1 justify-around gap-x-10 lg:justify-end lg:gap-x-20">
          <div className="flex flex-col gap-2">
            <span className="font-semibold">Links</span>

            <Link href="/">Home</Link>
            <Link href="/blog">Buscar</Link>
          </div>

          <div className="flex flex-col gap-2">
            <span className="font-semibold">Social</span>

            <Link href="/">X</Link>
            <Link href="/">Threads</Link>
          </div>
        </div>
      </div>

      <div className="w-full items-center justify-center py-6">
        <h1 className="text-center text-base">
          &copy; Copyright 2023 | BJJInsights
        </h1>
      </div>
    </>
  );
};

export default Footer;

import { ClearParamsButton, Search } from "@/components/shared";
import { MeetHorizontalSlider } from "@/components/meet";
import { getData } from "@/constants";
import { User } from "@/types";
import { getAuthSession } from "@/utils/auth";
import Link from "next/link";

interface ProfileProps {
  searchParams: {
    search: string;
  };
}

export default async function Blog({ searchParams }: ProfileProps) {
  const session = await getAuthSession();

  const { search } = searchParams;

  const { nearCurrentUser } = await getData(
    `user/meet/nearCurrentUser?email=${session?.user?.email}&page=1`,
  );
  const { allUsers, findUserSearch } = await getData(
    `user/meet/allUsers?search=${search}&page=1`,
  );
  const { popularUsers } = await getData(`user/meet/popularUsers?page=1`);

  return (
    <main className="mt-12 space-y-6">
      <h2>
        <strong>{session?.user?.name && session.user.name + ", "}</strong>
        Conheça outros praticantes da nobre arte.
      </h2>

      <div className="flex items-center gap-2">
        <Search placeholder="Pesquise por pessoas" />
        <ClearParamsButton />
      </div>

      {findUserSearch?.length > 0 && (
        <section className="space-y-4 py-8">
          <h1 className="font-semibold uppercase tracking-wider">
            Encontrados
          </h1>
          <MeetHorizontalSlider users={findUserSearch} />
        </section>
      )}

      {session?.user?.email && (
        <section className="space-y-4 py-8">
          <Link
            href={`/meet/nearCurrentUser`}
            className="text-xl font-semibold uppercase tracking-wider"
          >
            Perto de você
          </Link>
          <MeetHorizontalSlider users={nearCurrentUser} />
        </section>
      )}

      <section className="space-y-4 py-8">
        <Link
          href={`/meet/allUsers`}
          className="text-xl font-semibold uppercase tracking-wider"
        >
          Todos os usuários
        </Link>
        <MeetHorizontalSlider users={allUsers} />
      </section>

      <section className="space-y-4 py-8">
        <Link
          href={`/meet/popularUsers`}
          className="text-xl font-semibold uppercase tracking-wider"
        >
          Usuários populares
        </Link>
        <MeetHorizontalSlider users={popularUsers} />
      </section>
    </main>
  );
}

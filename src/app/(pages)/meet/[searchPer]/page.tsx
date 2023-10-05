import { MeetCard } from "@/components/meet";
import { Pagination } from "@/components/shared";
import { MenuAside } from "@/components/shared/MenuAside";
import { getData } from "@/constants";
import { User } from "@/types";
import { getAuthSession } from "@/utils/auth";
import { redirect } from "next/navigation";

export default async function SearchUserPer({
  searchParams,
  params,
}: {
  params: { searchPer: string };
  searchParams: { page: string };
}) {
  const session = await getAuthSession();
  const { searchPer } = params;
  const page = parseInt(searchParams.page) || 1;
  if (!searchPer || (searchPer == "nearCurrentUser" && !session))
    return redirect("/");

  let users: User[] = [];
  let usersCount = 0;

  if (searchPer === "nearCurrentUser") {
    const { nearCurrentUser, count } = await getData(
      `user/meet/nearCurrentUser?email=${session?.user?.email}&page=${page}`,
    );

    users = nearCurrentUser;
    usersCount = count;
  } else if (searchPer === "allUsers") {
    const { allUsers, count } = await getData(
      `user/meet/allUsers?page=${page}`,
    );

    users = allUsers;
    usersCount = count;
  } else if (searchPer === "popularUsers") {
    const { popularUsers, count } = await getData(
      `user/meet/popularUsers?page=${page}`,
    );

    users = popularUsers;
    usersCount = count;
  }

  let title = "";

  switch (searchPer) {
    case "nearCurrentUser":
      title = "Perto de você";
      break;
    case "allUsers":
      title = "Todos os usuários";
      break;
    case "popularUsers":
      title = "Usuários populares";
      break;
    default:
      break;
  }

  const POST_PER_PAGE = 8;
  const hasPrev = POST_PER_PAGE * (page - 1) > 1;
  const hasNext = POST_PER_PAGE * (page - 1) + POST_PER_PAGE < usersCount;

  return (
    <div className="mt-12 flex gap-14">
      <div className="flex-[2] space-y-10">
        <h1 className="font-semibold uppercase tracking-wider">{title}</h1>

        <section className="grid grid-cols-1 place-items-center gap-y-8 md:grid-cols-2">
          {users?.map((user) => <MeetCard key={user.id} user={user} />)}
        </section>

        <Pagination page={page} hasPrev={hasPrev} hasNext={hasNext} />
      </div>

      <MenuAside />
    </div>
  );
}

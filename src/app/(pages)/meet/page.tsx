import ProfilePage from "@/components/ProfilePage";
import { getData } from "@/constants";
import { User } from "@/types";
import { getAuthSession } from "@/utils/auth";

interface ProfileProps {
  searchParams: {
    search: string;
  };
}

export default async function Blog({ searchParams }: ProfileProps) {
  const session = await getAuthSession();
  const { search } = searchParams;

  return (
    <div className="my-12">
      <h1>
        <strong>{session?.user?.name && session.user.name + ", "}</strong>
        Conheça outros praticantes da nobre arte.
      </h1>
    </div>
  );
}

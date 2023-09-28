import ProfilePage from "@/components/ProfilePage";
import { getData } from "@/constants";
import { User } from "@/types";
import { getAuthSession } from "@/utils/auth";

interface ProfileProps {
  searchParams: {
    email: string;
  };
}

export default async function Blog({ searchParams }: ProfileProps) {
  const session = await getAuthSession();
  const { email } = searchParams;

  const { user } = (await getData(`user?email=${email}`)) as { user: User };
  const { user: CurrentUser } = (await getData(
    `user?email=${session?.user?.email}`,
  )) as { user: User };

  return <ProfilePage user={user} currentUserId={CurrentUser?.id} />;
}

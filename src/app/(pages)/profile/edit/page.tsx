import { ProfileForm } from "@/components/profile";
import { getData } from "@/constants";
import { User } from "@/types";
import { getAuthSession } from "@/utils/auth";
import { redirect } from "next/navigation";

interface ProfileProps {
  searchParams: {
    email: string;
  };
}

export default async function EditProfile({ searchParams }: ProfileProps) {
  const session = await getAuthSession();
  const { email } = searchParams;

  if (!session || !email || session?.user?.email != email) {
    return redirect("/");
  }

  const { user } = (await getData(`user?email=${email}`)) as { user: User };

  return <ProfileForm session={session} user={user} />;
}

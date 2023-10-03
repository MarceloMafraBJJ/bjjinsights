import prisma from "@/utils/connect";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  const { searchParams } = new URL(req.url);
  const email = searchParams.get("email");
  const page = searchParams.get("page");

  const POST_PER_PAGE = 8;

  try {
    if (email && email !== "unauthenticated") {
      const currentUser = await prisma.user.findUnique({
        where: { email },
        include: { location: true },
      });

      if (currentUser?.location) {
        let { location } = currentUser;

        const nearCurrentUser = await prisma.user.findMany({
          where: {
            OR: [
              { location: { city: location.city } },
              { location: { mesoregion: location.mesoregion } },
              { location: { microregion: location.microregion } },
            ],
          },
          orderBy: {
            createdAt: "desc",
          },
          include: { location: true },
          take: POST_PER_PAGE,
          skip: POST_PER_PAGE * (parseInt(page!) - 1),
        });

        const count = await prisma.user.count({
          where: {
            OR: [
              { location: { city: location.city } },
              { location: { mesoregion: location.mesoregion } },
              { location: { microregion: location.microregion } },
            ],
          },
        });

        const usersExcludingCurrentUser = nearCurrentUser?.filter(
          (user) => user?.id !== currentUser?.id,
        );

        return NextResponse.json(
          {
            nearCurrentUser: usersExcludingCurrentUser,
            count,
          },
          {
            status: 200,
          },
        );
      }
    }

    return NextResponse.json({
      message: "User unauthenticated",
      status: 500,
    });
  } catch (err) {
    console.error(err);

    return NextResponse.json({
      message: "Something went wrong!",
      status: 500,
    });
  }
};

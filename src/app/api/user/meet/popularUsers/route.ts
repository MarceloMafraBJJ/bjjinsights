import prisma from "@/utils/connect";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  const { searchParams } = new URL(req.url);
  const page = searchParams.get("page");
  const POST_PER_PAGE = 8;

  try {
    const allUsers = await prisma.user.findMany({
      orderBy: {
        createdAt: "desc",
      },
      include: { location: true },
      take: POST_PER_PAGE,
      skip: POST_PER_PAGE * (parseInt(page!) - 1),
    });

    const count = await prisma.user.count();

    const sortedUsers = allUsers?.sort(
      (a, b) => (b.followersIds?.length || 0) - (a.followersIds?.length || 0),
    );

    const popularUsers = sortedUsers?.slice(0, 10);

    return NextResponse.json(
      { popularUsers, count },
      {
        status: 200,
      },
    );
  } catch (err) {
    console.error(err);

    return NextResponse.json({
      message: "Something went wrong!",
      status: 500,
    });
  }
};

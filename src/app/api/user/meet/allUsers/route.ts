import prisma from "@/utils/connect";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  const { searchParams } = new URL(req.url);
  const search = searchParams.get("search");
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

    if (search) {
      const findUserSearch = await prisma.user.findMany({
        where: {
          name: {
            contains: search,
            mode: "insensitive",
          },
        },
        take: POST_PER_PAGE,
        skip: POST_PER_PAGE * (parseInt(page!) - 1),
      });

      return NextResponse.json(
        { allUsers, findUserSearch },
        {
          status: 200,
        },
      );
    }
    return NextResponse.json(
      { allUsers, count },
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

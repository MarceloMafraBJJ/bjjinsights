import prisma from "@/utils/connect";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  try {
    const [mostViewedPosts, mostLikedPosts] = await prisma.$transaction([
      prisma.post.findMany({
        take: 3,
        orderBy: {
          views: "desc",
        },
        include: { user: true },
      }),
      prisma.post.findMany({
        take: 3,
        orderBy: {
          likesCount: "desc",
        },
        include: { user: true },
      }),
    ]);

    return NextResponse.json(
      { mostViewedPosts, mostLikedPosts },
      { status: 200 },
    );
  } catch (err) {
    console.error(err);

    return NextResponse.json({
      message: "Something went wrong!",
      status: 500,
    });
  }
};

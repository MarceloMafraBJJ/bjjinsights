import prisma from "@/utils/connect";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  try {
    const post = await prisma.post.findFirst({
      orderBy: {
        createdAt: "desc",
      },
      where: {
        NOT: {
          img: "",
          videoURL: "",
        },
      },
    });

    return NextResponse.json(
      { post },
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

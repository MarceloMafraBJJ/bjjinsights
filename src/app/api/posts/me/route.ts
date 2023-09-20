import { getAuthSession } from "@/utils/auth";
import prisma from "@/utils/connect";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  const { searchParams } = new URL(req.url);
  const email = searchParams.get("email");

  if (!email) {
    return NextResponse.json({
      message: "Not allowed!",
      status: 401,
    });
  }

  try {
    const posts = await prisma.post.findMany({
      where: { userEmail: email! },
    });

    return NextResponse.json(posts, {
      status: 200,
    });
  } catch (err) {
    console.error(err);

    return NextResponse.json({
      message: "Something went wrong!",
      status: 500,
    });
  }
};

import prisma from "@/utils/connect";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  const { usersId } = await req.json();

  if (!usersId) {
    return NextResponse.json({
      message: "User IDs not provided!",
      status: 400,
    });
  }

  try {
    const users = await prisma.user.findMany({
      where: {
        id: {
          in: usersId,
        },
      },
      select: {
        name: true,
        image: true,
        instagram: true,
        email: true,
      },
    });

    return NextResponse.json({ users }, { status: 200 });
  } catch (err) {
    console.error(err);

    return NextResponse.json({
      message: "Something went wrong!",
      status: 500,
    });
  }
};

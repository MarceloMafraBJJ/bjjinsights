import { User } from "@/types";
import { getAuthSession } from "@/utils/auth";
import prisma from "@/utils/connect";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  const { searchParams } = new URL(req.url);
  const email = searchParams.get("email");

  if (!email) {
    throw new Error("Email incorrect");
  }

  try {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
      include: {
        location: true,
        posts: {
          orderBy: {
            createdAt: "desc",
          },
        },
      },
    });

    return NextResponse.json(
      { user },
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

export const PATCH = async (req: NextRequest) => {
  const session = await getAuthSession();

  if (!session) {
    return NextResponse.json({
      message: "Not allowed!",
      status: 401,
    });
  }

  const body = await req.json();
  const form = body.form;
  const location = body.location;

  try {
    const user = await prisma.user.update({
      where: {
        email: form.email,
      },
      data: { ...form },
      include: {
        location: true,
      },
    });

    if (!user?.location) {
      await prisma.location.create({
        data: {
          userEmail: form.email,
          ...location,
        },
      });
    } else {
      await prisma.location.update({
        where: {
          userEmail: form.email,
        },
        data: {
          ...location,
        },
      });
    }

    return NextResponse.json({
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

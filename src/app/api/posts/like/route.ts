import { getAuthSession } from "@/utils/auth";
import prisma from "@/utils/connect";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  const session = await getAuthSession();

  if (!session) {
    return NextResponse.json({
      message: "Not allowed!",
      status: 401,
    });
  }

  const { postId, userEmail } = await req.json();

  try {
    const existingLike = await prisma.like.findFirst({
      where: {
        postId,
        userEmail,
      },
    });

    if (existingLike) {
      await prisma.like.delete({
        where: {
          id: existingLike.id,
        },
      });

      await prisma.post.update({
        where: {
          id: postId,
        },
        data: {
          likesCount: {
            decrement: 1,
          },
          views: {
            decrement: 1,
          },
        },
      });

      return NextResponse.json({ status: 200 });
    } else {
      const like = await prisma.like.create({
        data: {
          postId,
          userEmail,
        },
      });

      await prisma.post.update({
        where: {
          id: postId,
        },
        data: {
          likesCount: {
            increment: 1,
          },
          views: {
            decrement: 1,
          },
        },
      });

      return NextResponse.json({ like }, { status: 200 });
    }
  } catch (err) {
    console.error(err);

    return NextResponse.json({
      message: "Something went wrong!",
      status: 500,
    });
  }
};

export const GET = async (req: NextRequest) => {
  const { searchParams } = new URL(req.url);

  const postId = searchParams.get("postId");
  const userEmail = searchParams.get("userEmail");

  try {
    if (postId && userEmail) {
      const existingLike = await prisma.like.findFirst({
        where: {
          postId,
          userEmail,
        },
      });

      return NextResponse.json(!!existingLike, { status: 200 });
    }
  } catch (err) {
    console.error(err);

    return NextResponse.json({
      message: "Something went wrong!",
      status: 500,
    });
  }
};

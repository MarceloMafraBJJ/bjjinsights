import { getAuthSession } from "@/utils/auth";
import prisma from "@/utils/connect";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  const { searchParams } = new URL(req.url);

  const postSlug = searchParams.get("postSlug");
  const page = searchParams.get("page");
  const COMMENT_PER_PAGE = 10;

  try {
    const [comments, count] = await prisma.$transaction([
      prisma.comment.findMany({
        take: COMMENT_PER_PAGE,
        skip: COMMENT_PER_PAGE * (parseInt(page!) - 1),
        where: { ...(postSlug && { postSlug }) },
        include: {
          user: true,
        },
      }),
      prisma.comment.count({ where: { ...(postSlug && { postSlug }) } }),
    ]);

    return NextResponse.json(
      { comments, count },
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

export const POST = async (req: NextRequest) => {
  const session = await getAuthSession();

  if (!session) {
    return NextResponse.json({
      message: "Not allowed!",
      status: 401,
    });
  }

  try {
    const body = await req.json();

    const comment = await prisma.comment.create({
      data: { ...body, userEmail: session.user?.email! },
    });

    return NextResponse.json(comment, {
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

export const DELETE = async (req: NextRequest) => {
  const session = await getAuthSession();

  if (!session) {
    return NextResponse.json({
      message: "Not allowed!",
      status: 401,
    });
  }

  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  if (!id) return;

  try {
    const comment = await prisma.comment.delete({
      where: { id },
    });

    return NextResponse.json(comment, {
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

export const PATCH = async (req: NextRequest) => {
  const session = await getAuthSession();

  if (!session) {
    return NextResponse.json({
      message: "Not allowed!",
      status: 401,
    });
  }

  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  if (!id) return;

  const body = await req.json();

  try {
    const comment = await prisma.comment.update({
      where: { id },
      data: { ...body },
    });

    return NextResponse.json(comment, {
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

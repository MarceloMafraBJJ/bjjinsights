import { categories } from "@/constants";
import { getAuthSession } from "@/utils/auth";
import prisma from "@/utils/connect";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  const { searchParams } = new URL(req.url);

  const page = searchParams.get("page");
  const cat = searchParams.get("cat");
  const POST_PER_PAGE = 4;

  const isCategory = categories.filter(({ title }) => title == cat);

  try {
    const [posts, count] = await prisma.$transaction([
      prisma.post.findMany({
        take: POST_PER_PAGE,
        skip: POST_PER_PAGE * (parseInt(page!) - 1),
        orderBy: {
          createdAt: "desc",
        },
      }),
      prisma.post.count({ where: { ...(cat && { catSlug: cat }) } }),
    ]);

    let result;
    if (!cat) {
      result = posts;
    } else if (isCategory.length > 0) {
      let subcategories = isCategory.map(({ subcategories }) => {
        return subcategories.map(({ title }) => title);
      });

      result = posts.filter(({ catSlug }) => {
        return subcategories[0].includes(catSlug);
      });
    } else {
      result = posts.filter(({ catSlug }) => {
        return cat == catSlug;
      });
    }

    return NextResponse.json(
      { posts: result, count },
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

    console.log(body);

    const post = await prisma.post.create({
      data: { ...body, userEmail: session.user?.email!, likesCount: 0 },
    });

    return NextResponse.json(post, {
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

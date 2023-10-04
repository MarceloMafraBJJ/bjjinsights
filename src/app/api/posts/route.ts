import { categories } from "@/constants";
import { getAuthSession } from "@/utils/auth";
import prisma from "@/utils/connect";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  const { searchParams } = new URL(req.url);

  const page = searchParams.get("page");
  const cat = searchParams.get("cat");
  const search = searchParams.get("search");
  const POST_PER_PAGE = 8;

  const isCategory = categories.filter(({ title }) => title == cat);

  let searchWhere = {};
  let catWhere = {};

  if (search !== null && search !== "undefined") {
    searchWhere = {
      OR: [
        {
          title: {
            contains: search,
            mode: "insensitive",
          },
        },
        {
          desc: {
            contains: search,
            mode: "insensitive",
          },
        },
      ],
    };
  }

  if (cat !== null && cat !== "undefined") {
    if (isCategory.length > 0) {
      let subcategories = isCategory.map(({ subcategories }) => {
        return subcategories.map(({ title }) => title);
      });

      let filteredCategories = subcategories[0];
      filteredCategories.push(cat);

      catWhere = {
        OR: filteredCategories.map((subcategory) => ({
          catSlug: {
            contains: subcategory,
            mode: "insensitive",
          },
        })),
      };
    } else {
      catWhere = {
        catSlug: {
          equals: cat,
          mode: "insensitive",
        },
      };
    }
  }

  let where = {};

  if (Object.keys(searchWhere).length > 0 && Object.keys(catWhere).length > 0) {
    where = {
      AND: [searchWhere, catWhere],
    };
  } else if (Object.keys(searchWhere).length > 0) {
    where = searchWhere;
  } else if (Object.keys(catWhere).length > 0) {
    where = catWhere;
  }

  try {
    const [posts, count] = await prisma.$transaction([
      prisma.post.findMany({
        take: POST_PER_PAGE,
        skip: POST_PER_PAGE * (parseInt(page!) - 1),
        orderBy: {
          createdAt: "desc",
        },
        where,
      }),
      prisma.post.count({ where }),
    ]);

    return NextResponse.json(
      { posts, count },
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

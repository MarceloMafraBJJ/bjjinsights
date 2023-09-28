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

  const { userIdToFollow, currentUserId } = await req.json();

  try {
    const currentUser: any = await prisma.user.findUnique({
      where: {
        id: currentUserId,
      },
    });

    if (!currentUser) {
      return NextResponse.json({
        message: "Current user not found!",
        status: 404,
      });
    }

    const isFollowing = currentUser?.followingIds?.includes(userIdToFollow);

    if (isFollowing) {
      const updatedFollowingIds = currentUser.followingIds.filter(
        (id: string) => id !== userIdToFollow,
      );

      await prisma.user.update({
        where: {
          id: currentUserId,
        },
        data: {
          followingIds: updatedFollowingIds,
        },
      });

      const targetUser: any = await prisma.user.findUnique({
        where: {
          id: userIdToFollow,
        },
      });

      if (targetUser) {
        const updatedFollowersIds = targetUser?.followersIds?.filter(
          (id: string) => id !== currentUserId,
        );

        await prisma.user.update({
          where: {
            id: userIdToFollow,
          },
          data: {
            followersIds: updatedFollowersIds,
          },
        });
      }

      return NextResponse.json({ status: 200 });
    } else {
      const updatedFollowingIds = [...currentUser.followingIds, userIdToFollow];

      await prisma.user.update({
        where: {
          id: currentUserId,
        },
        data: {
          followingIds: updatedFollowingIds,
        },
      });

      const targetUser: any = await prisma.user.findUnique({
        where: {
          id: userIdToFollow,
        },
      });

      if (targetUser) {
        const updatedFollowersIds = [
          ...targetUser?.followersIds,
          currentUserId,
        ];

        await prisma.user.update({
          where: {
            id: userIdToFollow,
          },
          data: {
            followersIds: updatedFollowersIds,
          },
        });
      }

      return NextResponse.json({ status: 200 });
    }
  } catch (err) {
    console.error(err);

    return NextResponse.json({
      message: "Something went wrong!",
      status: 500,
    });
  }
};

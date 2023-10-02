import { getAuthSession } from "@/utils/auth";
import sendMail from "@/utils/nodemailer";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  const session = await getAuthSession();

  if (!session?.user?.email) {
    return NextResponse.json({
      message: "Not allowed!",
      status: 401,
    });
  }
  const body = await req.json();

  try {
    await sendMail(
      `Report by ${body.userEmail}`,
      session?.user?.email,
      `
        <html>
          <body>
            <p>Razão: ${body.reason}</p>
            <p>Nome do post: ${body.postTitle}</p>
            <p>Email do criador do post: ${body.postUserEmail}</p>
            <p>ID do post: ${body.postId}</p>
            <p>URL: <a href="${process.env.NEXTAUTH_URL}/posts/${body.postSlug}">${process.env.NEXTAUTH_URL}/posts/${body.postSlug}</a></p>
          </body>
        </html>
      `,
    );

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

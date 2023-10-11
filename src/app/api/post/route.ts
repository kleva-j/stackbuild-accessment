import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/nextAuth";
import {
  getPaginatedPosts,
  saveNewPost,
  deletePost,
  updatePost,
} from "@/lib/posts";

import prisma from "@/lib/prisma";

export const checkUserExist = async () => {
  const session = await getServerSession(authOptions);
  const user = await prisma.user.findFirst({
    where: { email: session?.user?.email },
  });

  if (!user) {
    new Response("User not found!", { status: 400 });
    return;
  }
  return user;
};

export const GET = async (req: NextRequest) => {
  const limit = 10;
  const { searchParams } = new URL(req.url);
  const cursor = searchParams.get("cursor") ?? "";
  const cursorObj = cursor === "" ? undefined : { id: cursor };

  try {
    const posts = await getPaginatedPosts(cursor ? 1 : 0, limit, cursorObj);
    return NextResponse.json(
      {
        posts,
        nextId: posts.length === limit ? posts[limit - 1].id : undefined,
      },
      { status: 200 },
    );
  } catch (err: unknown) {
    return NextResponse.json((err as Error).message, { status: 500 });
  }
};

export const POST = async (req: NextRequest) => {
  try {
    const { title, content, published } = await req.json();

    const user = await checkUserExist();

    if (user) {
      const newPost = await saveNewPost({
        userId: user.id,
        title,
        content,
        published,
      });

      return NextResponse.json({ post: newPost }, { status: 201 });
    }
  } catch (err: unknown) {
    return NextResponse.json((err as Error).message, { status: 500 });
  }
};

export const DELETE = async (req: NextRequest) => {
  const { id } = await req.json();

  try {
    const user = await checkUserExist();

    if (user) {
      await deletePost(id, user.id);
      return NextResponse.json({ id }, { status: 200 });
    }
  } catch (err: unknown) {
    return NextResponse.json((err as Error).message, { status: 500 });
  }
};

export const PUT = async (req: NextRequest) => {
  const { id, title, content, published } = await req.json();

  try {
    const user = await checkUserExist();

    if (user) {
      const post = await updatePost(id, {
        userId: user.id,
        title,
        content,
        published,
      });

      return NextResponse.json({ post }, { status: 200 });
    }
  } catch (err: unknown) {
    return NextResponse.json((err as Error).message, { status: 500 });
  }
};

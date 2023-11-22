import { NextRequest, NextResponse } from "next/server";
import { GetPaginatedPostAction } from "@/app/actions";
import { handleAuthState } from "@/lib/auth";

import prisma from "@/lib/prisma";

export const GET = async (req: NextRequest) => {
  const limit = 10;
  const { searchParams } = new URL(req.url);
  const cursor = searchParams.get("cursor") ?? "";
  const skip = Number(searchParams.get("skip") ?? 0);
  const cursorObj = !cursor ? undefined : { id: cursor };

  try {
    const result = await GetPaginatedPostAction({
      skip,
      take: limit,
      cursor: cursorObj,
    });
    const { data: posts } = result;
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

    const { id } = await handleAuthState();

    const newPost = await prisma.post.create({
      data: { title, content, published, user: { connect: { id } } },
    });

    return NextResponse.json({ post: newPost }, { status: 201 });
  } catch (err: unknown) {
    return NextResponse.json((err as Error).message, { status: 500 });
  }
};

export const DELETE = async (req: NextRequest) => {
  const { id } = await req.json();

  try {
    const { id: userId } = await handleAuthState();

    await prisma.post.delete({ where: { id, userId } });

    return NextResponse.json({ id }, { status: 200 });
  } catch (err: unknown) {
    return NextResponse.json((err as Error).message, { status: 500 });
  }
};

export const PUT = async (req: NextRequest) => {
  const { id, title, content, published = false } = await req.json();

  try {
    const { id: userId } = await handleAuthState();

    const post = await prisma.post.update({
      where: { id, userId },
      data: { title, content, published },
    });

    return NextResponse.json({ post }, { status: 200 });
  } catch (err: unknown) {
    return NextResponse.json((err as Error).message, { status: 500 });
  }
};

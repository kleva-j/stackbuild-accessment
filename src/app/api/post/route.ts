import { NextRequest, NextResponse } from "next/server";

import prisma from "@/lib/prisma";

const handler = async (req: NextRequest) => {
  const searchParams = req.nextUrl.searchParams;
  const limit = 5;
  const cursor = searchParams.get("cursor") ?? "";
  const cursorObj = cursor === "" ? undefined : { id: cursor };

  const posts = await prisma.post.findMany({
    skip: cursor !== "" ? 1 : 0,
    cursor: cursorObj,
    take: limit,
    select: { id: true, title: true, createdAt: true },
  });

  return NextResponse.json({
    posts,
    nextId: posts.length === limit ? posts[limit - 1].id : undefined,
  });
};

export { handler as GET };

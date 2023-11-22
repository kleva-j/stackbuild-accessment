"use server";

import type { $InsertPost, $UpdatePost } from "@/lib/types";

import { checkIfAuthed, handleAuthState } from "@/lib/auth";
import { revalidatePath } from "next/cache";

import prisma from "@/lib/prisma";

export async function GetPostByUserAction(id: string, userId: string) {
  try {
    const isAuthed = await checkIfAuthed();

    const posts = await prisma.post.findUnique({
      where: { id, userId, ...(!isAuthed ? { published: true } : {}) },
      include: {
        user: !!isAuthed,
        likes: true,
        comments: { orderBy: { createdAt: "desc" }, include: { user: true } },
      },
    });
    return posts;
  } catch (error) {
    throw error;
  }
}

export async function GetPostsByUserAction(userId: string) {
  try {
    const isAuthed = await checkIfAuthed();

    const posts = await prisma.post.findMany({
      where: { userId, ...(!isAuthed ? { published: true } : {}) },
      include: {
        user: !!isAuthed,
        likes: true,
        comments: { orderBy: { createdAt: "desc" }, include: { user: true } },
      },
    });
    return posts;
  } catch (error) {
    throw error;
  }
}

export async function GetSinglePostAction(postId: string) {
  try {
    const posts = await prisma.post.findUnique({
      where: { id: postId },
      include: { user: true, comments: true },
    });
    return posts;
  } catch (error) {
    throw error;
  }
}

export async function GetAllPostsAction() {
  try {
    const posts = await prisma.post.findMany({
      include: { likes: true, comments: true },
      orderBy: { createdAt: "desc" },
    });
    return posts;
  } catch (error) {
    throw error;
  }
}

type PaginatedParams = {
  skip: number;
  take: number;
  cursor?: { id: string };
};
export async function GetPaginatedPostAction({
  skip,
  take,
  cursor,
}: PaginatedParams) {
  try {
    const [posts, total] = await prisma.$transaction([
      prisma.post.findMany({
        skip,
        take,
        cursor,
        where: { published: true },
        include: { likes: true, comments: true },
        orderBy: { createdAt: "desc" },
      }),
      prisma.post.count(),
    ]);

    return { pagination: { total }, data: posts };
  } catch (error) {
    throw error;
  }
}
export async function DeletePostAction(postId: string) {
  try {
    const { id: userId } = await handleAuthState();

    await prisma.post.delete({ where: { id: postId, userId } });

    revalidatePath("/dashboard");
  } catch (error) {
    throw error;
  }
}

export async function EditPostAction(data: $UpdatePost) {
  try {
    const { id: userId } = await handleAuthState();

    const { id, title, content, published = false } = data;

    await prisma.post.update({
      where: { id, userId },
      data: { title, content, published },
    });

    revalidatePath("/dashboard");
  } catch (error) {
    throw error;
  }
}

export async function CreatePostAction(data: $InsertPost) {
  try {
    const { id } = await handleAuthState();

    const { title, content, published } = data;

    await prisma.post.create({
      data: { title, content, published, user: { connect: { id } } },
    });

    revalidatePath("/dashboard");
  } catch (error) {
    throw error;
  }
}

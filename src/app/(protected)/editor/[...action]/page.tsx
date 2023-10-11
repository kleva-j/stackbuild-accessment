import { getSinglePostByUser } from "@/lib/posts";
import { Editor } from "@/components/Editor";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/nextAuth";
import { redirect } from "next/navigation";
import { Post } from "@prisma/client";

import prisma from "@/lib/prisma";

const getPostByUser = async (id: string): Promise<Post> => {
  try {
    const session = await getServerSession(authOptions);

    if (!session) redirect("/api/auth/signin");

    const user = await prisma.user.findFirst({
      where: { email: session?.user?.email },
    });

    if (!user) throw new Error("User not found!");

    const post = await getSinglePostByUser(id, user.id);

    if (!post) throw new Error("Post not found!");

    return post[0];
  } catch (err: unknown) {
    throw err;
  }
};

const newPost = { title: "", content: "", published: false };

export default async function Page({
  params,
}: {
  params: { action: string[] };
}) {
  const { action } = params;

  const id = action[0];

  let post = newPost;

  if (id !== "new") {
    post = await getPostByUser(id);
  }

  return <Editor post={{ id, ...post }} />;
}

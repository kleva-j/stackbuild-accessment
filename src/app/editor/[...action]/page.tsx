import { GetSinglePostAction } from "@/app/actions";
import { Editor } from "@/components/Editor";
import { checkIfAuthed } from "@/lib/auth";
import { redirect } from "next/navigation";
import { Post } from "@prisma/client";

const getPostByUser = async (id: string): Promise<Post> => {
  try {
    const user = await checkIfAuthed();

    if (!user) redirect("/api/auth/signin");

    const post = await GetSinglePostAction(id);

    if (!post) throw new Error("Post not found!");

    return post;
  } catch (err: unknown) {
    throw err;
  }
};

const newPost: any = { title: "", content: "", published: false };

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

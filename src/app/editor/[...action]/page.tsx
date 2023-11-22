import { GetSinglePostAction } from "@/app/actions";
import { handleAuthState } from "@/lib/auth";
import { Editor } from "@/components/Editor";
import { Post } from "@prisma/client";
import { z } from "zod";

const fetchPost = async (id: string): Promise<Post | { error: Error }> => {
  try {
    await handleAuthState();
    const post = await GetSinglePostAction(id);
    if (!post) throw new Error("Post not found!");
    return post;
  } catch (err: unknown) {
    return { error: err as Error };
  }
};

type PageProps = { params: { action: string[] } };

export default async function Page({ params }: PageProps) {
  let post: any = { title: "", content: "", published: false };

  const [path, id] = params["action"];

  if (path !== "new") {
    const isValidId = z.string().cuid().safeParse(path);
    if (isValidId.success) post = await fetchPost(path);
    else throw new Error("Invalid post action");
  }

  return <Editor path={path} post={{ id, ...post }} />;
}

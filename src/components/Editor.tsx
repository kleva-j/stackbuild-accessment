"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { CreatePostAction, EditPostAction } from "@/app/actions";
import { errorMessages, postPatchSchema } from "@/lib/constant";
import { $InsertPost, $UpdatePost, Json } from "@/lib/types";
import { InfoCircledIcon } from "@radix-ui/react-icons";
import { zodResolver } from "@hookform/resolvers/zod";
import { ChevronLeft, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { Post } from "@prisma/client";
import { z } from "zod";
import {
  Callout,
  Button,
  Switch,
  Badge,
  Flex,
  Text,
  Box,
} from "@radix-ui/themes";

import TextareaAutosize from "react-textarea-autosize";
import EditorJS from "@editorjs/editorjs";
import Link from "next/link";

const submitActions: Record<string, actionType> = {
  new: CreatePostAction,
  edit: EditPostAction,
};

type CreateActionType = (v: $InsertPost) => Promise<void>;
type EditActionType = (v: $UpdatePost) => Promise<void>;
type actionType = CreateActionType | EditActionType;
type FormData = z.infer<typeof postPatchSchema>;
interface EditorProps {
  post: Pick<Post, "id" | "title" | "content" | "published">;
  path: string;
}

export function Editor({ post, path }: EditorProps) {
  const { register, handleSubmit } = useForm<FormData>({
    resolver: zodResolver(postPatchSchema),
  });

  const ref = useRef<EditorJS>();
  const router = useRouter();

  const [isSaving, setIsSaving] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [isPublished, setPublished] = useState(post.published);

  async function onSubmit(data: FormData) {
    setIsSaving(true);
    const blocks = await ref.current?.save();

    try {
      const values = {
        id: post.id,
        title: data.title,
        published: isPublished,
        content: blocks as unknown as Json,
      } as $UpdatePost & $InsertPost;

      const action = submitActions[path];
      await action(values);

      router.push("/dashboard");
      setShowMessage(false);
    } catch (err) {
      setShowMessage(true);
    }
    setIsSaving(false);
  }

  const initializeEditor = useCallback(async () => {
    const EditorJS = (await import("@editorjs/editorjs")).default;
    const Header = (await import("@editorjs/header")).default;
    const Embed = (await import("@editorjs/embed")).default;
    const Table = (await import("@editorjs/table")).default;
    const List = (await import("@editorjs/list")).default;
    const Code = (await import("@editorjs/code")).default;
    const LinkTool = (await import("@editorjs/link")).default;
    const InlineCode = (await import("@editorjs/inline-code")).default;

    const body = postPatchSchema.parse(post);

    if (!ref.current) {
      const editor = new EditorJS({
        holder: "editor",
        onReady() {
          ref.current = editor;
        },
        placeholder: "Type here to write your post...",
        inlineToolbar: true,
        data: body.content,
        tools: {
          header: Header,
          linkTool: LinkTool,
          list: List,
          code: Code,
          inlineCode: InlineCode,
          table: Table,
          embed: Embed,
        },
      });
    }
  }, [post]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsMounted(true);
    }
  }, []);

  useEffect(() => {
    if (isMounted) {
      initializeEditor();

      return () => {
        ref.current?.destroy();
        ref.current = undefined;
      };
    }
  }, [isMounted, initializeEditor]);

  return (
    <Box my="6" px="4">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Flex direction="column" gap="6">
          <Flex
            direction={{ initial: "column", xs: "row" }}
            gap={{ initial: "6", xs: undefined }}
            justify="between"
          >
            <Flex
              justify={{ initial: "between", xs: "start" }}
              gap={{ initial: "0", xs: "9" }}
              align="center"
            >
              <Button variant="ghost" size="2" asChild>
                <Link href="/dashboard">
                  <ChevronLeft className="h-4 w-4" />
                  Back
                </Link>
              </Button>
              <Badge color={post.published ? "green" : "orange"} radius="large">
                {post.published ? "Published" : "Draft"}
              </Badge>
            </Flex>
            {showMessage && (
              <Callout.Root size="1" color="red">
                <Callout.Icon>
                  <InfoCircledIcon />
                </Callout.Icon>
                <Callout.Text>{errorMessages.update_post_error}</Callout.Text>
              </Callout.Root>
            )}
            <Flex
              gap="6"
              align="center"
              justify={{ initial: "end", md: undefined }}
            >
              <Text as="label" size="2">
                <Flex gap="2" align="center">
                  <Switch
                    size="1"
                    variant="soft"
                    defaultChecked={isPublished}
                    onCheckedChange={setPublished}
                  />
                  <Text size="1" weight="medium">
                    Public
                  </Text>
                </Flex>
              </Text>
              <Button type="submit">
                {isSaving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Save
              </Button>
            </Flex>
          </Flex>
          <div className="prose prose-stone dark:prose-invert mx-auto w-[800px]">
            <TextareaAutosize
              autoFocus
              id="title"
              defaultValue={post.title}
              placeholder="Post title"
              className="w-full resize-none appearance-none overflow-hidden bg-transparent text-5xl font-bold focus:outline-none"
              {...register("title")}
            />
            <div id="editor" className="min-h-[500px]" />
            <input type="text" {...register("content")} className="h-0 w-0" />
            <p className="text-sm text-gray-500">
              Use{" "}
              <kbd className="bg-muted rounded-md border px-1 text-xs uppercase">
                Tab
              </kbd>{" "}
              to open the command menu.
            </p>
          </div>
        </Flex>
      </form>
    </Box>
  );
}

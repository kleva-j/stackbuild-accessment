/* eslint-disable @next/next/no-img-element */
import { JsonRenderer } from "@/app/post/[id]/components/Renderer";
import { ChevronLeft, Heart, MessageSquare } from "lucide-react";
import { redirect } from "next/navigation";
import { z } from "zod";
import {
  AspectRatio,
  IconButton,
  Separator,
  Heading,
  Avatar,
  Flex,
  Link,
  Text,
  Box,
} from "@radix-ui/themes";
import { GetSinglePostAction } from "@/app/actions";

export default async function Page(props: { params: { id: string } }) {
  const { id } = props.params;

  const isValidId = z.string().cuid().safeParse(id);

  if (!isValidId.success) redirect("/");

  const post = await GetSinglePostAction(id);

  if (!post)
    return (
      <Box
        p="4"
        className="rounded-md border-[0.5px] border-slate-300 text-center dark:border-slate-600"
      >
        <Text>Post not found.</Text>
      </Box>
    );

  const date = new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(new Date(post.updatedAt));

  return (
    <Flex gap="5" direction="column" justify="start">
      <Link href="/" className="flex w-max items-center gap-x-3">
        <ChevronLeft className="h-4 w-4" />
        Back
      </Link>
      <Box mx="auto" className="max-w-2xl space-y-9">
        <Box className="space-y-6">
          <Heading size="8">{post.title}</Heading>

          <Flex gap="3" align="center">
            <Avatar
              size="3"
              src={post.user.image ?? ""}
              radius="full"
              fallback="T"
            />
            <Box>
              <Text as="div" size="2" weight="bold">
                {post.user.name}
              </Text>
              <Text as="div" size="1" color="gray">
                {date}
              </Text>
            </Box>
          </Flex>
        </Box>

        <AspectRatio ratio={16 / 8}>
          <img
            src="https://random.imagecdn.app/680/420"
            alt="banner"
            className="mx-auto"
            style={{
              objectFit: "cover",
              width: "100%",
              height: "100%",
            }}
            loading="lazy"
          />
        </AspectRatio>

        <Box>
          <Separator size="4" />
          <Flex gap="4" my="4">
            <Flex align="center" gap="1">
              <IconButton size="1" variant="ghost" radius="full">
                <MessageSquare className="h-4 w-4 cursor-pointer" />
              </IconButton>
              <Text color="gray" ml="1" size="1">
                {post.comments.length}
              </Text>
            </Flex>
            <Flex align="center" gap="1">
              <IconButton size="1" variant="ghost" radius="full">
                <Heart className="h-4 w-4 cursor-pointer" />
              </IconButton>
              <Text color="gray" ml="1" size="1">
                {post.comments.length}
              </Text>
            </Flex>
          </Flex>
          <Separator size="4" />
        </Box>

        <Flex direction="column" gap="3">
          <JsonRenderer data={post.content} />
        </Flex>
      </Box>
    </Flex>
  );
}

import { DeletePost } from "@/app/(protected)/dashboard/components/DeletePost";
import { ThumbsUp, MessageCircle, Pencil } from "lucide-react";
import { checkUserExist } from "@/app/api/post/route";
import { getPostByUser } from "@/lib/posts";
import { User } from "@prisma/client";
import {
  IconButton,
  Tooltip,
  Card,
  Badge,
  Flex,
  Text,
  Box,
} from "@radix-ui/themes";

import Link from "next/link";

export const Posts = async () => {
  const user = (await checkUserExist()) as User;

  const posts = await getPostByUser(user?.id);

  if (!posts)
    return (
      <Box
        p="4"
        className="rounded-md border-[0.5px] border-slate-300 text-center dark:border-slate-600"
      >
        <Text>No post created yet.</Text>
      </Box>
    );

  return (
    <Flex direction="column" gap="4">
      {posts.map((post) => {
        const formattedDate = new Intl.DateTimeFormat("en-US", {
          year: "numeric",
          month: "short",
          day: "numeric",
        }).format(new Date(post.updatedAt));

        return (
          <Card key={post.id}>
            <Flex justify="between" align="center">
              <Flex direction="column" gap="2">
                <Link href={`/editor/${post.id}`}>
                  <Text as="div" size="2" weight="bold">
                    {post.title}
                  </Text>
                </Link>
                <Flex
                  display={{ initial: "none", xs: "flex" }}
                  gap="4"
                  align="center"
                >
                  <Text as="div" size="1" color="gray">
                    {formattedDate}
                  </Text>
                  <Badge
                    color={post.published ? "green" : "orange"}
                    radius="large"
                    size="1"
                  >
                    {post.published ? "Published" : "Draft"}
                  </Badge>
                  <Flex align="center" gap="2">
                    <Flex align="center">
                      <IconButton size="1" variant="ghost">
                        <MessageCircle className="h-4 w-4" />
                      </IconButton>
                      <Text color="gray" ml="1" size="1">
                        {post.comments.length}
                      </Text>
                    </Flex>
                    <Flex align="center">
                      <IconButton size="1" variant="ghost">
                        <ThumbsUp className="h-4 w-4" />
                      </IconButton>
                      <Text color="gray" ml="1" size="1">
                        {post.likes.length}
                      </Text>
                    </Flex>
                  </Flex>
                </Flex>
              </Flex>

              <Flex gap="4" mr="2">
                <Tooltip content="Edit">
                  <IconButton variant="ghost" radius="full" size="1" asChild>
                    <Link href={`/editor/${post.id}`}>
                      <Pencil className="h-4 w-4" />
                    </Link>
                  </IconButton>
                </Tooltip>

                <DeletePost postId={post.id} />
              </Flex>
            </Flex>
          </Card>
        );
      })}
    </Flex>
  );
};

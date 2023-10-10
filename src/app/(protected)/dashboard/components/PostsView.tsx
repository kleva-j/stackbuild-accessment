import { OptionMenu } from "@/app/(protected)/dashboard/components/OptionMenu";
import { Card, Flex, Text, Box } from "@radix-ui/themes";
import { checkUserExist } from "@/app/api/post/route";
import { getPostByUser } from "@/lib/posts";
import { User } from "@prisma/client";

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
          month: "long",
          day: "numeric",
        }).format(new Date(post.updatedAt));

        return (
          <Card key={post.id}>
            <Flex justify="between" align="center">
              <Box>
                <Text as="div" size="2" weight="bold">
                  {post.title}
                </Text>
                <Text as="div" size="2" color="gray">
                  {formattedDate}
                </Text>
              </Box>
              <OptionMenu />
            </Flex>
          </Card>
        );
      })}
    </Flex>
  );
};

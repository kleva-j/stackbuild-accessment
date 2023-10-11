import { Posts } from "@/app/(protected)/dashboard/components/PostsView";
import { Box, Flex, Text, Heading, Button } from "@radix-ui/themes";
import { PlusIcon } from "@radix-ui/react-icons";

import Link from "next/link";

export default function Page() {
  return (
    <Flex direction="column" gap="5" className="flex-1">
      <Flex justify="between">
        <Box>
          <Heading size="8" mb="1">
            Posts
          </Heading>
          <Text>Create and manage your posts</Text>
        </Box>
        <Button asChild>
          <Link href="/editor/new">
            <PlusIcon /> New Post
          </Link>
        </Button>
      </Flex>
      <Posts />
    </Flex>
  );
}

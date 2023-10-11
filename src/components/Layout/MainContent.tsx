import { Flex, Box, Container, Heading } from "@radix-ui/themes";
import { PostFeed } from "@/components/PostFeed";

export default function MainContent() {
  return (
    <Box px="4" className="">
      <Container size="4">
        <Flex direction="column" gap="7" my="8">
          <Heading size="7">Latest Blog</Heading>
          <PostFeed />
        </Flex>
      </Container>
    </Box>
  );
}

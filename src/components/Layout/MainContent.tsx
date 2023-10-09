"use client";

import { Flex, Box, Container, Heading } from "@radix-ui/themes";

export default function MainContent() {
  return (
    <Box px="4" className="">
      <Container size="4">
        <Flex direction="column" gap="7" mt="8">
          <Heading size="7">Latest Blog</Heading>
        </Flex>
      </Container>
    </Box>
  );
}

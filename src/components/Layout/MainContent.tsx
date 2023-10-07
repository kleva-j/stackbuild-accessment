"use client";

import { Button, Text, Flex, Box } from "@radix-ui/themes";

export default function MainContent() {
  return (
    <Box px="4" className="mt-16 pt-16">
      <Flex direction="column" align="center" justify="center" gap="2">
        <Text>Hello from XDR</Text>
        <Box width="max-content">
          <Button radius="large">Let&apos;s go</Button>
        </Box>
      </Flex>
    </Box>
  );
}

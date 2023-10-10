/* eslint-disable @next/next/no-img-element */
import { Card, Flex, Inset, Text } from "@radix-ui/themes";
import { Post } from "@prisma/client";

import Image from "next/image";

export const PostCard = ({ title, content }: Post) => {
  return (
    <Card size="2" style={{ maxWidth: 320 }}>
      <Inset clip="padding-box" side="top" pb="current">
        <img
          src="https://images.unsplash.com/photo-1617050318658-a9a3175e34cb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80"
          alt="Bold typography"
          style={{
            display: "block",
            objectFit: "cover",
            width: "100%",
            height: 140,
            backgroundColor: "var(--gray-5)",
          }}
        />
      </Inset>
      <Flex gap="2" direction="column">
        <Text as="div" size="3" weight="bold">
          {title}
        </Text>
        <Text as="p" size="2">
          {content}
        </Text>
      </Flex>
    </Card>
  );
};

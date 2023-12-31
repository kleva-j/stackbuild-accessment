/* eslint-disable @next/next/no-img-element */
import { Card, Inset, Text } from "@radix-ui/themes";
import { Post } from "@prisma/client";

import Link from "next/link";

export const PostCard = ({ title, id }: Post) => {
  return (
    <Card size="2" style={{ maxWidth: 300 }} asChild>
      <Link href={`/post/${id}`}>
        <Inset clip="padding-box" side="top" pb="current">
          <img
            src="https://images.unsplash.com/photo-1617050318658-a9a3175e34cb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80"
            alt="Bold typography"
            style={{
              display: "block",
              objectFit: "cover",
              width: "100%",
              height: 150,
              backgroundColor: "var(--gray-5)",
            }}
          />
        </Inset>
        <Text as="div" size="3" weight="bold">
          {title}
        </Text>
      </Link>
    </Card>
  );
};

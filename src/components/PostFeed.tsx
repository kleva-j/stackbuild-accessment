"use client";

import { Callout, Flex, Link, Box } from "@radix-ui/themes";
import { InfoCircledIcon } from "@radix-ui/react-icons";
import { useQuery } from "@tanstack/react-query";
import { CardList } from "./PostCardList";
import { fetchPosts } from "@/lib/api";

export const PostFeed = () => {
  const query = useQuery({ queryKey: ["posts"], queryFn: fetchPosts });

  return (
    <Flex>
      {query.isLoading ? (
        <Box height="9" mx="auto" className="text-center">
          ...loading
        </Box>
      ) : query.isError ? (
        <Callout.Root>
          <Callout.Icon>
            <InfoCircledIcon />
          </Callout.Icon>
          <Callout.Text>
            An error occured while loading the posts.{" "}
            <Link onClick={() => query.refetch()}>Retry</Link>
          </Callout.Text>
        </Callout.Root>
      ) : (
        <CardList data={query.data} />
      )}
    </Flex>
  );
};

"use client";

import { InfoCircledIcon } from "@radix-ui/react-icons";
import { Callout, Flex, Link } from "@radix-ui/themes";
import { CardList } from "@/components/PostCardList";
import { useQuery } from "@tanstack/react-query";
import { fetchPosts } from "@/lib/api";

import Loading from "@/app/(protected)/dashboard/loading";

export const PostFeed = () => {
  const query = useQuery({ queryKey: ["posts"], queryFn: fetchPosts });

  return (
    <Flex>
      {query.isLoading ? (
        <Loading />
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

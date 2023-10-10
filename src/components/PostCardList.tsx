import { PostCard } from "@/components/PostCard";
import { Grid } from "@radix-ui/themes";
import { Post } from "@prisma/client";
import { AxiosResponse } from "axios";

interface CardListProps {
  data: AxiosResponse<{ posts: Post[] }>;
}

export const CardList = ({ data }: CardListProps) => {
  const posts = data.data.posts;

  return (
    <Grid
      columns={{ initial: "1", xs: "2", sm: "3" }}
      width="auto"
      mx="auto"
      gap="7"
    >
      {posts.map((post) => (
        <PostCard key={post.id} {...post} />
      ))}
    </Grid>
  );
};

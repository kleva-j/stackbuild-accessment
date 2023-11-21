import { Container, Grid, Flex, Heading } from "@radix-ui/themes";
import { GetPaginatedPostAction } from "@/app/actions";
import { PostCard } from "@/components/PostCard";
import { Pager } from "@/components/Pager";

type PageProps = {
  params: { name: string; id: string };
  searchParams: { page?: string };
};

const getPosts = async (page = 1, take = 9) => {
  return GetPaginatedPostAction({ skip: (page - 1) * take, take });
};

export default async function Home({ searchParams }: PageProps) {
  const page = Number(searchParams.page || 1);

  const { pagination, data: posts } = await getPosts(page);

  return (
    <Container size="4" my="8">
      <Flex direction="column" gap="8">
        <Grid
          columns={{ initial: "1", xs: "2", sm: "3" }}
          width="auto"
          mx="auto"
          flow="row-dense"
          gap="8"
          className="justify-evenly max-md:px-4"
        >
          <Heading size="7">Latest Blog</Heading>
          {posts.map((post) => (
            <PostCard key={post.id} {...post} />
          ))}
        </Grid>
        <Pager total={pagination.total} page={page} />
      </Flex>
    </Container>
  );
}

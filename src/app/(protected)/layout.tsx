import { Box, Flex, Grid } from "@radix-ui/themes";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { PropsWithChildren } from "react";

export default async function Layout({ children }: PropsWithChildren) {
  const session = await getServerSession();

  if (!session || !session.user) {
    redirect("/api/auth/signin");
  }

  return (
    <Grid columns="2" gap="3" width="auto">
      <Box height="9">
        <Flex></Flex>
      </Box>
      <Box height="9">
        <Box>{children}</Box>
      </Box>
    </Grid>
  );
}

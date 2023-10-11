import prisma from "@/lib/prisma";

interface $InserPost {
  userId: string;
  title: string;
  content: string;
  published?: boolean;
}

interface $UpdatePost extends $InserPost {}

export const getPaginatedPosts = async (
  skip: number,
  take = 10,
  cursor?: { id: string },
) => {
  const posts = await prisma.post.findMany({
    skip,
    take,
    ...(cursor ? { cursor } : {}),
    include: {
      user: true,
      likes: true,
      comments: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  return posts;
};

export const getAllPosts = async () => {
  const posts = await prisma.post.findMany({
    include: {
      user: true,
      likes: true,
      comments: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  return posts;
};

export const getPostByUser = async (userId: string) => {
  const posts = await prisma.post.findMany({
    where: { userId },
    include: {
      user: true,
      likes: true,
      comments: {
        orderBy: {
          createdAt: "desc",
        },
        include: {
          user: true,
        },
      },
    },
  });
  return posts;
};

export const getSinglePostByUser = async (id: string, userId: string) => {
  const posts = await prisma.post.findMany({
    where: { userId, id },
  });
  return posts;
};

export const getSinglePost = async (id: string) => {
  const post = await prisma.post.findUnique({
    where: {
      id: id,
    },
    include: {
      user: true,
      likes: true,
      comments: {
        orderBy: {
          createdAt: "desc",
        },
        include: {
          user: true,
        },
      },
    },
  });
  return post;
};

export const saveNewPost = async (params: $InserPost) => {
  const { userId, title, content, published } = params;

  const post = await prisma.post.create({
    data: {
      title,
      content,
      published,
      user: {
        connect: { id: userId },
      },
    },
  });

  return post;
};

export const updatePost = async (id: string, params: $UpdatePost) => {
  const { userId, title, content, published = false } = params;

  const post = await prisma.post.update({
    where: { id, userId },
    data: { title, content, published },
  });

  return post;
};

export const deletePost = async (id: string, userId: string) => {
  const post = await prisma.post.delete({
    where: { id, userId },
  });
  return post;
};

import { Post } from "@prisma/client";

import axios from "axios";

const baseURL = process.env.NEXTAUTH_URL ?? "";
const postUrl = `${baseURL}/api/post`;

type InsertPost = Pick<Post, "title" | "content" | "published">;

export async function fetchPosts() {
  return axios({ method: "get", url: postUrl });
}

export async function createPost(post: InsertPost) {
  const { title, content, published } = post;

  return axios({
    method: "post",
    url: postUrl,
    data: { title, content, published },
    headers: {
      "Content-Type": "application/json",
    },
  });
}

export async function updatePost(post: InsertPost & { id: string }) {
  const { id, title, content, published } = post;

  return axios({
    method: "put",
    url: postUrl,
    data: { id, title, content, published },
    headers: {
      "Content-Type": "application/json",
    },
  });
}

export async function deletePost(id: string) {
  return axios({
    method: "delete",
    url: postUrl,
    data: { id },
    headers: {
      "Content-Type": "application/json",
    },
  });
}

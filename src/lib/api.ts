import axios, { AxiosRequestConfig } from "axios";

const baseURL = process.env.NEXTAUTH_URL ?? "";

const apiHandler = (path: string) => {
  return (config?: AxiosRequestConfig<any>) =>
    axios.get(`${baseURL}/api/${path}`, { ...config });
};

export async function fetchPosts() {
  return apiHandler("post")();
}

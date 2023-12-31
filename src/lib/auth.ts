import { auth, clerkClient } from "@clerk/nextjs";

export function getBaseUrl() {
  if (typeof window !== "undefined" && window.location) {
    return "";
  }
  return process.env.NODE_ENV === "development"
    ? "https://localhost:3000"
    : process.env.VERCEL_URL;
}

export async function checkIfAuthed() {
  const { userId } = auth();
  return userId ? await clerkClient.users.getUser(userId) : null;
}

export async function handleAuthState() {
  const authState = await checkIfAuthed();
  if (!authState) throw new Error("Unauthorized", { cause: "401" });
  return authState;
}

export async function getUser(userId: string) {
  const user = await clerkClient.users.getUser(userId);
  return user ?? null;
}

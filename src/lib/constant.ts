import { z } from "zod";

export const postPatchSchema = z.object({
  title: z.string(),
  content: z.string(),
  published: z.boolean().default(false),
});

export const errorMessages = {
  update_post_error: "An error occured while saving your post.",
};

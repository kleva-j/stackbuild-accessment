"use client";

import { AlertDialog, IconButton, Button, Flex } from "@radix-ui/themes";
import { DeletePostAction } from "@/app/actions";
import { useRouter } from "next/navigation";
import { Trash2 } from "lucide-react";

export const DeletePost = ({ postId }: { postId: string }) => {
  const router = useRouter();

  const handleDelete = async () => {
    await DeletePostAction(postId);
    router.refresh();
  };

  return (
    <AlertDialog.Root>
      <AlertDialog.Trigger>
        <IconButton variant="ghost" size="1" className="cursor-pointer">
          <Trash2 className="h-4 w-4" />
        </IconButton>
      </AlertDialog.Trigger>
      <AlertDialog.Content>
        <AlertDialog.Title>Are you sure?</AlertDialog.Title>
        <AlertDialog.Description size="2">
          Are you sure you want to delete this post?.
        </AlertDialog.Description>

        <Flex gap="3" mt="4" justify="end">
          <AlertDialog.Cancel>
            <Button variant="soft" color="gray">
              Cancel
            </Button>
          </AlertDialog.Cancel>
          <AlertDialog.Action onClick={handleDelete}>
            <Button variant="solid" color="red">
              Delete
            </Button>
          </AlertDialog.Action>
        </Flex>
      </AlertDialog.Content>
    </AlertDialog.Root>
  );
};

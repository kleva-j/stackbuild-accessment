"use client";

import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import {
  AlertDialog,
  IconButton,
  Popover,
  Button,
  Text,
  Flex,
} from "@radix-ui/themes";

export const OptionMenu = () => {
  return (
    <Popover.Root>
      <Popover.Trigger>
        <IconButton size="2" variant="outline" color="gray" radius="large">
          <DotsHorizontalIcon />
        </IconButton>
      </Popover.Trigger>
      <Popover.Content>
        <Flex direction="column" gap="3">
          <Button size="1" color="gray" radius="large">
            <Text size="1">Edit</Text>
          </Button>
          <AlertDialog.Root>
            <AlertDialog.Trigger>
              <Button size="1" color="red" radius="large">
                <Text size="1">Delete</Text>
              </Button>
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
                <AlertDialog.Action>
                  <Button variant="solid" color="red">
                    Delete
                  </Button>
                </AlertDialog.Action>
              </Flex>
            </AlertDialog.Content>
          </AlertDialog.Root>
        </Flex>
      </Popover.Content>
    </Popover.Root>
  );
};

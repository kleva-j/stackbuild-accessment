import { Heading, Flex, Text } from "@radix-ui/themes";

export default function SettingsPage() {
  return (
    <Flex direction="column" gap="2">
      <Heading size="8" mb="1">
        Settings
      </Heading>
      <Text size="2">You can adjust your settings below.</Text>
    </Flex>
  );
}

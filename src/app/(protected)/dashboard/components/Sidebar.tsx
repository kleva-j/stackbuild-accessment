"use client";

import { FileTextIcon, GearIcon } from "@radix-ui/react-icons";
import { Button, Flex, Text } from "@radix-ui/themes";
import { usePathname } from "next/navigation";

import Link from "next/link";

type NavLinks = {
  href: string;
  path: string;
  label: string;
  icon: typeof GearIcon;
}[];

const navLinks: NavLinks = [
  { href: "/dashboard", label: "blog", path: "dashboard", icon: FileTextIcon },
  {
    href: "/dashboard/settings",
    label: "settings",
    path: "settings",
    icon: GearIcon,
  },
];

export const Sidebar = () => {
  const pathname = usePathname() ?? "";
  const path = pathname.split("/").pop();

  return (
    <Flex
      display={{ initial: "none", sm: "flex" }}
      direction="column"
      gap="2"
      className="w-40"
    >
      {navLinks.map((item) => {
        const Icon = item.icon;
        const isActive = path == item.path;
        return (
          <Button
            key={item.label}
            variant="soft"
            className="cursor-pointer"
            {...(!isActive ? { color: "gray" } : {})}
            asChild
          >
            <Link href={item.href}>
              <Flex justify="start" align="center" width="100%" gap="2">
                <Icon />
                <Text className="capitalize">{item.label}</Text>
              </Flex>
            </Link>
          </Button>
        );
      })}
    </Flex>
  );
};

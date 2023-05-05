import { ActionIcon, Group, Navbar, Text } from "@mantine/core";
import { IconBrandGithub } from "@tabler/icons";

function SidebarFooter() {
  return (
    <Navbar.Section>
      <Group position="apart">
        <Text size="sm">© 2023 George Tanev</Text>
        <ActionIcon
          radius="xl"
          variant="transparent"
          component="a"
          href="https://github.com/gtanev/mcsc-sankey"
          target="_blank"
          rel="noopener noreferrer"
        >
          <IconBrandGithub />
        </ActionIcon>
      </Group>
    </Navbar.Section>
  );
}

export default SidebarFooter;

import { Group, Navbar, UnstyledButton } from "@mantine/core";
import { ReactComponent as MCSCLogo } from "./mcsc-logo.svg";

function SidebarHeader() {
  return (
    <Navbar.Section>
      <UnstyledButton
        component="a"
        href="https://impactclimate.mit.edu/"
        target="_blank"
        rel="noopener noreferrer"
      >
        <Group>
          <MCSCLogo />
        </Group>
      </UnstyledButton>
    </Navbar.Section>
  );
}

export default SidebarHeader;

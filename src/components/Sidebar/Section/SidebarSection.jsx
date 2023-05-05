import { Navbar } from "@mantine/core";
import SidebarSectionTitle from "./SidebarSectionTitle";

function SidebarSection({ title, children, ...rest }) {
  return (
    <>
      <SidebarSectionTitle text={title} />
      <Navbar.Section mt="md" {...rest}>
        {children}
      </Navbar.Section>
    </>
  );
}

export default SidebarSection;

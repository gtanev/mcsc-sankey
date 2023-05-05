import { Navbar } from "@mantine/core";
import { SIDEBAR } from "../../utils/constants";
import SidebarHeader from "./Header/SidebarHeader";
import SidebarBody from "./Body/SidebarBody";
import SidebarFooter from "./Footer/SidebarFooter";
import SidebarDivider from "./SidebarDivider";

function Sidebar() {
  return (
    <Navbar height={SIDEBAR.height} width={{ base: SIDEBAR.width }} p="lg">
      <SidebarHeader />
      <SidebarDivider />
      <SidebarBody />
      <SidebarDivider />
      <SidebarFooter />
    </Navbar>
  );
}

export default Sidebar;

import React, { useMemo } from "react";
import { ScrollArea } from "@mantine/core";
import Toggles from "./Toggles";
import Legend from "./Legend";
import SidebarDivider from "../SidebarDivider";
import SidebarSection from "../Section/SidebarSection";

function SidebarBody() {
  const ScrollWrapper = useMemo(() => ({ ...ScrollArea, defaultProps: { type: "auto" } }), []);

  return (
    <>
      <SidebarSection title={"Settings"}>
        <Toggles />
      </SidebarSection>
      <SidebarDivider />
      <SidebarSection title={"Legend"} component={ScrollWrapper} grow>
        <Legend />
      </SidebarSection>
    </>
  );
}

export default SidebarBody;

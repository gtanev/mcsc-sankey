import React, { useEffect, useMemo } from "react";
import { useGlobalState } from "../state/provider";
import { loadData } from "../state/actions";
import { AppShell, Center, Loader } from "@mantine/core";
import Sidebar from "../components/Sidebar/Sidebar";
import { sankeyCircular } from "d3-sankey-circular-links";
import Sankey from "../components/Sankey/Sankey";

function AppContainer() {
  const [state, dispatch] = useGlobalState();
  const sankey = useMemo(() => sankeyCircular(), []);

  useEffect(() => loadData(dispatch), []);

  if (!state.data?.nodes?.length) {
    return (
      <Center mih="100vh">
        <Loader color="dark" size="lg" variant="dots" />
      </Center>
    );
  }

  return (
    <AppShell padding={0} navbar={<Sidebar />}>
      <Sankey sankey={sankey} />
    </AppShell>
  );
}

export default AppContainer;

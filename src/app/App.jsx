import React from "react";
import { StateProvider } from "../state/provider";
import { MantineProvider } from "@mantine/core";
import { NotificationsProvider } from "@mantine/notifications";
import AppContainer from "./AppContainer";
import THEME from "../utils/theme";

function App() {
  return (
    <StateProvider>
      <MantineProvider withGlobalStyles withNormalizeCSS withCSSVariables theme={THEME}>
        <NotificationsProvider position="top-right">
          <AppContainer />
        </NotificationsProvider>
      </MantineProvider>
    </StateProvider>
  );
}

export default App;

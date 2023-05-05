import { Stack, Switch } from "@mantine/core";
import { cleanNotifications, showNotification } from "@mantine/notifications";
import { useGlobalState } from "../../../state/provider";
import { setAnimateFlows, setDisambiguateTypes, setDragEnabled } from "../../../state/actions";

function Toggles() {
  const [state, dispatch] = useGlobalState();

  const toggleDragNotification = (checked = state.dragEnabled) => {
    cleanNotifications();
    showNotification({
      color: "blue",
      autoClose: 5000,
      title: checked
        ? "Node dragging enabled"
        : "Node dragging disabled",
      message: checked
        ? "Drag a node to change its position"
        : "Click a node to see a full list of its inflows and outflows",
    });
  };

  const setChecked = (event) => {
    const { value, checked } = event.currentTarget;

    switch (value) {
      case "animateFlows":
        setAnimateFlows(dispatch, checked);
        break;
      case "disambiguateTypes":
        setDisambiguateTypes(dispatch, checked);
        break;
      case "dragEnabled":
        setDragEnabled(dispatch, checked);
        toggleDragNotification(checked);
        break;
    }
  };

  return (
    <Stack spacing="lg">
      <Switch
        value="disambiguateTypes"
        label="Highlight flow types"
        checked={state.disambiguateTypes}
        onChange={setChecked}
      />
      <Switch
        value="animateFlows"
        label="Animate flows"
        checked={state.animateFlows}
        onChange={setChecked}
      />
      <Switch
        value="dragEnabled"
        label="Enable node dragging"
        checked={state.dragEnabled}
        onChange={setChecked}
      />
    </Stack>
  );
}

export default Toggles;

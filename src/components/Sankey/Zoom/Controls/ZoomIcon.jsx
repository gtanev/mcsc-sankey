import { ActionIcon } from "@mantine/core";

function ZoomIcon({ Icon, onClick, variant = "default" }) {
  return (
    <ActionIcon variant={variant} mt={5} ml={5}>
      <Icon size={20} onClick={onClick} />
    </ActionIcon>
  );
}

export default ZoomIcon;

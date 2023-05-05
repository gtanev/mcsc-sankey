import { ActionIcon, Group, Text } from "@mantine/core";
import { IconX } from "@tabler/icons";

function SankeyDialogHeader({ title, onClose }) {
  return (
    <Group className="dialog-header" position="apart">
      <Text weight={700}>{title}</Text>
      <ActionIcon onClick={onClose}>
        <IconX size={16} />
      </ActionIcon>
    </Group>
  );
}

export default SankeyDialogHeader;

import { Divider, Text } from "@mantine/core";

function SidebarSectionTitle({ text }) {
  return (
    <Divider
      size="sm"
      color="transparent"
      label={
        text && (
          <Text size="sm" weight="bold" color="black">
            {text}
          </Text>
        )
      }
    />
  );
}

export default SidebarSectionTitle;

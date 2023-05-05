import { ActionIcon, Collapse, Flex, Text, useMantineTheme } from "@mantine/core";
import { IconInfoCircle } from "@tabler/icons";
import { useState } from "react";
import { TITLE } from "../../../utils/constants";

function SankeyTitle() {
  const [opened, setOpened] = useState(false);
  const titleColor = useMantineTheme().colors["blue"][6];

  const infoIcon = (
    <ActionIcon m={0} style={{ backgroundColor: "transparent", cursor: "default" }}>
      <IconInfoCircle
        color={titleColor}
        size={26}
        onPointerEnter={() => setOpened(true)}
        onPointerLeave={() => setOpened(false)}
      />
    </ActionIcon>
  );

  return (
    <Flex
      style={{ position: "absolute", top: 0, right: 0, userSelect: "none" }}
      align="center"
      mx="lg"
      my="lg"
    >
      <Collapse in={opened} m={0} p={0}>
        <Text
          size="sm"
          color={titleColor}
          px="xs"
          weight="bold"
          transform="uppercase"
          style={{ letterSpacing: "0.25ch" }}
        >
          {TITLE}
        </Text>
      </Collapse>
      {infoIcon}
    </Flex>
  );
}

export default SankeyTitle;

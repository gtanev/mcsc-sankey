import { Alert, Flex, Group, Space, Text } from "@mantine/core";
import { IconArrowBackUp, IconArrowForwardUp } from "@tabler/icons";
import { useMemo } from "react";
import FlowTable from "./FlowTable";

function SankeyDialogBody({ node }) {
  const { sourceLinks, targetLinks } = node;

  const outFlows = useMemo(() => {
    return sourceLinks.map((link) => {
      const { type, category, source, target, value, color } = link;
      return { type, category, value, color, source: source.name, target: target.name };
    });
  }, [sourceLinks]);

  const inFlows = useMemo(() => {
    return targetLinks.map((link) => {
      const { type, category, source, target, value, color } = link;
      return { type, category, value, color, source: source.name, target: target.name };
    });
  }, [targetLinks]);

  const AlertTitle = ({ text, Icon }) => (
    <Group style={{ columnGap: 0 }}>
      <Text mr="sm">{text}</Text>
      <Icon size={20} />
    </Group>
  );

  return (
    <Flex gap={0} justify="center" direction="column">
      <Alert
        title={<AlertTitle text="Inflows" Icon={IconArrowBackUp} />}
        color="blue"
        variant="outline"
      >
        <FlowTable flows={inFlows} inbound />
      </Alert>
      <Space w="md" h="md" />
      <Alert
        title={<AlertTitle text="Outflows" Icon={IconArrowForwardUp} />}
        color="blue"
        variant="outline"
      >
        <FlowTable flows={outFlows} outbound />
      </Alert>
    </Flex>
  );
}

export default SankeyDialogBody;

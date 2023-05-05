import React, { useMemo } from "react";
import { ColorSwatch, Flex, ScrollArea, Space, Table, Text } from "@mantine/core";
import { roundNumber } from "../../../utils/helpers";

function FlowTable({ flows, inbound }) {
  if (!flows?.length) {
    return <Text>None</Text>;
  }

  flows.sort((a, b) =>
    inbound
      ? a.source.localeCompare(b.source) || a.category > b.category
      : a.target.localeCompare(b.target) || a.category > b.category
  );

  const categoryWithSwatch = (category, color) => (
    <Flex justify="flex-start" align="center" wrap="nowrap">
      <ColorSwatch color={color} size={12} miw={12} radius={0}></ColorSwatch>
      <Space w="xs" />
      {category}
    </Flex>
  );

  const rows = useMemo(
    () =>
      flows.map((flow, idx) => (
        <tr key={`flow-${idx}`}>
          <td>{inbound === true ? flow.source : flow.target}</td>
          <td>{flow.type}</td>
          <td>{categoryWithSwatch(flow.category, flow.color)}</td>
          <td>{flow.value}</td>
        </tr>
      )),
    [flows]
  );

  const footer = useMemo(
    () => (
      <tr>
        <th>Total</th>
        <th></th>
        <th></th>
        <th>{roundNumber(flows.reduce((a, b) => a + b.value, 0), 2)}</th>
      </tr>
    ),
    [flows]
  );

  return (
    <ScrollArea.Autosize
      maxHeight={"30vh"}
      type="auto"
      styles={(theme) => ({
        scrollbar: {
          "&, &:hover": {
            background: theme.colors["gray"][1],
          },
          '&[data-orientation="vertical"] .mantine-ScrollArea-thumb': {
            backgroundColor: theme.colors["blue"][6],
          },
          '&[data-orientation="vertical"] .mantine-ScrollArea-thumb:hover': {
            backgroundColor: theme.colors["blue"][7],
          },
        },
      })}
    >
      <Table horizontalSpacing="md" highlightOnHover>
        <thead>
          <tr>
            <th width={200}>{inbound === true ? "Source" : "Target"}</th>
            <th width={100}>Type</th>
            <th width={200}>Category</th>
            <th>Quantity (Mt/Mtoe)</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
        <tfoot>{footer}</tfoot>
      </Table>
    </ScrollArea.Autosize>
  );
}

export default FlowTable;

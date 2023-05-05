import { ColorSwatch, Group, Stack, Text } from "@mantine/core";
import { useGlobalState } from "../../../state/provider";
import { LEGEND } from "../../../utils/constants";
import { groupByFn, groupByKey } from "../../../utils/helpers";
import { Fragment } from "react";

function Legend() {
  const [state] = useGlobalState();
  const { disambiguateTypes, data } = state;

  const transformFn = (link) => link.category.split(" (")[0];

  const distinctLinksByCategory = groupByFn(data.links, transformFn);
  distinctLinksByCategory.sort((a, b) => a.category.localeCompare(b.category));

  const distinctLinkCategoriesByColor = groupByKey(distinctLinksByCategory, "color", transformFn);
  const distinctLinksByType = groupByFn(data.links, (link) => link.type);

  const LabeledSwatch = ({ color, label }) => (
    <Group spacing="sm" style={{ columnGap: "unset" }} align="start" noWrap>
      <ColorSwatch color={color} radius={0} size={20} style={{ minWidth: 20 }} />
      <Text size="sm" ml={12} lineClamp>
        {label.split("\n").map((line, index) => (
          <Fragment key={`${color}_${index}`}>
            {line}
            <br />
          </Fragment>
        ))}
      </Text>
    </Group>
  );

  return (
    <Stack spacing="lg">
      {disambiguateTypes
        ? distinctLinksByType.map((link, index) => (
            <LabeledSwatch key={`l-${index}`} color={LEGEND[link.type]} label={link.type} />
          ))
        : Object.keys(distinctLinkCategoriesByColor).map((colorKey, index) => (
            <LabeledSwatch
              key={`c-${index}`}
              color={colorKey}
              label={distinctLinkCategoriesByColor[colorKey].join("\n")}
            />
          ))}
    </Stack>
  );
}

export default Legend;

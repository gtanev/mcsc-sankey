import { useMemo } from "react";
import { useMantineTheme } from "@mantine/core";
import { Text } from "@visx/text";
import { Group } from "@visx/group";
import { Bar } from "@visx/shape";
import { useGlobalState } from "../../../../state/provider";
import { SANKEY_PROPS, SVG } from "../../../../utils/constants";
import THEME from "../../../../utils/theme";
import SankeyDialog from "../../Dialog/SankeyDialog";

function SankeyNode({ node, ...optionalProps }) {
  const [state] = useGlobalState();
  const theme = useMantineTheme();

  const {
    activeNode,
    dragEnabled,
    data: { maxSort },
  } = state;

  const {
    cx,
    cy,
    transform,
    isDragging,
    onMouseMove,
    onMouseUp,
    onMouseDown,
    onMouseOver,
    onMouseOut,
    onTouchMove,
    onTouchStart,
    onTouchEnd,
  } = optionalProps;

  const { nodeWidth } = SANKEY_PROPS;
  const nodeTextGap = 10;
  const isRightMost = node.sort === maxSort;

  const nodeOpacity = useMemo(() => {
    if (activeNode == null) {
      return SVG.NODE_OPACITY.default;
    }

    if (
      activeNode.name === node.name ||
      activeNode.sourceLinks.some((link) => link.target?.name === node.name) ||
      activeNode.targetLinks.some((link) => link.source?.name === node.name)
    ) {
      return SVG.NODE_OPACITY.active;
    }

    return SVG.NODE_OPACITY.inactive;
  }, [activeNode]);

  return (
    <Group
      top={node.y0}
      left={node.x0}
      id={`group-${node.name}`}
      cursor="pointer"
      transform={transform}
    >
      <SankeyDialog node={node} onClose={onMouseOut} hide={dragEnabled}>
        <Bar
          id={`rect-${node.name}`}
          width={node.x1 - node.x0}
          height={node.y1 - node.y0}
          fill="black"
          stroke="black"
          opacity={nodeOpacity}
          strokeWidth={1}
          x={cx}
          y={cy}
          onMouseOver={onMouseOver}
          onMouseOut={onMouseOut}
          onMouseMove={onMouseMove}
          onMouseUp={onMouseUp}
          onMouseDown={onMouseDown}
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
        />
      </SankeyDialog>
      <Text
        x={(isRightMost ? -nodeTextGap : nodeWidth + nodeTextGap) + (cx ?? 0)}
        y={Math.ceil((node.y1 - node.y0) / 2) + (cy ?? 0)}
        verticalAnchor="middle"
        width={120}
        fontSize={20}
        fontFamily={THEME.headings.fontFamily}
        fontWeight={800}
        textAnchor={isRightMost ? "end" : "start"}
        opacity={activeNode ? nodeOpacity : 1}
        pointerEvents="none"
        style={{ userSelect: "none" }}
        stroke={theme.colors["gray"][1]}
        strokeWidth={0.33}
        strokeOpacity={0.66}
        strokeLinejoin="round"
      >
        {node.name.toUpperCase()}
      </Text>
    </Group>
  );
}

export default SankeyNode;

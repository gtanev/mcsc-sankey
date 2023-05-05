import { memo, useMemo } from "react";
import { useGlobalState } from "../../state/provider";
import useWindowSize from "../../hooks/useWindowSize";
import { SANKEY_PROPS } from "../../utils/constants";
import SankeyContainer from "./SankeyContainer";
import deepClone from "clone";

function Sankey({ sankey }) {
  const [state] = useGlobalState();
  const { height, width } = useWindowSize();

  const { data } = state;
  const {
    sortKey,
    nodeAlign,
    nodeWidth,
    nodePadding,
    nodePaddingRatio,
    iterations,
    linkIterations,
    circularLinkGap,
    circularLinkMargin,
    circularLinkRadius,
    scaleFactor,
    margin,
  } = SANKEY_PROPS;

  const [sankeyWidth, sankeyHeight] = [width - margin.x * 2, height - margin.y * 2];

  const sankeyData = useMemo(() => {
    sankey.extent([
      [0, 0],
      [sankeyWidth, sankeyHeight],
    ]);

    sankey.nodeId((d) => d.name);

    if (nodeAlign !== undefined) sankey.nodeAlign(nodeAlign);
    if (nodeWidth !== undefined) sankey.nodeWidth(nodeWidth);
    if (nodePadding !== undefined) sankey.nodePadding(nodePadding);
    if (nodePaddingRatio !== undefined) sankey.nodePaddingRatio(nodePaddingRatio);
    if (iterations !== undefined) sankey.iterations(iterations);
    if (linkIterations !== undefined) sankey.linkIterations(linkIterations);
    if (circularLinkGap !== undefined) sankey.circularLinkGap(circularLinkGap);
    if (circularLinkMargin !== undefined) sankey.circularLinkMargin(circularLinkMargin);
    if (circularLinkRadius !== undefined) sankey.circularLinkRadius(circularLinkRadius);
    if (scaleFactor !== undefined) sankey.scaleFactor(scaleFactor);
    if (sortKey !== undefined) sankey.sortNodes(sortKey);

    return sankey.build(deepClone(data));
  }, [data.nodes, data.links]);

  const sankeyUpdateCallback = () => sankey.update();

  return <SankeyContainer sankeyData={sankeyData} sankeyUpdateCallback={sankeyUpdateCallback} />;
}

export default memo(Sankey);

import React, { useReducer } from "react";
import { Group } from "@visx/group";
import useSankeyCoordinates from "../../../hooks/useSankeyCoordinates";
import useWindowSize from "../../../hooks/useWindowSize";
import SankeyNode from "./Node/SankeyNode";
import DraggableSankeyNode from "./Node/DraggableSankeyNode";
import SankeyLink from "./Link/SankeyLink";
import { useGlobalState } from "../../../state/provider";
import { setActiveNode } from "../../../state/actions";
import { SIDEBAR, SVG } from "../../../utils/constants";

function SankeySVG({ data, sankeyUpdateCallback, ...props }) {
  const [state, dispatch] = useGlobalState();
  const { height, width } = useWindowSize();
  const { minX, maxX, minY, maxY } = useSankeyCoordinates(data.links);
  const forceRender = useReducer((bool) => !bool, true, undefined)[1];

  const { mx, my } = SVG.CONTAINER;
  const { width: sideBarWidth } = SIDEBAR;

  const viewportWidth = width - minX - (width - maxX) + mx * 2;
  const viewportHeight = height - minY - (height - maxY) + my * 2;
  const svgWidth = width - sideBarWidth;
  const svgHeight = height;

  if (svgWidth < 0 || svgHeight < 0) return null;

  const { zoom, style } = props;
  const enableZoom = !state.dragInProgress && !state.activeNode;

  return (
    <svg
      viewBox={`${minX - mx} ${minY - my} ${viewportWidth} ${viewportHeight}`}
      width={svgWidth}
      height={svgHeight}
      /*preserveAspectRatio="none"*/
      style={enableZoom ? { ...style, position: "absolute" } : { position: "absolute" }}
      ref={enableZoom ? zoom?.containerRef : null}
    >
      <Group transform={zoom?.toString()}>
        {data.links.map((link, i) => (
          <SankeyLink key={`l-${i}`} link={link} />
        ))}

        {state.dragEnabled
          ? data.nodes.map((node, i) => (
              <DraggableSankeyNode
                key={`n-${i}`}
                node={node}
                svgForceRenderCallback={forceRender}
                sankeyUpdateCallback={sankeyUpdateCallback}
                onMouseOver={() => setActiveNode(dispatch, node)}
                onMouseOut={() => setActiveNode(dispatch, null)}
              />
            ))
          : data.nodes.map((node, i) => (
              <SankeyNode
                key={`n-${i}`}
                node={node}
                onMouseOver={() => setActiveNode(dispatch, node)}
                onMouseOut={() => setActiveNode(dispatch, null)}
              />
            ))}
      </Group>
    </svg>
  );
}

export default SankeySVG;

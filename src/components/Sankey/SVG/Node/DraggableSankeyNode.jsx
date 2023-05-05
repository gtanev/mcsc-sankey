import SankeyNode from "./SankeyNode";
import { Drag } from "@visx/drag";
import useWindowSize from "../../../../hooks/useWindowSize";
import { setActiveNode, setDragInProgress } from "../../../../state/actions";
import { useGlobalState } from "../../../../state/provider";
import { memo } from "react";

function DraggableSankeyNode({ node, sankeyUpdateCallback, svgForceRenderCallback, ...props }) {
  const [state, dispatch] = useGlobalState();
  const { height, width } = useWindowSize();

  const { onMouseOver, onMouseOut } = props;
  const { activeNode } = state;

  const raiseNode = (event) => {
    const rect = event.event.target.parentNode;
    rect?.parentNode.appendChild(rect);
  };

  const resetActiveNode = (event) => {
    if (activeNode != null && !event.event.target["id"]?.includes(activeNode.name)) {
      setActiveNode(dispatch, null);
    }
  };

  return (
    <Drag
      width={width}
      height={height}
      x={(node.x0 + node.x1) / 2}
      y={(node.y0 + node.y1) / 2}
      restrict={
        state.dragLock && {
          xMin: (node.x0 + node.x1) / 2,
          xMax: (node.x0 + node.x1) / 2,
        }
      }
      snapToPointer={false}
      onDragStart={(event) => {
        setDragInProgress(dispatch, true);
        raiseNode(event);
      }}
      onDragMove={(event) => {
        node.x0 += event.dx;
        node.x1 += event.dx;
        node.y0 += event.dy;
        node.y1 += event.dy;

        sankeyUpdateCallback();
        svgForceRenderCallback();
      }}
      onDragEnd={(event) => {
        setDragInProgress(dispatch, false);
        resetActiveNode(event);
      }}
    >
      {({ dragStart, dragEnd, dragMove, isDragging, x, y, dx, dy }) => (
        <SankeyNode
          node={node}
          cx={x - (node.x1 - node.x0) / 2}
          cy={y - (node.y1 - node.y0) / 2}
          transform={`translate(${dx}, ${dy})`}
          onMouseMove={dragMove}
          onMouseUp={dragEnd}
          onMouseDown={dragStart}
          onMouseOver={onMouseOver}
          onMouseOut={onMouseOut}
          onTouchStart={dragStart}
          onTouchMove={dragMove}
          onTouchEnd={dragEnd}
          isDragging={isDragging}
        />
      )}
    </Drag>
  );
}

export default memo(DraggableSankeyNode);

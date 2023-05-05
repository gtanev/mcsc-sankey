import React, { useEffect, useRef } from "react";
import useSankeyCoordinates from "../../../hooks/useSankeyCoordinates";
import useWindowSize from "../../../hooks/useWindowSize";
import { useGlobalState } from "../../../state/provider";
import { SVG, SIDEBAR } from "../../../utils/constants";

import { run } from "./canvasPainter.js";

function SankeyCanvas({ data, ...props }) {
  const [state] = useGlobalState();
  const { height, width } = useWindowSize();
  const canvasRef = useRef(null);

  const { activeNode, disambiguateTypes, animateFlows } = state;

  const { minY, minX, maxY, maxX } = useSankeyCoordinates(data.links);

  const { mx, my } = SVG.CONTAINER;
  const { width: sideBarWidth } = SIDEBAR;

  const viewportWidth = width - minX - (width - maxX) + mx * 2;
  const viewportHeight = height - minY - (height - maxY) + my * 2;
  const canvasWidth = width - sideBarWidth;
  const canvasHeight = height;

  const { scaleX, scaleY, translateX, translateY } = props.zoom?.transformMatrix ?? {
    scaleX: 1,
    scaleY: 1,
    translateX: 1,
    translateY: 1,
  };

  const scale = {
    x: scaleX,
    y: scaleY,
    vw: viewportWidth,
    vh: viewportHeight,
    mx: mx + -minX + translateX,
    my: my + -minY + translateY,
  };

  useEffect(() => {
    let canvas = null;
    let timer = null;

    if (animateFlows) {
      canvas = canvasRef?.current ?? document.getElementById("sankeyCanvas");
      timer = run(data.links, activeNode, canvas.getContext("2d"), scale);
    }

    return () => {
      canvas?.getContext("2d").setTransform(1, 0, 0, 1, 0, 0);
      canvas?.getContext("2d").clearRect(0, 0, canvas.width, canvas.height);
      timer?.stop();
    };
  }, [activeNode, disambiguateTypes, animateFlows, scaleX, scaleY, translateX, translateY]);

  return (
    <canvas
      id="sankeyCanvas"
      ref={canvasRef}
      width={canvasWidth}
      height={canvasHeight}
      style={{
        position: "absolute",
        zIndex: -1,
      }}
    />
  );
}

export default SankeyCanvas;

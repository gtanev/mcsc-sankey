import { useMemo } from "react";
import useWindowSize from "./useWindowSize";

function useSankeyCoordinates(links) {
  const { height, width } = useWindowSize();

  return useMemo(() => {
    let minX = width;
    let maxX = 0;
    let minY = height;
    let maxY = 0;

    for (const link of links) {
      if (link.circular) {
        minX = Math.min(link.circularPathData.rightFullExtent, minX);
        maxX = Math.max(link.circularPathData.leftFullExtent, maxX);
        if (link.circularLinkType === "top") {
          minY = Math.min(link.circularPathData.verticalFullExtent, minY);
        } else if (link.circularLinkType === "bottom") {
          maxY = Math.max(link.circularPathData.verticalFullExtent, maxY);
        }
      } else {
        minY = Math.min(Math.min(link.y0, link.y1), minY);
        maxY = Math.max(Math.max(link.y0, link.y1), maxY);
        minX = Math.min(link.source.x0, minX);
        maxX = Math.max(link.target.x1, maxX);
      }
    }

    return { minX, maxX, minY, maxY };
  }, [links]);
}

export default useSankeyCoordinates;

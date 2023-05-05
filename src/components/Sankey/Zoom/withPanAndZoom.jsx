import useWindowSize from "../../../hooks/useWindowSize";
import { memo } from "react";
import { Zoom } from "@visx/zoom";
import ZoomControls from "./Controls/ZoomControls";

function withPanAndZoom(Container) {
  return memo((props) => {
    const { height, width } = useWindowSize();

    const initialTransform = {
      scaleX: 1,
      scaleY: 1,
      translateX: width / 2,
      translateY: height / 2,
      skewX: 0,
      skewY: 0,
    };

    return (
      <Zoom
        className="zoom"
        width={width}
        height={height}
        scaleXMin={0.25}
        scaleXMax={12}
        scaleYMin={0.25}
        scaleYMax={12}
        transformMatrix={initialTransform}
      >
        {(zoom) => (
          <Container
            zoom={zoom}
            style={{
              cursor: zoom.isDragging ? "grabbing" : "grab",
              touchAction: "none",
            }}
            {...props}
          >
            <ZoomControls zoom={zoom} />
          </Container>
        )}
      </Zoom>
    );
  });
}

export default withPanAndZoom;

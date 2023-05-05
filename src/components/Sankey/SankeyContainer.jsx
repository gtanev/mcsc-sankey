import SankeySVG from "./SVG/SankeySVG";
import SankeyCanvas from "./Canvas/SankeyCanvas";
import SankeyTitle from "./Title/SankeyTitle";
import withPanAndZoom from "./Zoom/withPanAndZoom";
import { memo } from "react";

function SankeyContainer({ sankeyData, sankeyUpdateCallback, ...props }) {
  return (
    <div style={{ position: "relative" }}>
      <SankeyCanvas data={sankeyData} {...props} />
      <SankeySVG data={sankeyData} sankeyUpdateCallback={sankeyUpdateCallback} {...props} />
      <SankeyTitle />
      {props.children}
    </div>
  );
}

export default withPanAndZoom(memo(SankeyContainer));

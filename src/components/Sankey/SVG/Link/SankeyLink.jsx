import { Group } from "@visx/group";
import { useGlobalState } from "../../../../state/provider";
import { useMemo, useState } from "react";
import { LEGEND, SVG } from "../../../../utils/constants";
import SankeyLinkTooltip from "./SankeyLinkTooltip";

function SankeyLink({ link }) {
  const [state] = useGlobalState();
  const { activeNode, disambiguateTypes, dragInProgress } = state;
  const [isActive, setIsActive] = useState(false);

  const linkColor = useMemo(() => {
    return disambiguateTypes ? LEGEND[link.type] ?? link.color : link.color;
  }, [disambiguateTypes]);

  const linkOpacity = useMemo(() => {
    if (activeNode == null) {
      return isActive ? SVG.LINK_OPACITY.active : SVG.LINK_OPACITY.default;
    }

    if (link.source.name === activeNode.name || link.target.name === activeNode.name) {
      return SVG.LINK_OPACITY.active;
    }

    return SVG.LINK_OPACITY.inactive;
  }, [activeNode, isActive]);

  return (
    <Group
      strokeOpacity={disambiguateTypes ? 0.75 : 1}
      style={{ mixBlendMode: "multiply" }}
      cursor="pointer"
      onMouseOver={() => setIsActive(true)}
      onMouseOut={() => setIsActive(false)}
    >
      <SankeyLinkTooltip link={link} hide={dragInProgress || activeNode || !isActive}>
        <path
          className="sankey-link"
          id={`link-${link.index}`}
          d={link.path}
          aria-hidden={true}
          stroke={linkColor}
          strokeWidth={Math.max(1, link.width)}
          opacity={linkOpacity}
          fill="none"
        />
      </SankeyLinkTooltip>
    </Group>
  );
}

export default SankeyLink;

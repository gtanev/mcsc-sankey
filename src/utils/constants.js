const TITLE = "Combined material and energy flows (2019)";

const SIDEBAR = {
  width: 280,
  height: "100%",
};

const LEGEND = {
  Material: "#8b4513",
  Energy: "#4682B4",
};

const SVG = {
  CONTAINER: {
    mx: 20,
    my: 20,
  },
  NODE_OPACITY: {
    default: 1,
    active: 1,
    inactive: 0.2,
  },
  LINK_OPACITY: {
    default: 0.6,
    active: 0.9,
    inactive: 0.0,
  },
};

const SANKEY_PROPS = {
  sortKey: "sort",
  nodeWidth: 12,
  nodePaddingRatio: 0.35,
  iterations: 12,
  linkIterations: 6,
  circularLinkGap: 10,
  circularLinkMargin: 20,
  circularLinkRadius: 10,
  scaleFactor: 0.5,
  margin: { x: 0, y: 50 },
};

export { TITLE, SIDEBAR, LEGEND, SVG, SANKEY_PROPS };

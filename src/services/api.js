import * as d3 from "d3";

const tsvEndpoint =
  "https://gist.githubusercontent.com/gtanev/64680d33dc6a36bb783644de12b9f699/" +
  "raw/0a4a3d2689b26ef4e42c789ca4d6623de61ce32c/mcsc-sankey-data.tsv";

const extractData = async () => {
  return await d3.tsv(tsvEndpoint);
};

const transformData = (data) => {
  const nodesRaw = {};
  const linksRaw = {};

  for (const row of data) {
    const { Source, Target, Category, Type, Quantity, SourceRank, TargetRank, Color } = row;

    if (Source === "" || Target === "") {
      continue;
    }

    if (!nodesRaw[Source]) {
      nodesRaw[Source] = Number(SourceRank);
    }

    if (!nodesRaw[Target]) {
      nodesRaw[Target] = Number(TargetRank);
    }

    if (linksRaw[Source] === undefined) {
      linksRaw[Source] = {};
    }

    if (linksRaw[Source][Type] === undefined) {
      linksRaw[Source][Type] = {};
    }

    if (linksRaw[Source][Type][Target] === undefined) {
      linksRaw[Source][Type][Target] = {};
    }

    linksRaw[Source][Type][Target][Category] = {
      value: (linksRaw[Source][Type][Target][Category]?.value ?? 0) + Number(Quantity),
      color: Color,
    };
  }

  const nodes = Object.entries(nodesRaw).map(([name, sort]) => ({ name, sort }));
  const links = [];

  for (const [source, types] of Object.entries(linksRaw)) {
    for (const [type, targets] of Object.entries(types)) {
      for (const [target, categories] of Object.entries(targets)) {
        for (const [category, attributes] of Object.entries(categories)) {
          const { value, color } = attributes;
          links.push({ source, target, value, type, category, color });
        }
      }
    }
  }

  nodes.sort((a, b) => a.name.localeCompare(b.name));
  links.sort((a, b) => a.value - b.value);

  const maxSort = nodes.reduce((a, b) => (a.sort > b.sort ? a : b)).sort;

  return { nodes, links, maxSort };
};

export { extractData, transformData };

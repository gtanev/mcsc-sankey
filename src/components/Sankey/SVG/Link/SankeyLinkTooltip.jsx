import React, { useCallback, useMemo } from "react";
import { defaultStyles, useTooltip, useTooltipInPortal } from "@visx/tooltip";
import { Divider, Text } from "@mantine/core";
import { useGlobalState } from "../../../../state/provider";
import { LEGEND } from "../../../../utils/constants";

function SankeyLinkTooltip({ link, children: path, hide }) {
  const [state] = useGlobalState();

  const { disambiguateTypes } = state;
  const { source, target, category, type, value } = link;

  const { containerBounds, TooltipInPortal } = useTooltipInPortal({ detectBounds: true });

  const {
    showTooltip,
    hideTooltip,
    tooltipOpen,
    tooltipData,
    tooltipLeft = 0,
    tooltipTop = 0,
  } = useTooltip({ tooltipOpen: false });

  const TooltipLabel = useMemo(() => {
    const color = disambiguateTypes ? LEGEND[link.type] ?? link.color : link.color;
    const label = category.concat(" ", type === "Energy" ? "(Mtoe)" : "(Mt)");

    return (
      <>
        <Text weight={700} size="md">
          {`${source.name} → ${target.name}`}
        </Text>
        <Divider
          size="sm"
          color={color}
          label={
            <Text weight={500} size="sm" color="dark">
              {label}
            </Text>
          }
        />
        <Text weight={700} size="sm" mt={5} color="blue">
          {value}
        </Text>
      </>
    );
  }, [disambiguateTypes]);

  const handlePointerMove = useCallback(
    (event) => {
      const containerX = ("clientX" in event ? event.clientX : 0) - containerBounds.left;
      const containerY = ("clientY" in event ? event.clientY : 0) - containerBounds.top;

      showTooltip({
        tooltipLeft: containerX,
        tooltipTop: containerY,
        tooltipData: TooltipLabel,
      });
    },
    [containerBounds, disambiguateTypes]
  );

  const pathWithEventHandlers = useMemo(() => {
    return React.cloneElement(path, {
      onPointerMove: handlePointerMove,
      onPointerOut: hideTooltip,
    });
  }, [path]);

  return (
    <>
      {pathWithEventHandlers}
      {!hide && tooltipOpen && (
        <TooltipInPortal
          key={Math.random()}
          left={tooltipLeft}
          top={tooltipTop}
          style={{
            ...defaultStyles,
            backgroundColor: "white",
            color: "black",
            padding: 12,
          }}
        >
          {tooltipData}
        </TooltipInPortal>
      )}
    </>
  );
}

export default SankeyLinkTooltip;

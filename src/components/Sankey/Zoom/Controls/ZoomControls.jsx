import { Flex } from "@mantine/core";
import { IconMinus, IconPlus, IconRefresh } from "@tabler/icons";
import useWindowSize from "../../../../hooks/useWindowSize";
import ZoomIcon from "./ZoomIcon";
import { memo } from "react";

function ZoomControls({ zoom }) {
  const { height } = useWindowSize();

  return (
    <Flex mih={height} gap={0} justify="flex-end" align="flex-end" direction="row" px="lg" py="lg">
      <Flex align="flex-end" direction="column">
        <ZoomIcon
          Icon={IconPlus}
          onClick={() => zoom.scale({ scaleX: 1.1, scaleY: 1.1 })}
        />
        <ZoomIcon
          Icon={IconMinus}
          onClick={() => zoom.scale({ scaleX: 0.9, scaleY: 0.9 })}
        />
        <ZoomIcon Icon={IconRefresh} onClick={zoom.reset} />
      </Flex>
    </Flex>
  );
}

export default memo(ZoomControls);

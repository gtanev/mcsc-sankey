import { Dialog } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { cloneElement, useMemo, useState } from "react";
import SankeyDialogBody from "./SankeyDialogBody";
import SankeyDialogHeader from "./SankeyDialogHeader";
import Draggable from "react-draggable";

function SankeyDialog({ node, hide, children }) {
  if (hide) {
    return children;
  }

  const [opened, { close, open }] = useDisclosure(false);
  const [position, setPosition] = useState({ top: 0, right: 0 });

  const childrenWithEventHandlers = useMemo(() => {
    return cloneElement(children, {
      onMouseUp: open,
      onTouchEnd: open,
    });
  }, [children]);

  const handleDrag = (_, data) => {
    setPosition({ top: data.y, right: -data.x });
  };

  return (
    <>
      {childrenWithEventHandlers}
      <Draggable handle=".dialog-header" allowAnyClick onDrag={handleDrag}>
        <Dialog opened={opened} onClose={close} size="auto" m="lg" position={position}>
          <SankeyDialogHeader title={node.name} onClose={close} />
          <SankeyDialogBody node={node} />
        </Dialog>
      </Draggable>
    </>
  );
}

export default SankeyDialog;

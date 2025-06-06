import type { Node } from "@xyflow/react";

export const handleAddNode = (
  nodes: Node[],
  setNodes: (nodes: Node[]) => void
) => {
  const id = `${nodes.length + 1}`;
  const newNode: Node = {
    id,
    position: {
      x: Math.random() * 40,
      y: Math.random() * 40,
    },
    data: { label: `Node ${id}` },
    type: "default",
  };
  setNodes([...nodes, newNode]);
};

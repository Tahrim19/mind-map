import type { Node } from "@xyflow/react";

export const handleAddDatabaseNode = (
  nodes: Node[],
  setNodes: (nodes: Node[]) => void
) => {
  const id = `${nodes.length + 1}`;
  const newNode: Node = {
    id,
    type: "databaseSchema",
    position: { x: Math.random() * 400, y: Math.random() * 400 },
    data: {
      label: "New Table",
      schema: [
        { title: "id", type: "uuid" },
        { title: "name", type: "varchar" },
      ],
    },
  };
  setNodes([...nodes, newNode]);
};

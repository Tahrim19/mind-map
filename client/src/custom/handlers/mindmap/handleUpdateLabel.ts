import type { Node } from "@xyflow/react";

export const handleUpdateLabel = (
  selectedNodeId: string | null,
  nodes: Node[],
  setNodes: (nodes: Node[]) => void,
  editLabel: string,
  editSchema: { title: string; type: string }[],
  setIsEditDialogOpen: (open: boolean) => void
) => {
  if (!selectedNodeId) return;

  setNodes(
    nodes.map((n) =>
      n.id === selectedNodeId
        ? {
            ...n,
            data:
              n.type === "databaseSchema"
                ? { ...n.data, label: editLabel, schema: editSchema }
                : { ...n.data, label: editLabel },
          }
        : n
    )
  );
  setIsEditDialogOpen(false);
};

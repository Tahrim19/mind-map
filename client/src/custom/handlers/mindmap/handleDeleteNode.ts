import type { Node, Edge } from "@xyflow/react";

export const handleDeleteNode = (
  selectedNodeId: string | null,
  nodes: Node[],
  setNodes: (nodes: Node[]) => void,
  edges: Edge[],
  setEdges: (edges: Edge[]) => void,
  setSelectedNodeId: (id: string | null) => void
) => {
  if (!selectedNodeId) return;
  setNodes(nodes.filter((n) => n.id !== selectedNodeId));
  setEdges(edges.filter((e) => e.source !== selectedNodeId && e.target !== selectedNodeId));
  setSelectedNodeId(null);
};

import { useState, useCallback } from "react";
import {
  ReactFlow,
  Background,
  Controls,
  MiniMap,
  useNodesState,
  useEdgesState,
  addEdge,
} from "@xyflow/react";
import type { Connection, Edge, Node } from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import CustomDatabaseSchemaNode from "./DatabaseSchemaNode";

const nodeTypes = {
  databaseSchema: CustomDatabaseSchemaNode,
};

const initialNodes: Node[] = [
  {
    id: "1",
    position: { x: 100, y: 100 },
    data: { label: "Root Node" },
    type: "default",
  },
];

const initialEdges: Edge[] = [];

export default function MindMap() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editLabel, setEditLabel] = useState("");
  const [editSchema, setEditSchema] = useState<
    { title: string; type: string }[]
  >([]);

  const selectedNode = nodes.find((n) => n.id === selectedNodeId);

  // Add default node
  const handleAddNode = () => {
    const id = `${nodes.length + 1}`;
    const newNode: Node = {
      id,
      position: {
        x: Math.random() * 400 + 100,
        y: Math.random() * 400 + 100,
      },
      data: { label: `Node ${id}` },
      type: "default",
    };
    setNodes((nds) => [...nds, newNode]);
  };

  // Delete node
  const handleDeleteNode = () => {
    if (!selectedNodeId) return;
    setNodes((nds) => nds.filter((n) => n.id !== selectedNodeId));
    setEdges((eds) =>
      eds.filter(
        (e) => e.source !== selectedNodeId && e.target !== selectedNodeId
      )
    );
    setSelectedNodeId(null);
  };

  // Click to select node
  const handleNodeClick = (_e: any, node: Node) => {
    setSelectedNodeId(node.id);
  };

  //   // Double click to edit
  //   const handleNodeDoubleClick = (_e: any, node: Node) => {
  //     setSelectedNodeId(node.id);
  //     const label =
  //       node.type === "database"
  //         ? String(node.data.table ?? "")
  //         : String(node.data.label ?? "");
  //     setEditLabel(label);
  //     setIsEditDialogOpen(true);
  //   };
  const handleNodeDoubleClick = (_e: any, node: Node) => {
    setSelectedNodeId(node.id);
    const label = typeof node.data.label === "string" ? node.data.label : "";
    const schema = Array.isArray(node.data.schema) ? node.data.schema : [];

    setEditLabel(label);
    setEditSchema(schema); // ⬅️ Set columns to edit
    setIsEditDialogOpen(true);
  };

  // Edit label or table
  const handleUpdateLabel = () => {
    if (!selectedNodeId) return;

    setNodes((nds) =>
      nds.map((n) =>
        n.id === selectedNodeId
          ? {
              ...n,
              data:
                n.type === "database"
                  ? { ...n.data, table: editLabel }
                  : { ...n.data, label: editLabel },
            }
          : n
      )
    );
    setIsEditDialogOpen(false);
  };

  const handleConnect = useCallback(
    (connection: Connection) => setEdges((eds) => addEdge(connection, eds)),
    []
  );

  const handleAddDatabaseNode = () => {
    const id = `${nodes.length + 1}`;
    const newNode: Node = {
      id,
      type: "databaseSchema",
      position: { x: Math.random() * 40, y: Math.random() * 40 },
      data: {
        label: "New Table",
        schema: [
          { title: "id", type: "uuid" },
          { title: "name", type: "varchar" },
        ],
      },
    };
    setNodes((nds) => [...nds, newNode]);
  };

  return (
    <div className="w-full h-screen">
      {/* Toolbar */}
      <div className="flex gap-4 p-4 border-b items-center bg-white z-10">
        <Button onClick={handleAddNode}>Add Node</Button>
        <Button onClick={handleAddDatabaseNode}>Add Database Node</Button>
        <Button
          onClick={handleDeleteNode}
          variant="destructive"
          disabled={!selectedNodeId}
        >
          Delete
        </Button>
      </div>

      {/* React Flow Canvas */}
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={handleConnect}
        onNodeClick={handleNodeClick}
        onNodeDoubleClick={handleNodeDoubleClick}
        nodeTypes={nodeTypes}
        fitView
        className="overflow-hidden"
      >
        <Background />
        <MiniMap />
        <Controls />
      </ReactFlow>

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          {selectedNode?.type === "databaseSchema" && (
            <div className="space-y-2">
              {editSchema.map((col, idx) => (
                <div key={idx} className="flex gap-2">
                  <Input
                    placeholder="Column name"
                    value={col.title}
                    onChange={(e) => {
                      const newCols = [...editSchema];
                      newCols[idx].title = e.target.value;
                      setEditSchema(newCols);
                    }}
                  />
                  <Input
                    placeholder="Type"
                    value={col.type}
                    onChange={(e) => {
                      const newCols = [...editSchema];
                      newCols[idx].type = e.target.value;
                      setEditSchema(newCols);
                    }}
                  />
                  <Button
                    variant="destructive"
                    onClick={() => {
                      const newCols = [...editSchema];
                      newCols.splice(idx, 1);
                      setEditSchema(newCols);
                    }}
                  >
                    Remove
                  </Button>
                </div>
              ))}
              <Button
                variant="outline"
                onClick={() =>
                  setEditSchema([...editSchema, { title: "", type: "" }])
                }
              >
                Add Column
              </Button>
            </div>
          )}

          <Input
            value={editLabel}
            onChange={(e) => setEditLabel(e.target.value)}
            placeholder={
              selectedNode?.type === "database"
                ? "Enter table name"
                : "Enter label"
            }
          />
          <Button onClick={handleUpdateLabel}>Save</Button>
        </DialogContent>
      </Dialog>
    </div>
  );
}

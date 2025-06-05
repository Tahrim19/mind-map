import { useState, useCallback, useEffect } from "react";
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
import { useNavigate, useParams } from "react-router-dom";

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
  const { mapId } = useParams<{ mapId: string }>();
  const [mapTitle, setMapTitle] = useState("Untitled Mindmap");
  const [isSaveDialogOpen, setIsSaveDialogOpen] = useState(false);

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editLabel, setEditLabel] = useState("");
  const [editSchema, setEditSchema] = useState<
    { title: string; type: string }[]
  >([]);

  const selectedNode = nodes.find((n) => n.id === selectedNodeId);
  const navigate = useNavigate();

  const handleTitleChange = (newTitle: string) => {
    setMapTitle(newTitle);
    const savedMaps = localStorage.getItem("maps");
    if (!savedMaps) return;

    try {
      const maps = JSON.parse(savedMaps);
      const updatedMaps = maps.map((m: any) =>
        m.id === mapId ? { ...m, title: newTitle } : m
      );
      localStorage.setItem("maps", JSON.stringify(updatedMaps));
    } catch {
      console.error("Failed to update map title");
    }
  };

  const handleSave = () => {
    localStorage.setItem(`mindmap-${mapId}`, JSON.stringify({ nodes, edges }));
    setIsSaveDialogOpen(true);
  };

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

  const handleAddDatabaseNode = () => {
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
    setNodes((nds) => [...nds, newNode]);
  };

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
  const handleNodeDoubleClick = (_e: any, node: Node) => {
    setSelectedNodeId(node.id);
    setEditLabel(typeof node.data.label === "string" ? node.data.label : "");
    setEditSchema(Array.isArray(node.data.schema) ? node.data.schema : []);
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
                n.type === "databaseSchema"
                  ? { ...n.data, label: editLabel, schema: editSchema }
                  : { ...n.data, label: editLabel },
            }
          : n
      )
    );
    setIsEditDialogOpen(false);
  };

  const handleConnect = useCallback(
    (connection: Connection) => setEdges((eds) => addEdge(connection, eds)),
    [setEdges]
  );

  useEffect(() => {
    if (!mapId) return;

    try {
      const savedMindmap = localStorage.getItem(`mindmap-${mapId}`);
      if (savedMindmap) {
        const { nodes, edges } = JSON.parse(savedMindmap);
        if (nodes && edges) {
          setNodes(nodes);
          setEdges(edges);
        }
      }

      const savedMaps = localStorage.getItem("maps");
      if (savedMaps) {
        const maps = JSON.parse(savedMaps);
        const currentMap = maps.find((m: any) => m.id === mapId);
        if (currentMap?.title) {
          setMapTitle(currentMap.title);
        }
      }
    } catch (err) {
      console.error("Failed to load mindmap or title", err);
    }
  }, [mapId, setNodes, setEdges]);

  return (
    <div className="w-full h-screen flex flex-col">
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
        <Button onClick={handleSave}>Save Mindmap</Button>
        <Button onClick={() => navigate(-1)}>Back</Button>
        <Input
          value={mapTitle}
          onChange={(e) => handleTitleChange(e.target.value)}
          placeholder="Mindmap title"
          className="w-64"
        />
      </div>

      {/* React Flow Canvas */}
      <div className="flex-grow">
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
      </div>

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
              selectedNode?.type === "databaseSchema" ? "Table name" : "Label"
            }
            className="mt-4"
          />
          <Button onClick={handleUpdateLabel} className="mt-2">
            Save
          </Button>
        </DialogContent>
      </Dialog>

      {/* Save Confirmation Dialog */}
      <Dialog open={isSaveDialogOpen} onOpenChange={setIsSaveDialogOpen}>
        <DialogContent className="text-center">
          <p className="text-lg font-medium">Mindmap saved successfully!</p>
          <Button onClick={() => setIsSaveDialogOpen(false)} className="mt-4">
            Close
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  );
}

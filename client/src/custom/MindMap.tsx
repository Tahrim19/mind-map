import { useState, useEffect, useCallback } from "react";
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
import { useNavigate, useParams } from "react-router-dom";
import CustomDatabaseSchemaNode from "./DatabaseSchemaNode";
import { fetchMap } from "@/custom/handlers/mindmap/fetchMap";
import Toolbar from "@/custom/handlers/mindmap/Toolbar";
import { handleAddNode } from "@/custom/handlers/mindmap/handleAddNode";
import { handleAddDatabaseNode } from "@/custom/handlers/mindmap/handleAddDatabseNode";
import { handleDeleteNode } from "@/custom/handlers/mindmap/handleDeleteNode";
import { handleSave } from "@/custom/handlers/mindmap/handleSave";
import { handleTitleChange } from "@/custom/handlers/mindmap/handleTitleChange";
import EditDialog from "@/custom/handlers/mindmap/EditDialog";
import { handleUpdateLabel } from "@/custom/handlers/mindmap/handleUpdateLabel";
import SaveDialog from "@/custom/handlers/mindmap/SaveDialog";

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
  const [mapTitle, setMapTitle] = useState("Untitled");
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
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (mapId) {
      fetchMap({ mapId, token, setNodes, setEdges, setMapTitle });
    }
  }, [mapId]);

  const onNodeClick = (_e: any, node: Node) => {
    setSelectedNodeId(node.id);
  };

  const onNodeDoubleClick = (_e: any, node: Node) => {
    setSelectedNodeId(node.id);
    setEditLabel(typeof node.data.label === "string" ? node.data.label : "");
    setEditSchema(Array.isArray(node.data.schema) ? node.data.schema : []);
    setIsEditDialogOpen(true);
  };

  const onConnect = useCallback(
    (connection: Connection) => setEdges((eds) => addEdge(connection, eds)),
    [setEdges]
  );

  return (
    <div className="w-full h-screen flex flex-col">
      <Toolbar
        onAddNode={() => handleAddNode(nodes, setNodes)}
        onAddDatabaseNode={() => handleAddDatabaseNode(nodes, setNodes)}
        onDeleteNode={() =>
          handleDeleteNode(
            selectedNodeId,
            nodes,
            setNodes,
            edges,
            setEdges,
            setSelectedNodeId
          )
        }
        onSave={() =>
          mapId &&
          handleSave({
            mapId,
            token,
            mapTitle,
            nodes,
            edges,
            setIsSaveDialogOpen,
          })
        }
        onBack={() => navigate(-1)}
        mapTitle={mapTitle}
        onTitleChange={(val) =>
          mapId &&
          handleTitleChange({
            newTitle: val,
            mapId,
            token,
            nodes,
            edges,
            setMapTitle,
          })
        }
      
        disableDelete={!selectedNodeId}
      />

      <div className="flex-grow">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onNodeClick={onNodeClick}
          onNodeDoubleClick={onNodeDoubleClick}
          nodeTypes={nodeTypes}
          fitView
          className="overflow-hidden"
        >
          <Background />
          <MiniMap />
          <Controls />
        </ReactFlow>
      </div>

      <EditDialog
        open={isEditDialogOpen}
        setOpen={setIsEditDialogOpen}
        selectedNodeType={selectedNode?.type}
        editLabel={editLabel}
        setEditLabel={setEditLabel}
        editSchema={editSchema}
        setEditSchema={setEditSchema}
        onSave={() =>
          handleUpdateLabel(
            selectedNodeId,
            nodes,
            setNodes,
            editLabel,
            editSchema,
            setIsEditDialogOpen
          )
        }
      />

      <SaveDialog open={isSaveDialogOpen} setOpen={setIsSaveDialogOpen} />
    </div>
  );
}

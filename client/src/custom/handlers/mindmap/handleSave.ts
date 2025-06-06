export const handleSave = async ({
  mapId,
  token,
  mapTitle,
  nodes,
  edges,
  setIsSaveDialogOpen,
}: {
  mapId: string;
  token: string | null;
  mapTitle: string;
  nodes: any;
  edges: any;
  setIsSaveDialogOpen: (val: boolean) => void;
}) => {
  try {
    const res = await fetch(`http://localhost:5000/api/mindmaps/${mapId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ title: mapTitle, nodes, edges }),
    });
    if (!res.ok) throw new Error("Failed to save mindmap");
    setIsSaveDialogOpen(true);
  } catch (err) {
    console.error(err);
    alert("Failed to save mindmap");
  }
};

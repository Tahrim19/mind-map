import  { requests } from "@/requests";

export const fetchMap = async ({
  mapId,
  token,
  setNodes,
  setEdges,
  setMapTitle,
}: {
  mapId: string;
  token: string | null;
  setNodes: (nodes: any) => void;
  setEdges: (edges: any) => void;
  setMapTitle: (title: string) => void;
}) => {
  try {
    const res = await fetch(requests.fetchMap(mapId), {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!res.ok) throw new Error("Failed to load mindmap");
    const mapData = await res.json();
    setNodes(mapData.nodes || []);
    setEdges(mapData.edges || []);
    setMapTitle(mapData.title || "Untitled Mindmap");
  } catch (err) {
    console.error(err);
  }
};

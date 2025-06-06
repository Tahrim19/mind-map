import { requests } from "@/requests";

export const handleTitleChange = async ({
  newTitle,
  mapId,
  token,
  nodes,
  edges,
  setMapTitle,
}: {
  newTitle: string;
  mapId: string | undefined;
  token: string | null;
  nodes: any;
  edges: any;
  setMapTitle: (title: string) => void;
}) => {
  setMapTitle(newTitle);

  if (!mapId) return;

  try {
    await fetch(requests.titleChange(mapId), {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ title: newTitle, nodes, edges }),
    });
  } catch (err) {
    console.error("Failed to update title", err);
  }
};

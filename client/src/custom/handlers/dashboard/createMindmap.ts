import { requests } from "@/requests";

export const createMindmap = async (
  token: string,
  maps: { id: string; title: string }[],
  setMaps: (maps: { id: string; title: string }[]) => void,
  navigate: (path: string) => void
) => {
  const newMap = {
    title: "Untitled",
    data: {},
  };

  const res = await fetch(requests.createMap , {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(newMap),
  });

  if (!res.ok) throw new Error("Failed to create mindmap");

  const created = await res.json();
  const newEntry = { id: created._id, title: created.title };
  setMaps([...maps, newEntry]);
  navigate(`/mindmap/${created._id}`);
};

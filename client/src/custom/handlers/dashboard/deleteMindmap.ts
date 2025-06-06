import { requests } from "@/requests";

export const deleteMindmap = async (
  mapId: string,
  token: string,
  maps: { id: string; title: string }[],
  setMaps: (maps: { id: string; title: string }[]) => void,
  closeDialog: () => void
) => {
  const res = await fetch(requests.deleteMap(mapId), {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) throw new Error("Failed to delete mindmap");

  const updated = maps.filter((map) => map.id !== mapId);
  setMaps(updated);
  closeDialog();
};

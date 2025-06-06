export const fetchUserMaps = async (token: string) => {
  const res = await fetch("http://localhost:5000/api/mindmaps", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) throw new Error("Failed to fetch mindmaps");

  const data = await res.json();

  // Normalize to { id, title }
  return data.map((map: any) => ({
    id: map._id,
    title: map.title,
  }));
};

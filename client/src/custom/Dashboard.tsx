import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";
import { fetchUserMaps } from "./handlers/dashboard/fetchUserMaps";
import { createMindmap } from "./handlers/dashboard/createMindmap";
import { deleteMindmap } from "./handlers/dashboard/deleteMindmap";
import { handleLogout } from "./handlers/dashboard/handleLogout";
import DeleteMindmapDialog from "./handlers/dashboard/DeleteMindmapDialog";

type MapInfo = {
  id: string;
  title: string;
};

export default function Dashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState<{ username: string } | null>(null);
  const [maps, setMaps] = useState<MapInfo[]>([]);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [mapToDelete, setMapToDelete] = useState<MapInfo | null>(null);

  const token = localStorage.getItem("token");

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (!storedUser || !token) {
      navigate("/");
      return;
    }
    setUser(JSON.parse(storedUser));

    fetchUserMaps(token)
      .then(setMaps)
      .catch(() => alert("Failed to load mindmaps"));
  }, [navigate, token]);

  const onCreate = async () => {
    try {
      await createMindmap(token!, maps, setMaps, navigate);
    } catch (err: any) {
      alert(err.message);
    }
  };

  const onDelete = async () => {
    if (!mapToDelete) return;
    try {
      await deleteMindmap(mapToDelete.id, token!, maps, setMaps, () => {
        setDeleteDialogOpen(false);
        setMapToDelete(null);
      });
    } catch (err: any) {
      alert(err.message);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <Button variant="destructive" onClick={() => handleLogout(navigate)}>
          Logout
        </Button>
      </div>

      <Card className="mb-4">
        <CardHeader>
          <CardTitle>User Info</CardTitle>
        </CardHeader>
        <CardContent>
          <p>
            <strong>Username:</strong> {user?.username}
          </p>
        </CardContent>
      </Card>

      <Button onClick={onCreate} className="mb-4">
        Create New Mindmap
      </Button>

      <Card>
        <CardHeader>
          <CardTitle>Your Maps</CardTitle>
        </CardHeader>
        <CardContent>
          {maps.length === 0 && (
            <p className="text-gray-500">No mindmaps yet.</p>
          )}
          {maps.map((map) => (
            <div
              key={map.id}
              className="p-2 border rounded mb-2 flex justify-between items-center hover:bg-gray-100"
            >
              <span
                className="cursor-pointer flex-1"
                onClick={() => navigate(`/mindmap/${map.id}`)}
              >
                {map.title}
              </span>
              <Trash
                size={18}
                className="text-red-500 cursor-pointer ml-2 hover:text-red-700"
                onClick={() => {
                  setMapToDelete(map);
                  setDeleteDialogOpen(true);
                }}
              />
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Delete Confirmation Dialog */}
      <DeleteMindmapDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        onDelete={onDelete}
        onCancel={() => setMapToDelete(null)}
        mapTitle={mapToDelete?.title}
      />
    </div>
  );
}

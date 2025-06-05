import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogFooter,
} from "@/components/ui/dialog";

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

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (!storedUser) {
      navigate("/login");
      return;
    }
    setUser(JSON.parse(storedUser));

    const savedMaps = localStorage.getItem("maps");
    if (savedMaps) {
      setMaps(JSON.parse(savedMaps));
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  const handleCreateNewMindmap = () => {
    const newId = Date.now().toString();
    const newMap = { id: newId, title: "Untitled Mindmap" };
    const newMaps = [...maps, newMap];
    setMaps(newMaps);
    localStorage.setItem("maps", JSON.stringify(newMaps));
    navigate(`/mindmap/${newId}`);
  };

  const handleLoadMindmap = (id: string) => {
    navigate(`/mindmap/${id}`);
  };

  const confirmDeleteMindmap = () => {
    if (!mapToDelete) return;

    const updatedMaps = maps.filter((map) => map.id !== mapToDelete.id);
    setMaps(updatedMaps);
    localStorage.setItem("maps", JSON.stringify(updatedMaps));
    localStorage.removeItem(`mindmap-${mapToDelete.id}`);
    setDeleteDialogOpen(false);
    setMapToDelete(null);
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <Button variant="destructive" onClick={handleLogout}>
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

      <Button onClick={handleCreateNewMindmap} className="mb-4">
        Create New Mindmap
      </Button>

      <Card>
        <CardHeader>
          <CardTitle>Your Maps</CardTitle>
        </CardHeader>
        <CardContent>
          {maps.length === 0 && <p></p>}
          {maps.map((map) => (
            <div
              key={map.id}
              className="p-2 border rounded mb-2 flex justify-between items-center hover:bg-gray-100"
            >
              <span
                className="cursor-pointer flex-1"
                onClick={() => handleLoadMindmap(map.id)}
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
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <h2 className="text-lg font-semibold">Delete Mindmap</h2>
            <p>
              Are you sure you want to delete{" "}
              <strong>{mapToDelete?.title}</strong>? This action cannot be
              undone.
            </p>
          </DialogHeader>
          <DialogFooter className="flex justify-end gap-2">
            <Button onClick={() => setDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={confirmDeleteMindmap}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

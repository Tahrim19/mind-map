import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function Toolbar({
  onAddNode,
  onAddDatabaseNode,
  onDeleteNode,
  onSave,
  onBack,
  mapTitle,
  onTitleChange,
  disableDelete,
}: {
  onAddNode: () => void;
  onAddDatabaseNode: () => void;
  onDeleteNode: () => void;
  onSave: () => void;
  onBack: () => void;
  mapTitle: string;
  onTitleChange: (val: string) => void;
  disableDelete: boolean;
}) {
  return (
    <div className="flex gap-4 p-4 border-b items-center bg-white z-10">
      <Button onClick={onAddNode}>Add Node</Button>
      <Button onClick={onAddDatabaseNode}>Add Database Node</Button>
      <Button onClick={onDeleteNode} variant="destructive" disabled={disableDelete}>
        Delete
      </Button>
      <Button onClick={onSave}>Save</Button>
      <Button onClick={onBack}>Back</Button>
      <Input
        value={mapTitle}
        onChange={(e) => onTitleChange(e.target.value)}
        placeholder="Mindmap title"
        className="w-64"
      />
    </div>
  );
}

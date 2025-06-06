import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type SchemaCol = { title: string; type: string };

export default function EditDialog({
  open,
  setOpen,
  selectedNodeType,
  editLabel,
  setEditLabel,
  editSchema,
  setEditSchema,
  onSave,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
  selectedNodeType?: string;
  editLabel: string;
  setEditLabel: (label: string) => void;
  editSchema: SchemaCol[];
  setEditSchema: (schema: SchemaCol[]) => void;
  onSave: () => void;
}) {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        {selectedNodeType === "databaseSchema" && (
          <div className="space-y-2">
            {editSchema.map((col, idx) => (
              <div key={idx} className="flex gap-2">
                <Input
                  placeholder="Column name"
                  value={col.title}
                  onChange={(e) => {
                    const newCols = [...editSchema];
                    newCols[idx].title = e.target.value;
                    setEditSchema(newCols);
                  }}
                />
                <Input
                  placeholder="Type"
                  value={col.type}
                  onChange={(e) => {
                    const newCols = [...editSchema];
                    newCols[idx].type = e.target.value;
                    setEditSchema(newCols);
                  }}
                />
                <Button
                  variant="destructive"
                  onClick={() => {
                    const newCols = [...editSchema];
                    newCols.splice(idx, 1);
                    setEditSchema(newCols);
                  }}
                >
                  Remove
                </Button>
              </div>
            ))}
            <Button
              variant="outline"
              onClick={() => setEditSchema([...editSchema, { title: "", type: "" }])}
            >
              Add Column
            </Button>
          </div>
        )}

        <Input
          value={editLabel}
          onChange={(e) => setEditLabel(e.target.value)}
          placeholder={selectedNodeType === "databaseSchema" ? "Table name" : "Label"}
          className="mt-4"
        />
        <Button onClick={onSave} className="mt-2">
          Save
        </Button>
      </DialogContent>
    </Dialog>
  );
}

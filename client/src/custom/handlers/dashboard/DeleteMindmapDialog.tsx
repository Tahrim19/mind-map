import { Dialog, DialogContent, DialogHeader, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { DialogTitle } from "@radix-ui/react-dialog";

type DeleteMindmapDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onDelete: () => void;
  onCancel?: () => void;
  mapTitle?: string;
};

export default function DeleteMindmapDialog({
  open,
  onOpenChange,
  onDelete,
  onCancel,
  mapTitle,
}: DeleteMindmapDialogProps) {
  const handleCancel = () => {
    onOpenChange(false);
    onCancel?.();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold">Delete Mindmap</DialogTitle>
          <p>
            Are you sure you want to delete{" "}
            <strong>{mapTitle}</strong>? This action cannot be undone.
          </p>
        </DialogHeader>
        <DialogFooter className="flex justify-end gap-2">
          <Button onClick={handleCancel}>Cancel</Button>
          <Button variant="destructive" onClick={onDelete}>
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

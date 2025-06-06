import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { DialogTitle } from "@radix-ui/react-dialog";

export default function SaveDialog({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
}) {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="text-center">
        <DialogTitle className="text-lg font-medium">Mindmap saved successfully!</DialogTitle>
        <Button onClick={() => setOpen(false)} className="mt-4">
          Close
        </Button>
      </DialogContent>
    </Dialog>
  );
}

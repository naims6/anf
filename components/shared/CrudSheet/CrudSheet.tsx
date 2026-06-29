import type { ReactNode } from "react";
import { Loader2 } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetClose,
  SheetFooter,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";

interface CrudSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description?: string;
  children: ReactNode;
  onSubmit?: (e: React.FormEvent) => void;
  submitting?: boolean;
  isEditing?: boolean;
  saveLabel?: string;
  updateLabel?: string;
  cancelLabel?: string;
}

export function CrudSheet({
  open,
  onOpenChange,
  title,
  description,
  children,
  onSubmit,
  submitting = false,
  isEditing = false,
  saveLabel = "Save",
  updateLabel = "Update",
  cancelLabel = "Cancel",
}: CrudSheetProps) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="flex w-full flex-col sm:max-w-md">
        <SheetHeader className="border-b px-6 py-5">
          <SheetTitle className="text-lg">{title}</SheetTitle>
          {description && <SheetDescription>{description}</SheetDescription>}
        </SheetHeader>

        <form
          onSubmit={onSubmit}
          className="flex min-h-0 flex-1 flex-col"
        >
          <div className="min-h-0 flex-1 space-y-5 overflow-y-auto px-6 py-5">
            {children}
          </div>

          <SheetFooter className="shrink-0 border-t px-6 py-4">
            <SheetClose asChild>
              <Button variant="outline" type="button" disabled={submitting}>
                {cancelLabel}
              </Button>
            </SheetClose>
            <Button type="submit" disabled={submitting}>
              {submitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {isEditing ? updateLabel : saveLabel}
            </Button>
          </SheetFooter>
        </form>
      </SheetContent>
    </Sheet>
  );
}

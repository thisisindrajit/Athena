"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { FC } from "react";

interface ICDialogHolderProps {
  trigger: React.ReactNode;
  title: string;
  description?: string;
  children: React.ReactNode;
}

const CDialogHolder: FC<ICDialogHolderProps> = ({
  trigger,
  title,
  description,
  children,
}) => {
  return (
    <Dialog>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent
        className="dark:bg-neutral-900"
        // This is to prevent the dialog from closing when clicking on the toast
        onInteractOutside={(e) => {
          const { originalEvent } = e.detail;
          if (
            originalEvent.target instanceof Element &&
            originalEvent.target.closest(".group.toast")
          ) {
            e.preventDefault();
          }
        }}
      >
        <div className="flex flex-col items-center gap-4">
          <DialogHeader className="sticky top-0 z-10 bg-background/10 backdrop-blur-xl pt-4 px-4">
            <DialogTitle>{title}</DialogTitle>
            {description && (
              <DialogDescription className="font-medium">
                Just login with your Google account – quick, simple, and
                hassle-free ✨
              </DialogDescription>
            )}
          </DialogHeader>
          <div className="pb-4 px-4 w-full">{children}</div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CDialogHolder;

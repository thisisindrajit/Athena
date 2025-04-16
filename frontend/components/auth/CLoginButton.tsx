"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import CSignInWithGoogleBox from "@/components/auth/CSignInWithGoogleBox";

const CLoginButton = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="sm" className="font-medium">
          Login
        </Button>
      </DialogTrigger>
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
          <DialogHeader>
            <DialogTitle>Welcome!</DialogTitle>
            <DialogDescription className="font-medium">
              Just login with your Google account – quick, simple, and
              hassle-free ✨
            </DialogDescription>
          </DialogHeader>
          <CSignInWithGoogleBox />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CLoginButton;

"use client";

import { Button } from "@/components/ui/button";
import CSignInWithGoogleBox from "@/components/auth/CSignInWithGoogleBox";
import CDialogHolder from "../holders/CDialogHolder";

const CLoginButton = () => {
  return (
    <CDialogHolder
      trigger={
        <Button size="sm" className="font-medium">
          Login
        </Button>
      }
      title="Welcome!"
      description="Just login with your Google account – quick, simple, and hassle-free ✨"
    >
      <CSignInWithGoogleBox />
    </CDialogHolder>
  );
};

export default CLoginButton;

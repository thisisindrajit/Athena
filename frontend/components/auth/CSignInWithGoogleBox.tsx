"use client";

import { Button } from "@/components/ui/button";
import { signIn } from "@/lib/client";
import {
  RiErrorWarningFill,
  RiGoogleFill,
  RiLoader4Fill,
} from "@remixicon/react";
import { ErrorContext } from "better-auth/react";
import { useState } from "react";
import { toast } from "sonner";

const CSignInWithGoogleBox = () => {
  const [isSigningIn, setIsSigningIn] = useState<boolean>(false);

  const signInWithGoogle = async () => {
    await signIn.social(
      {
        provider: "google",
        newUserCallbackURL: `${process.env.NEXT_PUBLIC_BASE_URL}/user/dashboard?is-new-user=1`,
        callbackURL: `${process.env.NEXT_PUBLIC_BASE_URL}/user/dashboard`,
      },
      {
        onRequest: () => {
          // set isSigningIn to true
          setIsSigningIn(true);
        },
        onError: (ctx: ErrorContext) => {
          // display the error message
          console.error(
            "Some error occurred while trying to sign in with Google:",
            ctx
          );
          setIsSigningIn(false);
          toast.error(
            <div className="flex flex-col gap-2">
              <div className="font-bold text-base flex items-center gap-1.5 uppercase w-fit">
                <RiErrorWarningFill className="h-5 w-5" />
                <span className="mt-[1px]">Error</span>
              </div>
              <div className="leading-relaxed font-medium text-sm">
                Some error occurred while trying to sign in with Google. Please
                try again.
              </div>
            </div>,
            {
              duration: Infinity,
              icon: null,
            }
          );
        },
      }
    );
  };

  return (
    <div className="bg-[#DB4437]/10 flex flex-col items-center justify-center h-24 border border-dashed w-full border-[#DB4437]/50 rounded-md">
      <Button
        className={`bg-[#DB4437] text-white after:flex-1 hover:bg-[#DB4437]/90 ${isSigningIn && "cursor-not-allowed"
          }`}
        onClick={isSigningIn ? () => { } : signInWithGoogle}
      >
        {isSigningIn ? (
          <>
            <span className="pointer-events-none me-2 flex-1">
              <RiLoader4Fill
                className="opacity-60 animate-spin"
                size={16}
                aria-hidden="true"
              />
            </span>
            Logging in with Google...
          </>
        ) : (
          <>
            <span className="pointer-events-none me-2 flex-1">
              <RiGoogleFill
                className="opacity-60"
                size={16}
                aria-hidden="true"
              />
            </span>
            Login with Google
          </>
        )}
      </Button>
    </div>
  );
};

export default CSignInWithGoogleBox;

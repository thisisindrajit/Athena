"use client";

import { AuthQueryProvider } from "@daveyplate/better-auth-tanstack";

const CAuthQueryProvider = ({ children }: { children: React.ReactNode }) => {
  return <AuthQueryProvider>{children}</AuthQueryProvider>;
}

export default CAuthQueryProvider;
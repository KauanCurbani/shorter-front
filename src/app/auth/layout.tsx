import { Toaster } from "@/components/ui/sonner";
import { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <Toaster />
      <div className="min-h-screen flex justify-center items-center bg-muted">
        <div className="border p-4 rounded-lg shadow-lg w-full max-w-md bg-background mx-4">
          {children}
        </div>
      </div>
    </>
  );
}

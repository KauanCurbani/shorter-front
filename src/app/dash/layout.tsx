"use client";
import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { LayoutDashboard, LogOutIcon, Settings2 } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  const path = usePathname();
  const router = useRouter()
  const routes = [
    {
      name: "Dashboard",
      icon: LayoutDashboard,
      link: "/dash",
    },
    {
      name: "Settings",
      icon: Settings2,
      link: "/dash/settings",
    },
  ];

  return (
    <div className="flex">
      <div className=" h-dvh w-72 border-r bg-muted/20 flex flex-col p-4">
        <div className="flex justify-between items-center">
          <Logo />

          <Button size={"icon"} variant={"ghost"}>
            <LogOutIcon className="cursor-pointer" />
          </Button>
        </div>

        <Separator className="my-2" />

        <div className="space-y-2">
          {routes.map((route, index) => (
            <div
              key={index}
              className={cn(
                "flex items-center gap-2 rounded-md p-2 group hover:bg-muted transition cursor-pointer",
                path === route.link && "bg-muted",
              )}
              onClick={() => router.push(route.link)}
            >
              <route.icon className={cn("w-4 h-4 text-muted-foreground group-hover:text-black transition cursor-pointer", 
                path === route.link && "text-black"
              )} />
              <Label
                className={cn(
                  "text-muted-foreground group-hover:text-black transition cursor-pointer",
                  path === route.link && "text-black",
                )}
              >
                {route.name}
              </Label>
            </div>
          ))}
        </div>
      </div>
      {children}
    </div>
  );
}

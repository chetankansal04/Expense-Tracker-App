"use client";
import { usePathname } from "next/navigation";
import Sidebar from "@/components/Sidebar";
import Menubar from "@/components/Menubar";

export default function Excluder({ children }) {
  const pathname = usePathname();

  // Routes where Sidebar and Menubar should not appear
  const excludedRoutes = ["/login", "/register"];

  const isExcludedRoute = excludedRoutes.includes(pathname);

  return (
    <>
      {!isExcludedRoute && (
        <div>
          <div className=" fixed left-0 top-0 bottom-0 w-64 min-h-dvh border border-zinc-300 border-opacity-50 bg-zinc-200 border-r-2">
            <Sidebar />
          </div>
          <div className=" ml-64 flex flex-col h-full">
            <header className="pr-64 z-50 fixed top-0 w-full">
              <Menubar></Menubar>
            </header>
          </div>
        </div>
      )}
      <main className={!isExcludedRoute ? "overflow-y-auto mt-16 h-full" : ""}>
        {children}
      </main>
    </>
  );
}

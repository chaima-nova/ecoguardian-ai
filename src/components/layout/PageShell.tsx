import type { ReactNode } from "react";
import Sidebar from "./Sidebar";
import TopBar from "./TopBar";

export default function PageShell({ children }: { children: ReactNode }) {
  return (
    <div className="relative min-h-screen bg-iceblue text-navy">
      {/* Atmospheric background: ice blue -> sky blue -> deep ocean navy */}
      <div
        className="pointer-events-none fixed inset-0 -z-10"
        style={{
          background:
            "radial-gradient(ellipse 65% 45% at 12% 8%, rgba(255,255,255,0.55), transparent 60%), radial-gradient(ellipse 70% 55% at 100% 30%, rgba(0,212,255,0.20), transparent 60%), radial-gradient(ellipse 80% 60% at 20% 100%, rgba(0,20,50,0.35), transparent 65%), linear-gradient(180deg, #C8E5FF 0%, #7EBBFA 28%, #4A9EFF 52%, #17518F 78%, #0B2545 100%)",
        }}
      />
      {/* Soft ambient blur blobs for organic depth */}
      <div
        className="pointer-events-none fixed inset-0 -z-10 opacity-70"
        style={{
          background:
            "radial-gradient(circle 380px at 80% 12%, rgba(255,255,255,0.35), transparent 70%), radial-gradient(circle 420px at 8% 55%, rgba(0,174,219,0.25), transparent 70%)",
          filter: "blur(40px)",
        }}
      />
      <div className="flex min-h-screen">
        <Sidebar />
        <div className="flex min-h-screen min-w-0 flex-1 flex-col">
          <TopBar />
          <main className="min-w-0 flex-1 px-5 py-7 lg:px-9 lg:py-9">{children}</main>
        </div>
      </div>
    </div>
  );
}

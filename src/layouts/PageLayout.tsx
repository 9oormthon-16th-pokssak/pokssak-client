import { Outlet } from "react-router-dom";

import BottomBar from "@/components/common/BottomBar";

export default function PageLayout() {
  return (
    <div className="flex h-fit min-h-screen w-full flex-col bg-[#fafafa]">
      <div className="flex flex-1 flex-col">
        <Outlet />
        <BottomBar />
      </div>
    </div>
  );
}

import { Outlet } from "react-router-dom";

export default function PageLayout() {
  return (
    <div className="flex h-fit min-h-screen w-full flex-col bg-[#fafafa]">
      <div className="flex flex-1 flex-col">
        <Outlet />
      </div>
    </div>
  );
}

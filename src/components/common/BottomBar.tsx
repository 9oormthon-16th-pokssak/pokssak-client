import { useEffect, useState } from "react";

import { Button, Flex } from "@vapor-ui/core";
import { HomeIcon, LocationIcon, UserIcon } from "@vapor-ui/icons";
import { useLocation, useNavigate } from "react-router-dom";

const navItems = [
  { id: "home", Icon: HomeIcon, label: "홈", path: "/" },
  { id: "location", Icon: LocationIcon, label: "위치", path: "/map" },
  { id: "user", Icon: UserIcon, label: "My", path: "/mypage" },
];

const BottomBar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [activeItem, setActiveItem] = useState("home");

  // 현재 경로 변화 시 active 상태 자동 업데이트
  useEffect(() => {
    const current = navItems.find(item => item.path === location.pathname);
    if (current) {
      setActiveItem(current.id);
    }
  }, [location.pathname]);

  const handleItemClick = (itemId: string, path: string) => {
    setActiveItem(itemId);
    navigate(path);
  };

  const ACTIVE_COLOR = "var(--vapor-color-blue-400)";
  const DEFAULT_COLOR = "var(--vapor-color-gray-200)";

  return (
    <div className="border-t-v-gray-100 fixed bottom-0 z-10 w-full border-t bg-white">
      <Flex
        justifyContent={"space-around"}
        alignItems={"center"}
        width={"auto"}
        className="h-v-700"
      >
        {navItems.map(item => {
          const isActive = activeItem === item.id;
          const IconComponent = item.Icon;

          return (
            <Button
              key={item.id}
              onClick={() => handleItemClick(item.id, item.path)}
              className="h-full w-full"
              backgroundColor={"transparent"}
            >
              <IconComponent
                color={isActive ? ACTIVE_COLOR : DEFAULT_COLOR}
                className="mb-1 h-6 w-6"
              />
            </Button>
          );
        })}
      </Flex>
    </div>
  );
};

export default BottomBar;

import { useState } from "react";

import { Button, Flex } from "@vapor-ui/core";
// 아이콘 컴포넌트
import { HomeIcon, LocationIcon, UserIcon } from "@vapor-ui/icons";

// 내비게이션 항목
const navItems = [
  // 아이콘 컴포넌트 저장
  { id: "home", Icon: HomeIcon, label: "홈" },
  { id: "location", Icon: LocationIcon, label: "위치" },
  { id: "user", Icon: UserIcon, label: "My" },
];

const BottomBar = () => {
  // 활성화 상태
  const [activeItem, setActiveItem] = useState("home");

  // 클릭 핸들러
  const handleItemClick = (itemId: string) => {
    setActiveItem(itemId);
    console.log(`${itemId} 아이템 선택`);
  };

  // 색상 정의
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
              onClick={() => handleItemClick(item.id)}
              className={"h-full w-full"}
              backgroundColor={"transparent"}
            >
              <IconComponent
                // 색상 적용
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

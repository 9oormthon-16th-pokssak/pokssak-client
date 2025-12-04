import { useState } from "react";

import { Button, Flex } from "@vapor-ui/core";

// 이미지 리소스
import HomeIcon from "@/assets/bottombar/HomeIcon.webp";
import HomeIconClicked from "@/assets/bottombar/HomeIcon_clicked.webp";
import LocationIcon from "@/assets/bottombar/LocationIcon.webp";
import LocationIconClicked from "@/assets/bottombar/LocationIcon_clicked.webp";
import UserIcon from "@/assets/bottombar/UserIcon.webp";
import UserIconClicked from "@/assets/bottombar/UserIcon_clicked.webp";

// 내비게이션 항목 목록
const navItems = [
  { id: "home", defaultIcon: HomeIcon, clickedIcon: HomeIconClicked, label: "홈" },
  { id: "location", defaultIcon: LocationIcon, clickedIcon: LocationIconClicked, label: "위치" },
  { id: "user", defaultIcon: UserIcon, clickedIcon: UserIconClicked, label: "My" },
];

const BottomBar = () => {
  // 활성화된 아이템 상태 관리
  const [activeItem, setActiveItem] = useState("home");

  // 아이템 클릭 핸들러
  const handleItemClick = (itemId: string) => {
    setActiveItem(itemId);
    // 페이지 이동 로직 위치
    console.log(`${itemId} 아이템 선택`);
  };

  return (
    <div className="border-t-v-gray-100 fixed bottom-0 z-50 w-full border-t bg-white">
      <Flex
        justifyContent={"space-around"}
        alignItems={"center"}
        width={"auto"}
        className="h-v-700"
      >
        {/* 항목별 버튼 렌더링 */}
        {navItems.map(item => (
          <Button
            key={item.id}
            onClick={() => handleItemClick(item.id)}
            className={"h-full w-full"}
            backgroundColor={"transparent"}
          >
            {/* 아이콘 이미지, 활성화 상태에 따른 소스 변경 */}
            <img
              src={activeItem === item.id ? item.clickedIcon : item.defaultIcon}
              alt={item.label}
              className="mb-1 h-6 w-6"
            />
          </Button>
        ))}
      </Flex>
    </div>
  );
};

export default BottomBar;

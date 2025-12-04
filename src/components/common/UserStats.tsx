import { Flex, Text, VStack } from "@vapor-ui/core";

import iconHeart from "@/assets/icon_heart.svg";
import iconShoes from "@/assets/icon_shoes.svg";

interface StatItemProps {
  icon: string;
  count: number;
  label: string;
}

const StatItem = ({ icon, count, label }: StatItemProps) => {
  return (
    <VStack className="gap-v-100 items-center">
      <img src={icon} alt={label} className="h-[32px] w-[32px]" />
      <Text typography="heading6" foreground="normal-200">
        {count}
      </Text>
    </VStack>
  );
};

interface UserStatsProps {
  likedCount: number;
  visitedCount: number;
}

const UserStats = ({ likedCount = 0, visitedCount = 0 }: UserStatsProps) => {
  return (
    <Flex className="gap-v-500 pb-v-150 justify-center">
      <StatItem icon={iconHeart} count={likedCount} label="가고싶은 곳" />
      <StatItem icon={iconShoes} count={visitedCount} label="다녀온 곳" />
    </Flex>
  );
};

export default UserStats;

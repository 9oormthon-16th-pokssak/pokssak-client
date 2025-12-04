import { Flex, HStack, Text, VStack } from "@vapor-ui/core";

import iconHeart from "@/assets/icon_heart.svg";
import iconShoes from "@/assets/icon_shoes.svg";

export interface StatItemProps {
  icon: string;
  count: number;
  label?: string;
  className?: string;
  iconClassName?: string;
  textClassName?: string;
  typography?: "heading6" | "heading5" | "heading4" | "subtitle1" | "subtitle2";
  direction?: "vertical" | "horizontal";
}

export const StatItem = ({
  icon,
  count,
  label,
  className,
  iconClassName = "h-[32px] w-[32px]",
  textClassName,
  typography = "heading6",
  direction = "vertical",
}: StatItemProps) => {
  const defaultClassName =
    direction === "horizontal" ? "gap-v-100 items-center" : "gap-v-100 items-center";

  if (direction === "horizontal") {
    return (
      <HStack className={className || defaultClassName}>
        <img src={icon} alt={label || ""} className={iconClassName} />
        <Text typography={typography} foreground="normal-200" className={textClassName}>
          {count}
        </Text>
      </HStack>
    );
  }

  return (
    <VStack className={className || defaultClassName}>
      <img src={icon} alt={label || ""} className={iconClassName} />
      <Text typography={typography} foreground="normal-200" className={textClassName}>
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

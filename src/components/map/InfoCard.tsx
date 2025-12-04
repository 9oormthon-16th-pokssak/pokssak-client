import { Flex, Text } from "@vapor-ui/core";

import LightBulb from "@/assets/LightBulb.svg";
import Robot from "@/assets/Robot.svg";

interface Props {
  type: string;
  text: string;
}

const InfoCard = ({ type, text }: Props) => {
  // type별 이미지 + label 매핑
  const typeMap: Record<
    string,
    {
      icon: string;
      label: string;
    }
  > = {
    AI: {
      icon: Robot,
      label: "AI 한 눈 정리",
    },
    TIP: {
      icon: LightBulb,
      label: "알고가면 좋은 꿀팁",
    },
  };

  const selected = typeMap[type] ?? {
    icon: "",
    label: "",
  };

  return (
    <Flex
      backgroundColor={"$gray-050"}
      flexDirection={"column"}
      className={"px-v-250 py-v-150 rounded-v-300 mx-v-200"}
    >
      <Flex gap={"$050"}>
        <img src={selected.icon} alt={selected.label} />
        <Text typography={"subtitle1"} color={"var(--vapor-color-gray-900)"}>
          {selected.label}
        </Text>
      </Flex>
      <Text typography={"subtitle2"} color={"var(--vapor-color-gray-800)"}>
        {text}
      </Text>
    </Flex>
  );
};

export default InfoCard;

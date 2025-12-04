import { HStack, Text, VStack } from "@vapor-ui/core";

import 돌하르방 from "@/assets/돌하르방.webp";

const HomePage = () => {
  return (
    <VStack className={"p-v-300"}>
      <HStack className={"gap-v-200 w-full"} justifyContent={"space-between"} marginTop={"$400"}>
        <Text typography={"heading3"}>
          돔바꽃 님<br />
          어디로 떠나볼까요?
        </Text>
        <img src={돌하르방} />
      </HStack>
    </VStack>
  );
};

export default HomePage;

import { Box, HStack, Text, VStack } from "@vapor-ui/core";

import BottomBar from "@/components/common/BottomBar";
import Carousel from "@/components/common/Carousel";
import UserKeywordHarubang from "@/components/common/UserKeywordHarubang";

import { useAuth } from "@/hooks/useAuth";

import backPeace from "@/assets/backImage/back_peace.png";
import card1 from "@/assets/cardImage/card1.png";
import card2 from "@/assets/cardImage/card2.png";
import card3 from "@/assets/cardImage/card3.png";

const HomePage = () => {
  const { user } = useAuth();

  return (
    <Box className="relative min-h-screen w-full">
      <img
        src={backPeace}
        alt="background"
        className="absolute top-0 right-0 h-full w-auto object-cover"
        style={{ zIndex: 0 }}
      />
      <VStack className={"p-v-300 relative"} style={{ zIndex: 1 }}>
        <HStack className={"gap-v-200 w-full"} justifyContent={"space-between"} marginTop={"$400"}>
          <Text typography={"heading3"}>
            {user?.name || "게스트"} 님<br />
            어디로 떠나볼까요?
          </Text>
          {user?.keyword ? (
            <UserKeywordHarubang keyword={user.keyword} className="h-[120px] w-[120px]" original />
          ) : null}
        </HStack>
        <VStack className="w-full">
          <Text typography={"heading6"} className="pb-v-100 color-v-gray-800">
            오늘의 제주 큐레이션
          </Text>
          <Carousel
            items={[
              {
                id: 1,
                image: card1,
              },
              {
                id: 2,
                image: card2,
              },
              {
                id: 3,
                image: card3,
              },
            ]}
            autoPlayInterval={2000}
          />
        </VStack>
        <VStack className="w-full">
          <Text typography={"heading6"} className="pb-v-100 color-v-gray-800">
            나의 여행 취향 지표
          </Text>
        </VStack>
        <BottomBar />
      </VStack>
    </Box>
  );
};

export default HomePage;

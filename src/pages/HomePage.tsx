import { useEffect, useState } from "react";

import { Box, HStack, Text, VStack } from "@vapor-ui/core";

import BottomBar from "@/components/common/BottomBar";
import Carousel from "@/components/common/Carousel";
import UserKeywordHarubang from "@/components/common/UserKeywordHarubang";
import { StatItem } from "@/components/common/UserStats";

import { getLikedSpots, getVisitedSpots } from "@/apis/spots";
import { useAuth } from "@/hooks/useAuth";

import backActive from "@/assets/backImage/back_activity.png";
import backLocal from "@/assets/backImage/back_local.png";
import backNature from "@/assets/backImage/back_nature.png";
import backPeace from "@/assets/backImage/back_peace.png";
import backPopular from "@/assets/backImage/back_populat.png";
import card1 from "@/assets/cardImage/card1.png";
import card2 from "@/assets/cardImage/card2.png";
import card3 from "@/assets/cardImage/card3.png";
import iconHeart from "@/assets/icon_heart.svg";
import iconShoes from "@/assets/icon_shoes.svg";

const BACKGROUND_IMAGES: Record<string, string> = {
  QUIET: backPeace,
  LOCAL: backLocal,
  ACTIVE: backActive,
  NATURE: backNature,
  POPULAR: backPopular,
};

const HomePage = () => {
  const { user } = useAuth();
  const [likedCount, setLikedCount] = useState(0);
  const [visitedCount, setVisitedCount] = useState(0);

  const backgroundImage = user?.keyword ? BACKGROUND_IMAGES[user.keyword] || backPeace : backPeace;

  useEffect(() => {
    const fetchPlaces = async () => {
      try {
        const [likedResponse, visitedResponse] = await Promise.all([
          getLikedSpots(),
          getVisitedSpots(),
        ]);

        // likedResponse 처리
        if (likedResponse) {
          if (Array.isArray(likedResponse)) {
            setLikedCount(likedResponse.length);
          } else if (likedResponse.success && likedResponse.data) {
            const likedData = likedResponse.data;
            if (Array.isArray(likedData)) {
              setLikedCount(likedData.length);
            } else if (likedData && typeof likedData === "object" && !Array.isArray(likedData)) {
              const dataObj = likedData as Record<string, unknown>;
              const spots = (
                Array.isArray(dataObj.list)
                  ? dataObj.list
                  : Array.isArray(dataObj.spots)
                    ? dataObj.spots
                    : []
              ) as unknown[];
              setLikedCount(spots.length);
            }
          }
        }

        // visitedResponse 처리
        if (visitedResponse) {
          if (Array.isArray(visitedResponse)) {
            setVisitedCount(visitedResponse.length);
          } else if (visitedResponse.success && visitedResponse.data) {
            const visitedData = visitedResponse.data;
            if (Array.isArray(visitedData)) {
              setVisitedCount(visitedData.length);
            } else if (
              visitedData &&
              typeof visitedData === "object" &&
              !Array.isArray(visitedData)
            ) {
              const dataObj = visitedData as Record<string, unknown>;
              const spots = (
                Array.isArray(dataObj.list)
                  ? dataObj.list
                  : Array.isArray(dataObj.spots)
                    ? dataObj.spots
                    : []
              ) as unknown[];
              setVisitedCount(spots.length);
            }
          }
        }
      } catch (error) {
        console.error("Failed to fetch places:", error);
      }
    };

    fetchPlaces();
  }, []);

  return (
    <Box className="relative min-h-screen w-full">
      <img
        src={backgroundImage}
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
          <Text typography={"heading6"} className="pb-v-100 color-v-gray-800 px-v-150">
            나의 여행 취향 지표
          </Text>
          <Box className="gap-v-200 rounded-v-400 bg-v-gray-50 px-v-300 py-v-200 flex h-[56px] w-full">
            <StatItem
              icon={iconHeart}
              count={likedCount}
              direction="horizontal"
              className="gap-v-100 flex-1 items-center justify-center"
              iconClassName="h-[32px] w-[32px]"
              textClassName=""
              typography="heading6"
            />
            <StatItem
              icon={iconShoes}
              count={visitedCount}
              direction="horizontal"
              className="gap-v-100 flex-1 items-center justify-center"
              iconClassName="h-[32px] w-[32px]"
              textClassName=""
              typography="heading6"
            />
          </Box>
        </VStack>
        <BottomBar />
      </VStack>
    </Box>
  );
};

export default HomePage;

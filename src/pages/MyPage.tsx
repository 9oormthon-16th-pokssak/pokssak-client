import { useEffect, useState } from "react";

import type { Spot } from "@/types/map";
import { Badge, Flex, Table, Tabs, Text, VStack } from "@vapor-ui/core";

import UserKeywordHarubang from "@/components/common/UserKeywordHarubang";
import UserKeywordImage from "@/components/common/UserKeywordImage";
import { StatItem } from "@/components/common/UserStats";

import { getLikedSpots, getVisitedSpots } from "@/apis/spots";
import { useAuth } from "@/hooks/useAuth";

import iconHeart from "@/assets/icon_heart.svg";
import iconShoes from "@/assets/icon_shoes.svg";

const MyPage = () => {
  const { user } = useAuth();
  const [likedCount, setLikedCount] = useState(0);
  const [visitedCount, setVisitedCount] = useState(0);
  const [likedSpots, setLikedSpots] = useState<Spot[]>([]);
  const [visitedSpots, setVisitedSpots] = useState<Spot[]>([]);
  const [activeTab, setActiveTab] = useState("tab1");

  useEffect(() => {
    const fetchPlaces = async () => {
      try {
        const [likedResponse, visitedResponse] = await Promise.all([
          getLikedSpots(),
          getVisitedSpots(),
        ]);

        // likedResponse 처리
        console.log("likedResponse:", likedResponse);
        if (likedResponse) {
          // 응답이 직접 배열인 경우
          if (Array.isArray(likedResponse)) {
            setLikedCount(likedResponse.length);
            setLikedSpots(likedResponse);
          }
          // 응답이 ApiResponse 구조인 경우
          else if (likedResponse.success && likedResponse.data) {
            const likedData = likedResponse.data;
            if (Array.isArray(likedData)) {
              setLikedCount(likedData.length);
              setLikedSpots(likedData);
            } else if (likedData && typeof likedData === "object" && !Array.isArray(likedData)) {
              // data가 객체이고 내부에 배열이 있을 수 있음
              const dataObj = likedData as Record<string, unknown>;
              const spots = (
                Array.isArray(dataObj.list)
                  ? dataObj.list
                  : Array.isArray(dataObj.spots)
                    ? dataObj.spots
                    : []
              ) as Spot[];
              setLikedCount(spots.length);
              setLikedSpots(spots);
            }
          }
        }

        // visitedResponse 처리
        console.log("visitedResponse:", visitedResponse);
        if (visitedResponse) {
          // 응답이 직접 배열인 경우
          if (Array.isArray(visitedResponse)) {
            setVisitedCount(visitedResponse.length);
            setVisitedSpots(visitedResponse);
          }
          // 응답이 ApiResponse 구조인 경우
          else if (visitedResponse.success && visitedResponse.data) {
            const visitedData = visitedResponse.data;
            if (Array.isArray(visitedData)) {
              setVisitedCount(visitedData.length);
              setVisitedSpots(visitedData);
            } else if (
              visitedData &&
              typeof visitedData === "object" &&
              !Array.isArray(visitedData)
            ) {
              // data가 객체이고 내부에 배열이 있을 수 있음
              const dataObj = visitedData as Record<string, unknown>;
              const spots = (
                Array.isArray(dataObj.list)
                  ? dataObj.list
                  : Array.isArray(dataObj.spots)
                    ? dataObj.spots
                    : []
              ) as Spot[];
              setVisitedCount(spots.length);
              setVisitedSpots(spots);
            }
          }
        }
      } catch (error) {
        console.error("Failed to fetch places:", error);
        // 에러 발생 시 기본값 유지 (0)
      }
    };

    fetchPlaces();
  }, []);

  return (
    <VStack className="p-v-300">
      <VStack>
        {/* 유저 취향 따라 이미지 변경 */}
        {user?.keyword && (
          <UserKeywordHarubang keyword={user.keyword} className="mx-auto h-[160px] w-[160px]" />
        )}
        {/* 유저 이름 */}
        {user?.name && (
          <Text typography="heading4" foreground="normal-200" className="pb-v-150 text-center">
            {user.name}
          </Text>
        )}
        {/* 좋아요 개수 && 가봤어요 개수 표시 - API*/}
        <Flex className="gap-v-500 pb-v-150 justify-center">
          <StatItem icon={iconHeart} count={likedCount} label="가고싶은 곳" />
          <StatItem icon={iconShoes} count={visitedCount} label="다녀온 곳" />
        </Flex>
      </VStack>
      <section>
        {/* 탭 컴포넌트 */}
        <Tabs.Root
          value={activeTab}
          onValueChange={setActiveTab}
          size="md"
          className="mb-v-150 w-full"
        >
          <Tabs.List>
            <Tabs.Trigger value="tab1" className="h-[40px] w-1/2">
              가고 싶은 곳
            </Tabs.Trigger>
            <Tabs.Trigger value="tab2" className="h-[40px] w-1/2">
              다녀온 곳
            </Tabs.Trigger>
            <Tabs.Indicator />
          </Tabs.List>
        </Tabs.Root>
        {/* TableRow 컴포넌트 */}
        {(activeTab === "tab1" ? likedSpots : visitedSpots).length > 0 && (
          <Table.Root className="w-full">
            <Table.Body className="w-full">
              {(activeTab === "tab1" ? likedSpots : visitedSpots).map(spot => (
                <Table.Row key={spot.id} className="w-full border-b-0">
                  <Table.Cell className="color-v-gray-600 text-left">{spot.name}</Table.Cell>
                  <Table.Cell className="gap-v-100 flex items-center justify-end">
                    <UserKeywordImage
                      keyword={spot.keyword}
                      className="h-[16px] w-[16px]"
                      alt={spot.keyword}
                    />
                    <Badge shape="square" className="bg-v-gray-50 px-v-100">
                      <Text typography="subtitle1">{spot.keyword}</Text>
                    </Badge>
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table.Root>
        )}
      </section>
    </VStack>
  );
};

export default MyPage;

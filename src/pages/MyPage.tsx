import { useEffect, useState } from "react";

import type { Spot } from "@/types/map";
import { Badge, Table, Tabs, Text, VStack } from "@vapor-ui/core";

import UserKeywordImage from "@/components/common/UserKeywordImage";
import UserStats from "@/components/common/UserStats";

import { getLikedSpots, getVisitedSpots } from "@/apis/spots";
import { useAuth } from "@/hooks/useAuth";

const MyPage = () => {
  const { user } = useAuth();
  const [likedCount, setLikedCount] = useState(0);
  const [visitedCount, setVisitedCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [likedSpots, setLikedSpots] = useState<Spot[]>([]);
  const [visitedSpots, setVisitedSpots] = useState<Spot[]>([]);
  const [activeTab, setActiveTab] = useState("tab1");

  useEffect(() => {
    const fetchPlaces = async () => {
      try {
        setLoading(true);
        const [likedResponse, visitedResponse] = await Promise.all([
          getLikedSpots(),
          getVisitedSpots(),
        ]);

        if (likedResponse.success && likedResponse.data) {
          setLikedCount(likedResponse.data.length);
          setLikedSpots(likedResponse.data);
        }

        if (visitedResponse.success && visitedResponse.data) {
          setVisitedCount(visitedResponse.data.length);
          setVisitedSpots(visitedResponse.data);
        }
      } catch (error) {
        console.error("Failed to fetch places:", error);
        // 에러 발생 시 기본값 유지 (0)
      } finally {
        setLoading(false);
      }
    };

    fetchPlaces();
  }, []);

  return (
    <VStack>
      <VStack>
        {/* 유저 취향 따라 이미지 변경 */}
        {user?.keyword && (
          <UserKeywordImage
            keyword={user.keyword}
            className="mx-auto h-[160px] w-[160px]"
            alt="유저 취향 아이콘"
          />
        )}
        {/* 유저 이름 */}
        {user?.name && (
          <Text typography="heading4" foreground="normal-200" className="pb-v-150 text-center">
            {user.name}
          </Text>
        )}
        {/* 좋아요 개수 && 가봤어요 개수 표시 - API*/}
        {!loading && <UserStats likedCount={likedCount} visitedCount={visitedCount} />}
      </VStack>
      <section>
        {/* 탭 컴포넌트 */}
        <Tabs.Root value={activeTab} onValueChange={setActiveTab} size="md" className="w-full">
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
          <Table.Root>
            <Table.Body>
              {(activeTab === "tab1" ? likedSpots : visitedSpots).map(spot => (
                <Table.Row key={spot.id}>
                  <Table.Cell>{spot.name}</Table.Cell>
                  <Table.Cell>
                    <Badge shape="pill">{spot.keyword}</Badge>
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

// --- PlaceBottomSheet.tsx ---
import { type Dispatch, type SetStateAction, useEffect, useState } from "react";

import type { Place } from "@/types/kakaoMap";
import type { SpotDetailResponse } from "@/types/map";
import { Badge, Box, Flex, HStack, Sheet, Text } from "@vapor-ui/core";
import { HeartOutlineIcon, LocationOutlineIcon } from "@vapor-ui/icons";

import BottomSheetButton from "@/components/map/BottomSheetButton";
import InfoCard from "@/components/map/InfoCard";

import { getSpotDetail } from "@/apis/map";
import { useGeoLocation } from "@/hooks/useGeoLocation";
import { haversineDistanceMeters } from "@/utils/distance";

interface Props {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  selectedPlace: Place;
}

const PlaceBottomSheet = ({ isOpen, setIsOpen, selectedPlace }: Props) => {
  const [place, setPlace] = useState<SpotDetailResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const { location, isLoading } = useGeoLocation();

  useEffect(() => {
    if (!selectedPlace?.id) {
      return;
    }

    const fetchSpotDetail = async () => {
      try {
        setLoading(true);
        const res = await getSpotDetail({ spotId: Number(selectedPlace.id) });
        setPlace(res.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchSpotDetail();
  }, [selectedPlace.id]);

  // 거리 계산 및 Status 결정 로직
  let buttonStatus: 0 | 1 | 2 = 0; // 기본값은 타입1 (100m보다 멈)
  const MAX_DISTANCE_M = 100; // 100 미터 임계값

  // 장소 데이터가 있고, 사용자 위치를 성공적으로 가져왔을 때만 거리 계산 진행
  if (place && location && !isLoading) {
    const userLat = location.latitude;
    const userLng = location.longitude;
    const placeLat = place.location.latitude;
    const placeLng = place.location.longitude;

    // 현재 위치와 장소 간의 거리 계산
    const distance = haversineDistanceMeters(userLat, userLng, placeLat, placeLng);
    console.log(distance);
    // 거리 판별
    if (distance <= MAX_DISTANCE_M) {
      // 100m 이내: 타입2
      buttonStatus = 2;
    } else {
      // 100m 초과: 타입1
      buttonStatus = 1;
    }
  }

  // 스켈레톤 로딩
  if (loading) {
    return (
      <Sheet.Root open={isOpen} onOpenChange={setIsOpen} modal={true}>
        <Sheet.Popup
          className={"h-fit"}
          positionerElement={<Sheet.PositionerPrimitive side="bottom" />}
        >
          <Flex className={"p-v-300 gap-v-200 w-full"} flexDirection={"column"}>
            {/* 제목 스켈레톤 */}
            <div className="skeleton skeleton-text h-6 w-1/2" />

            {/* 주소 */}
            <div className="skeleton skeleton-text h-4 w-3/4" />

            {/* 태그 3개 */}
            <Flex flexDirection={"row"} gap={"12px"} className={"mt-v-150"}>
              <div className="skeleton skeleton-tag" />
              <div className="skeleton skeleton-tag" />
              <div className="skeleton skeleton-tag" />
            </Flex>

            {/* 카드 두 개 */}
            <div className="skeleton skeleton-card" />
            <div className="skeleton skeleton-card" />
          </Flex>
        </Sheet.Popup>
      </Sheet.Root>
    );
  }

  // 실제 데이터 화면
  return (
    <Sheet.Root open={isOpen} onOpenChange={setIsOpen} modal={true}>
      <Sheet.Popup
        className={"h-fit"}
        positionerElement={<Sheet.PositionerPrimitive side="bottom" />}
      >
        <Sheet.Header className={"p-0"}>
          <Sheet.Title className={"w-full"}>
            <Flex
              className={"pt-v-250 px-v-300 w-full"}
              flexDirection={"row"}
              alignItems={"center"}
              justifyContent={"space-between"}
            >
              <Text typography={"heading4"}>{place?.name ?? selectedPlace.name}</Text>
              <HStack className={"gap-v-100"}>
                <HeartOutlineIcon
                  width={24}
                  height={24}
                  color={"var(--vapor-color-gray-600)"}
                  className={"cursor-pointer"}
                />
                <LocationOutlineIcon
                  width={24}
                  height={24}
                  color={"var(--vapor-color-gray-600)"}
                  className={"cursor-pointer"}
                  onClick={() => {
                    window.open(place?.mapLink, "_blank");
                  }}
                />
              </HStack>
            </Flex>
          </Sheet.Title>
        </Sheet.Header>

        <Sheet.Body className={"pb-v-250 p-0"}>
          <Flex className={"gap-v-150 w-full"} flexDirection={"column"}>
            <Flex flexDirection={"column"} gap={"4px"} className={"px-v-300 w-full"}>
              <Text typography={"body1"}>{place?.location.address ?? selectedPlace.address}</Text>

              <Flex gap={"$100"}>
                {place?.tags?.map((tag, index) => (
                  <Badge
                    key={index}
                    colorPalette={"primary"}
                    size={"md"}
                    shape={"square"}
                    className={"px-v-100"}
                    color={"var(--vapor-color-blue-300)"}
                    backgroundColor={"var(--vapor-color-blue-050)"}
                  >
                    #{tag}
                  </Badge>
                ))}
              </Flex>
            </Flex>

            {place?.description && <InfoCard type={"AI"} text={place.description} />}
            {place?.tip && <InfoCard type={"TIP"} text={place.tip} />}
          </Flex>
        </Sheet.Body>

        <Sheet.Footer className={"p-0"}>
          <Box className={"px-v-150 pt-v-100 pb-v-175 w-full"}>
            {/* 거리 계산 결과에 따라 buttonStatus 값 전달 */}
            <BottomSheetButton status={buttonStatus} />
          </Box>
        </Sheet.Footer>
      </Sheet.Popup>
    </Sheet.Root>
  );
};

export default PlaceBottomSheet;

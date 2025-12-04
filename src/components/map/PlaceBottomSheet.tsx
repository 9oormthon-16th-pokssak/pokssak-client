import type { Dispatch, SetStateAction } from "react";

import type { Place } from "@/types/kakaoMap";
import { Badge, Box, Flex, HStack, Sheet, Text } from "@vapor-ui/core";
import { HeartOutlineIcon, LocationOutlineIcon } from "@vapor-ui/icons";

import BottomSheetButton from "@/components/map/BottomSheetButton";
import InfoCard from "@/components/map/InfoCard";

interface Props {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  selectedPlace: Place;
}

const PlaceBottomSheet = ({ isOpen, setIsOpen, selectedPlace }: Props) => {
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
              <Text typography={"heading4"}>{selectedPlace.name}</Text>
              <HStack className={"gap-v-100"}>
                <HeartOutlineIcon width={24} height={24} color={"var(--vapor-color-gray-600)"} />
                <LocationOutlineIcon width={24} height={24} color={"var(--vapor-color-gray-600)"} />
              </HStack>
            </Flex>
          </Sheet.Title>
        </Sheet.Header>
        <Sheet.Body className={"pb-v-250 p-0"}>
          <Flex className={"gap-v-150 w-full"} flexDirection={"column"}>
            <Flex flexDirection={"column"} gap={"4px"} className={"px-v-300 w-full"}>
              <Text typography={"body1"}>{selectedPlace.address}</Text>
              <Flex gap={"$100"}>
                <Badge
                  colorPalette={"primary"}
                  size={"md"}
                  shape={"square"}
                  className={"px-v-100"}
                  color={"var(--vapor-color-blue-300)"}
                  backgroundColor={"var(--vapor-color-blue-050)"}
                >
                  #온종일 햇빛존
                </Badge>
                <Badge
                  colorPalette={"primary"}
                  size={"md"}
                  shape={"square"}
                  className={"px-v-100"}
                  color={"var(--vapor-color-blue-300)"}
                  backgroundColor={"var(--vapor-color-blue-050)"}
                >
                  #미디어아트
                </Badge>
                <Badge
                  colorPalette={"primary"}
                  size={"md"}
                  shape={"square"}
                  className={"px-v-100"}
                  color={"var(--vapor-color-blue-300)"}
                  backgroundColor={"var(--vapor-color-blue-050)"}
                >
                  #아이와 함께
                </Badge>
              </Flex>
            </Flex>
            <InfoCard type={"AI"} text={"빛과 소리로 만들어낸 압도적인 몰입형 미디어아트 전시관"} />
            <InfoCard
              type={"TIP"}
              text={
                "전시 관람 후 '티바(Tea Bar)'에서 미디어아트와 함께 차를 마시는 체험도 인기입니다"
              }
            />
          </Flex>
        </Sheet.Body>
        <Sheet.Footer className={"p-0"}>
          <Box className={"px-v-150 pt-v-100 pb-v-175 w-full"}>
            <BottomSheetButton status={2} />
          </Box>
        </Sheet.Footer>
      </Sheet.Popup>
    </Sheet.Root>
  );
};

export default PlaceBottomSheet;

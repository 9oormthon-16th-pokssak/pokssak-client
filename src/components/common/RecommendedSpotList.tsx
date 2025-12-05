import type { Spot } from "@/types/map";
import { Box, HStack, Text, VStack } from "@vapor-ui/core";
import { LocationIcon } from "@vapor-ui/icons";

interface RecommendedSpotListProps {
  spots: Spot[];
}

const RecommendedSpotList = ({ spots }: RecommendedSpotListProps) => {
  if (spots.length === 0) {
    return (
      <Box className="w-full">
        <Text typography={"subtitle2"} color={"var(--vapor-color-gray-600)"}>
          추천 스팟이 없습니다.
        </Text>
      </Box>
    );
  }

  return (
    <VStack className="gap-v-200 w-full">
      {spots.map(spot => (
        <Box
          key={spot.id}
          className="rounded-v-300 bg-v-blue-50 px-v-150 py-v-100 hover:bg-v-blue-100 w-full cursor-pointer transition-colors"
          onClick={() => {
            if (spot.mapLink) {
              window.open(spot.mapLink, "_blank", "noopener,noreferrer");
            }
          }}
        >
          <HStack className="gap-v-100 items-center justify-between">
            <VStack>
              <Text typography={"subtitle1"} className="color-v-gray-800">
                {spot.name}
              </Text>
              <Text typography={"subtitle2"} className="color-v-gray-600">
                {spot.description}
              </Text>
            </VStack>
            {spot.mapLink && (
              <LocationIcon width={24} height={24} color="var(--vapor-color-blue-500)" />
            )}
          </HStack>
        </Box>
      ))}
    </VStack>
  );
};

export default RecommendedSpotList;

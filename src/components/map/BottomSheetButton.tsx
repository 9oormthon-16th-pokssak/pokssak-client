import { useState } from "react";

import { Box, Button, Tooltip } from "@vapor-ui/core";

import { visitSpot } from "@/apis/map";

type BottomSheetButtonProps = {
  initialStatus: 0 | 1 | 2 | 3;
  spotId: number;
};

type ColorPalette =
  | "primary"
  | "secondary"
  | "success"
  | "warning"
  | "danger"
  | "contrast"
  | undefined;

interface Config {
  disabled: boolean;
  text: string;
  tooltip: string;
  color: ColorPalette;
  className?: string;
  style?: React.CSSProperties;
  opacity?: number;
}

const BottomSheetButton = ({ initialStatus, spotId }: BottomSheetButtonProps) => {
  const [status, setStatus] = useState(initialStatus);
  const [loading, setLoading] = useState(false);

  const getConfig = (): Config => {
    switch (status) {
      case 0:
        return {
          disabled: true,
          text: "위치 정보를 불러오는 중...",
          tooltip: "조금만 기다려주세요!",
          color: "primary",
          className: "w-full",
        };

      case 1:
        return {
          disabled: true,
          text: "호꼼 만 더 옵서예",
          tooltip: "👟 거의 다와가요! 도착하면 쿠폰을 드려요",
          color: "primary",
          className: "w-full",
        };

      case 2:
        return {
          disabled: loading,
          text: loading ? "처리 중..." : "여기 왓수다!",
          tooltip: "👏🏻 도착하셨네요! 지금 바로 쓸 수 있는 쿠폰받으세요",
          color: "primary",
          className: "w-full",
        };

      case 3:
        return {
          disabled: true,
          text: "또 보게 마씸",
          tooltip: "📱 지금 화면을 사장님께 보여주세요!",
          color: "primary",
          className: "w-full",
          style: { backgroundColor: "var(--vapor-color-green-400)" },
          opacity: 1,
        };

      default:
        return {
          disabled: false,
          text: "",
          tooltip: "",
          color: "primary",
        };
    }
  };

  const config = getConfig();

  const handleClick = async () => {
    if (status === 2 && !loading) {
      setLoading(true);
      try {
        await visitSpot({ spotId });
        setStatus(3); // 성공하면 상태 3으로 변경
      } catch (error) {
        console.error("방문 API 호출 실패", error);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <Box className="relative w-full">
      <Tooltip.Root defaultOpen={true} open={true}>
        <Tooltip.Trigger
          render={
            <Button
              size="xl"
              disabled={config.disabled}
              colorPalette={config.color}
              className={config.className}
              style={config.style}
              opacity={config.opacity}
              onClick={handleClick}
            >
              {config.text}
            </Button>
          }
        />
        <Tooltip.Popup
          positionerElement={<Tooltip.PositionerPrimitive side="top" className="z-50" />}
        >
          {config.tooltip}
        </Tooltip.Popup>
      </Tooltip.Root>
    </Box>
  );
};

export default BottomSheetButton;

import { Box, Button, Tooltip } from "@vapor-ui/core";

type BottomSheetButtonProps = {
  status: 1 | 2 | 3;
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

const BottomSheetButton = ({ status }: BottomSheetButtonProps) => {
  const getConfig = (): Config => {
    switch (status) {
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
          disabled: false,
          text: "여기 왓수다!",
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

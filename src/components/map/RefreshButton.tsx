import { Button, Text } from "@vapor-ui/core";

import RefreshIcon from "@/assets/map/RefreshOutlineIcon.webp";

const RefreshButton = () => {
  return (
    <Button
      className={
        "rounded-v-900 py-v-50 px-v-200 fixed top-14 left-1/2 z-50 w-fit -translate-x-1/2 shadow-[0px_1px_3px_0px_rgba(0,0,0,0.20)]"
      }
      colorPalette={"primary"}
      variant={"outline"}
    >
      <img src={RefreshIcon} />
      <Text typography={"subtitle1"}>이 위치에서 검색</Text>
    </Button>
  );
};

export default RefreshButton;

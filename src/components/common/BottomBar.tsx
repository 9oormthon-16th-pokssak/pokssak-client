import { Button, Flex } from "@vapor-ui/core";

const BottomBar = () => {
  return (
    <div className="fixed bottom-0 z-50 w-full bg-white">
      <Flex justifyContent={"space-between"} alignItems={"center"} width={"auto"}>
        <Button>버튼 1</Button>
        <Button>버튼 2</Button>
        <Button>버튼 3</Button>
      </Flex>
    </div>
  );
};

export default BottomBar;

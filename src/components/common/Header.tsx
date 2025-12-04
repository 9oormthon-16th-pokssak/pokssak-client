import { Flex, Text } from "@vapor-ui/core";

const Header = () => {
  return (
    <div className="fixed top-0 z-50 w-full bg-white">
      <Flex justifyContent={"space-between"} alignItems={"center"} width={"auto"}>
        <Text>조용한</Text>
        <Text>3km 이내</Text>
      </Flex>
    </div>
  );
};

export default Header;

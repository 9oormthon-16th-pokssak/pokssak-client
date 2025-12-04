import { HStack, Text, VStack } from "@vapor-ui/core";

import BottomBar from "@/components/common/BottomBar";
import UserKeywordHarubang from "@/components/common/UserKeywordHarubang";

import { useAuth } from "@/hooks/useAuth";

const HomePage = () => {
  const { user } = useAuth();

  return (
    <VStack className={"p-v-300"}>
      <HStack className={"gap-v-200 w-full"} justifyContent={"space-between"} marginTop={"$400"}>
        <Text typography={"heading3"}>
          {user?.name || "게스트"} 님<br />
          어디로 떠나볼까요?
        </Text>
        {user?.keyword ? (
          <UserKeywordHarubang keyword={user.keyword} className="h-[120px] w-[120px]" />
        ) : null}
      </HStack>
      <BottomBar />
    </VStack>
  );
};

export default HomePage;

import { Flex, HStack, Text } from "@vapor-ui/core";
import { ChevronLeftOutlineIcon } from "@vapor-ui/icons";
import { useNavigate, useParams } from "react-router-dom";

import QlationItem from "@/components/qlation/QlationItem";

import { type QlationItemData, qlationData1 } from "@/constants/qlationData";
import { qlationData2 } from "@/constants/qlationData";
import { qlationData3 } from "@/constants/qlationData";

const QlationPage = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  // id 값에 따른 제목과 데이터 설정
  let title = "";
  let data: QlationItemData[] = [];

  if (id === "1") {
    title = `파도 소리를 품은\n제주 해안 산책로 BEST 5`;
    data = qlationData1;
  } else if (id === "2") {
    title = "제주 속 숨은\n로컬 맛집 3선";
    data = qlationData2;
  } else if (id === "3") {
    title = "제주에서 느낄 수 있는\n로컬 카페 10곳";
    data = qlationData3;
  }

  return (
    <Flex gap={"$075"} flexDirection={"column"} padding={"$300"} paddingBottom={"$800"}>
      <HStack>
        <button
          type="button"
          onClick={() => navigate(-1)}
          className={"flex items-center justify-center rounded-full p-0 pb-2 transition-colors"}
          aria-label="뒤로 가기"
        >
          <ChevronLeftOutlineIcon width={32} height={32} />
        </button>
      </HStack>
      <Text typography={"heading3"}>
        {title.split("\n").map((line, index) => (
          <span key={index}>
            {line}
            <br />
          </span>
        ))}
      </Text>

      {/* 데이터 반복 매핑 */}
      {data.map(({ title, imageUrl, tags, description }) => (
        <QlationItem
          key={title}
          title={title}
          imageUrl={imageUrl}
          tags={tags}
          description={description}
        />
      ))}
    </Flex>
  );
};

export default QlationPage;

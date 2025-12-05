import { Badge, Flex, Text } from "@vapor-ui/core";

interface QlationItemProps {
  title: string;
  imageUrl?: string;
  tags: string[];
  description: string;
}

const QlationItem = ({ title, imageUrl, tags, description }: QlationItemProps) => {
  return (
    <Flex gap={"$100"} flexDirection={"column"}>
      <Text typography={"heading6"}>{title}</Text>

      {/* 이미지 */}
      <img src={imageUrl} className={"h-60 w-full object-cover"} alt={title} />

      {/* 태그 리스트 */}
      <Flex gap={"$100"}>
        {tags.map(tag => (
          <Badge
            key={tag}
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

      {/* 설명 */}
      <Text typography={"subtitle2"}>{description}</Text>
    </Flex>
  );
};

export default QlationItem;

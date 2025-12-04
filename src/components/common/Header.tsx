import { Field, Flex, Select } from "@vapor-ui/core";

const Header = () => {
  return (
    <Flex
      className="border-b-v-gray-100 h-v-700 fixed top-0 z-50 w-full items-center border-t bg-white"
      paddingLeft={"$300"}
      paddingRight={"$300"}
    >
      <Flex className={"gap-v-100 items-center"}>
        <div>이미지</div>
        <Field.Root name="country" className={"gap-v-100"}>
          <Select.Root placeholder="국가를 선택하세요">
            <Select.Trigger id="country-select" />
            <Select.Popup>
              <Select.Item value="조용한">조용한</Select.Item>
              <Select.Item value="여유로운">여유로운</Select.Item>
              <Select.Item value="일본">일본</Select.Item>
              <Select.Item value="중국">중국</Select.Item>
            </Select.Popup>
          </Select.Root>
        </Field.Root>
      </Flex>
    </Flex>
  );
};

export default Header;

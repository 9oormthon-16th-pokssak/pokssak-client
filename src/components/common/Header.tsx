import { Field, Flex, Select, Text } from "@vapor-ui/core";

import { PREFERENCES } from "@/constants/preferences";

interface HeaderProps {
  selectedPreference: string;
  onPreferenceChange: (preference: string) => void;
}

const Header = ({ selectedPreference, onPreferenceChange }: HeaderProps) => {
  const handleValueChange = (newValue: unknown) => {
    onPreferenceChange(newValue as string);
  };
  return (
    <Flex
      className="border-b-v-gray-100 h-v-700 fixed top-0 z-50 w-full items-center border-b bg-white"
      paddingLeft={"$300"}
      paddingRight={"$300"}
    >
      <Field.Root name="country" className={"gap-v-100"}>
        <Select.Root border={"none"} value={selectedPreference} onValueChange={handleValueChange}>
          <Select.TriggerPrimitive border="none" padding={"$000"}>
            <Select.ValuePrimitive>
              {(value: string) =>
                value ? (
                  <Flex className={"gap-v-100 items-center"}>
                    <img src={PREFERENCES.find(p => p.label === value)?.iconURL} />
                    <Text typography={"heading5"}>{value}</Text>
                  </Flex>
                ) : (
                  <Select.PlaceholderPrimitive>
                    <Text typography="heading5" foreground="secondary-200">
                      분위기를 선택해주세요
                    </Text>
                  </Select.PlaceholderPrimitive>
                )
              }
            </Select.ValuePrimitive>
            <Select.TriggerIconPrimitive />
          </Select.TriggerPrimitive>
          <Select.Popup>
            {PREFERENCES.map((item, i) => (
              <Select.Item key={i} value={item.label}>
                {item.label}
              </Select.Item>
            ))}
          </Select.Popup>
        </Select.Root>
      </Field.Root>
    </Flex>
  );
};

export default Header;

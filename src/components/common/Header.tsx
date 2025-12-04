import { useEffect, useState } from "react";

import { Field, Flex, Select, Text } from "@vapor-ui/core";

import { PREFERENCES } from "@/constants/preferences";

const USER_STORAGE_KEY = "user";

interface HeaderProps {
  selectedPreference: string;
  onPreferenceChange: (preference: string) => void;
}

const Header = ({ selectedPreference, onPreferenceChange }: HeaderProps) => {
  // localStorage에서 user의 keyword를 가져와서 초기 label로 매핑
  const getPreferenceFromStorage = (): string | null => {
    try {
      const storedUser = localStorage.getItem(USER_STORAGE_KEY);
      if (storedUser) {
        const user = JSON.parse(storedUser);
        if (user?.keyword) {
          // keyword(value)를 label로 변환
          const preference = PREFERENCES.find(p => p.value === user.keyword);
          if (preference) {
            return preference.label;
          }
        }
      }
    } catch (error) {
      console.error("Failed to parse user data from localStorage:", error);
    }
    return null;
  };

  const [mappedPreference, setMappedPreference] = useState<string | null>(() =>
    getPreferenceFromStorage()
  );

  // 컴포넌트 마운트 시 localStorage 값이 있으면 상위 컴포넌트에 반영
  useEffect(() => {
    if (mappedPreference) {
      onPreferenceChange(mappedPreference);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // 마운트 시 한 번만 실행

  const handleValueChange = (newValue: unknown) => {
    const newLabel = newValue as string;
    setMappedPreference(newLabel);
    onPreferenceChange(newLabel);
  };

  // 매핑된 preference가 있으면 사용, 없으면 props로 받은 값 사용
  const displayPreference = mappedPreference || selectedPreference;

  // 현재 선택된 preference의 정보 찾기 (이미지 매핑)
  const currentPreference = PREFERENCES.find(p => p.label === displayPreference);

  return (
    <Flex
      className="border-b-v-gray-100 h-v-700 fixed top-0 z-50 w-full items-center border-b bg-white"
      paddingLeft={"$300"}
      paddingRight={"$300"}
    >
      <Field.Root name="country" className={"gap-v-100"}>
        <Select.Root border={"none"} value={displayPreference} onValueChange={handleValueChange}>
          <Select.TriggerPrimitive border="none" padding={"$000"}>
            <Select.ValuePrimitive>
              {(value: string) =>
                value && currentPreference ? (
                  <Flex className={"gap-v-100 items-center"}>
                    <img src={currentPreference.iconURL} alt={currentPreference.label} />
                    <Text typography={"heading5"}>{currentPreference.label}</Text>
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

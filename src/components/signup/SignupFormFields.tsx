import { Box, Field, Text, TextInput, VStack } from "@vapor-ui/core";
import { CheckCircleIcon } from "@vapor-ui/icons";

import { PREFERENCES } from "@/constants/preferences";

interface SignupFormFieldsProps {
  step: 1 | 2;
  formData: {
    name: string;
    keyword: string;
  };
  onUpdate: (field: "name" | "keyword", value: string) => void;
}

const SignupFormFields = ({ step, formData, onUpdate }: SignupFormFieldsProps) => {
  return (
    <section className="w-full">
      <VStack className="gap-4">
        {step === 1 ? (
          <Box>
            <Field.Root name="name">
              <Box render={<Field.Label />} flexDirection="column" className="gap-v-200">
                <Text typography="heading3" foreground="normal-200">
                  닉네임을 <br /> 입력해 주세요.
                </Text>
                <TextInput
                  placeholder="닉네임"
                  onChange={e => onUpdate("name", e.target.value)}
                  className="px-v-300 rounded-v-300 h-v-600 border-v-normal"
                />
              </Box>
              {formData.name.length > 8 && <Field.Error>8자 이내로 입력해주세요</Field.Error>}
            </Field.Root>
          </Box>
        ) : (
          <Box className="w-full">
            <VStack className="gap-v-200 mb-v-500">
              <Text typography="heading3" foreground="normal-200">
                어떤 느낌의 <br /> 여행을 원하시나요?
              </Text>
              <Text typography="heading6" foreground="normal-200">
                원하시는 느낌의 장소만 추천해 드릴게요!
              </Text>
            </VStack>
            <VStack className="gap-3">
              {PREFERENCES.map(preference => {
                const isSelected = formData.keyword === preference.value;
                return (
                  <Box
                    key={preference.value}
                    onClick={() => onUpdate("keyword", preference.value)}
                    className={`gap-v-100 px-v-200 py-v-100 h-v-800 flex w-full cursor-pointer items-center justify-between rounded-lg border-2 transition-colors ${
                      isSelected
                        ? "bg-v-blue-50 border-v-blue-400"
                        : "bg-v-gray-50 border-v-gray-100"
                    }`}
                  >
                    <img
                      src={preference.iconURL}
                      alt={preference.label}
                      className="w-v-300 h-v-300"
                    />
                    <Text typography="heading6" className="color-v-gray-900 flex-1">
                      {preference.label}
                    </Text>
                    <CheckCircleIcon
                      className={`${isSelected ? "text-v-blue-400" : "text-v-gray-300"} w-v-300 h-v-300`}
                    />
                  </Box>
                );
              })}
            </VStack>
          </Box>
        )}
      </VStack>
    </section>
  );
};

export default SignupFormFields;

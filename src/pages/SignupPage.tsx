import { useState } from "react";

import { VStack } from "@vapor-ui/core";
import { useNavigate } from "react-router-dom";

import SignupFooter from "@/components/signup/SignupFooter";
import SignupFormFields from "@/components/signup/SignupFormFields";
import SignupHeader from "@/components/signup/SignupHeader";

import { signup } from "@/apis/signup";
import { useAuth } from "@/hooks/useAuth";

const NICKNAME_NAMES = [
  "가슬파람",
  "늦하늬바람",
  "돔박꼿",
  "세비꼿",
  "머루",
  "고냉이",
  "강생이",
  "풀썹",
  "미깡",
  "오름",
  "낭",
  "곶자왈",
  "좀녜",
  "물꾸럭",
  "빙애기",
  "박비",
  "돌",
  "몰",
  "물애기",
  "바당",
  "돌담",
  "솔낭",
  "가름",
  "고랑",
  "새별",
];

// localStorage 키 상수
const USER_STORAGE_KEY = "user";
const ACCESS_TOKEN_KEY = "accessToken";
const REFRESH_TOKEN_KEY = "refreshToken";

// 랜덤 닉네임 생성 함수
const generateRandomNickname = (): string => {
  const randomName = NICKNAME_NAMES[Math.floor(Math.random() * NICKNAME_NAMES.length)];
  const randomNumber = Math.floor(Math.random() * 999) + 1;
  const formattedNumber = randomNumber.toString().padStart(3, "0");

  return `${randomName}${formattedNumber}`;
};

const SignupPage = () => {
  const navigate = useNavigate();
  const { setUser } = useAuth();

  // SSOT: 모든 상태는 여기서만 관리
  const [step, setStep] = useState<1 | 2>(1);
  const [formData, setFormData] = useState({
    name: generateRandomNickname(),
    keyword: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleNext = async () => {
    if (step === 1) {
      // step 1: 닉네임이 입력되었는지 확인하고 다음 단계로 이동
      if (!formData.name.trim()) {
        alert("닉네임을 입력해주세요.");
        return;
      }
      // 닉네임이 저장되어 있으므로 다음 단계로 진행
      setStep(2);
    } else {
      // step 2: 완료 버튼 - 모든 데이터(name, keyword)를 API로 전송
      if (!formData.keyword.trim()) {
        alert("취향을 선택해주세요.");
        return;
      }

      // 모든 데이터가 준비되었으므로 API 요청 전송
      setIsSubmitting(true);
      try {
        const response = await signup({
          name: formData.name,
          keyword: formData.keyword,
        });

        // 회원가입 성공 시 localStorage에 저장
        if (response.success && response.data) {
          // user 정보 저장
          const userData = {
            name: formData.name,
            keyword: formData.keyword,
          };
          localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(userData));

          // 토큰 저장
          localStorage.setItem(ACCESS_TOKEN_KEY, response.data.accessToken);
          localStorage.setItem(REFRESH_TOKEN_KEY, response.data.refreshToken);

          // 인증 상태 업데이트
          setUser(userData);

          // 홈페이지로 이동
          navigate("/", { replace: true });
        }
      } catch (error) {
        // TODO: 에러 처리
        console.error("회원가입 실패:", error);
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const handleBack = () => {
    setStep(1);
  };

  const updateField = (field: "name" | "keyword", value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <VStack className="p-v-300 gap-v-500 h-full w-full" justifyContent="space-between">
      <VStack className="gap-v-200">
        <SignupHeader step={step} onBack={handleBack} />
        <SignupFormFields step={step} formData={formData} onUpdate={updateField} />
      </VStack>
      <SignupFooter step={step} onNext={handleNext} disabled={isSubmitting} />
    </VStack>
  );
};

export default SignupPage;

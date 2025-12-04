import { HStack } from "@vapor-ui/core";
import { ChevronLeftOutlineIcon } from "@vapor-ui/icons";

interface SignupHeaderProps {
  step: 1 | 2;
  onBack: () => void;
}

const SignupHeader = ({ step, onBack }: SignupHeaderProps) => {
  const progress = step === 1 ? 50 : 90;

  return (
    <section className="w-full">
      <HStack className="gap-v-75 pt-v-400 items-center">
        <button
          type="button"
          onClick={step === 2 ? onBack : undefined}
          className={`flex items-center justify-center rounded-full p-2 transition-colors ${
            step === 2 ? "pointer-events-auto" : "pointer-events-none invisible"
          }`}
          aria-label="뒤로 가기"
        >
          <ChevronLeftOutlineIcon className="h-4 w-4" />
        </button>
        <div className="flex-1">
          <div className="rounded-v-100 bg-v-gray-100 h-1 w-full">
            <div
              className="bg-v-blue-300 h-1 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </HStack>
    </section>
  );
};

export default SignupHeader;

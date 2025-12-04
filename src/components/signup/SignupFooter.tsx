import { Button } from "@vapor-ui/core";

interface SignupFooterProps {
  step: 1 | 2;
  onNext: () => void;
  disabled?: boolean;
}

const SignupFooter = ({ step, onNext, disabled = false }: SignupFooterProps) => {
  return (
    <section className="w-full">
      <Button
        onClick={onNext}
        disabled={disabled}
        colorPalette="primary"
        className="h-v-600 w-full"
      >
        {step === 1 ? "다음" : "완료"}
      </Button>
    </section>
  );
};

export default SignupFooter;

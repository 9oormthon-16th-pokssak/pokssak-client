import { VStack } from "@vapor-ui/core";

import logo from "@/assets/logo.svg";

const SplashScreen = () => {
  return (
    <VStack
      className="bg-v-blue-400 fixed inset-0 z-100 flex items-center justify-center"
      style={{
        height: "100vh",
        width: "100vw",
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
      }}
    >
      <img src={logo} alt="Pokssak Logo" style={{ width: "auto", height: "auto" }} />
    </VStack>
  );
};

export default SplashScreen;

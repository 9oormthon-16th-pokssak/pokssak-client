import { useEffect, useState } from "react";

import PageLayout from "@/layouts/PageLayout";
import { RegisteredRoute, UnauthenticatedRoute } from "@/routes";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import SplashScreen from "@/components/common/SplashScreen";
import { HomePage, MapPage, MyPage, PlaceDetailPage, SignupPage } from "@/pages";
import QlationPage from "@/pages/QlationPage";

import { AuthProvider } from "@/providers/AuthProvider";

function App() {
  const [isInitializing, setIsInitializing] = useState(true);

  useEffect(() => {
    // 인증 상태 확인이 완료되면 스플래시 숨김
    // 최소 1초는 스플래시를 보여줌 (너무 빠르게 사라지지 않도록)
    const timer = setTimeout(() => {
      setIsInitializing(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <AuthProvider>
      {isInitializing && <SplashScreen />}
      <BrowserRouter>
        <Routes>
          {/* 비회원 전용 라우트: 회원이 접근하면 홈으로 리다이렉트 */}
          <Route element={<UnauthenticatedRoute />}>
            <Route path="/signup" element={<SignupPage />} />
          </Route>

          {/* 회원 전용 라우트: 비회원이 접근하면 회원가입으로 리다이렉트 */}
          <Route element={<RegisteredRoute />}>
            <Route element={<PageLayout />}>
              <Route path="/" element={<HomePage />} />
              <Route path="/qlation/:id" element={<QlationPage />} />
              <Route path="/map" element={<MapPage />} />
              <Route path="/map/detail/:id" element={<PlaceDetailPage />} />
              <Route path="/mypage" element={<MyPage />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;

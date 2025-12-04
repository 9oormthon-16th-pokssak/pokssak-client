import PageLayout from "@/layouts/PageLayout";
import { RegisteredRoute, UnauthenticatedRoute } from "@/routes";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import { HomePage, MapPage, MyPage, PlaceDetailPage, SignupPage } from "@/pages";

import { AuthProvider } from "@/providers/AuthProvider";

function App() {
  return (
    <AuthProvider>
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

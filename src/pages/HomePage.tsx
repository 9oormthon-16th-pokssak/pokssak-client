import { useEffect, useRef, useState } from "react";

import type { KakaoMap } from "@/global";

import { setMapType, zoomIn, zoomOut } from "@/utils/mapUtils";

import "./KakaoMap.css";

const HomePage = () => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<KakaoMap | null>(null);
  const [level, setLevel] = useState<number>(3);

  useEffect(() => {
    if (window.kakao && mapContainer.current) {
      const options = {
        center: new window.kakao.maps.LatLng(33.450701, 126.570667),
        level: 4,
      };

      setTimeout(() => {
        const kakaoMap = new window.kakao.maps.Map(mapContainer.current, options);
        setMap(kakaoMap);
      }, 200);
    }
    console.log(level);
  }, [mapContainer]);

  return (
    <div id="map" className="map_wrap" ref={mapContainer}>
      {/* 지도타입 컨트롤 div */}
      <div className="custom_typecontrol radius_border">
        <span id="btnRoadmap" className="selected_btn" onClick={() => setMapType(map, "roadmap")}>
          지도
        </span>
        <span id="btnSkyview" className="btn" onClick={() => setMapType(map, "skyview")}>
          스카이뷰
        </span>
      </div>
      {/* 지도 확대, 축소 컨트롤 div */}
      <div className="custom_zoomcontrol radius_border">
        <span onClick={() => zoomIn(map, setLevel)}>
          <img
            src="https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/ico_plus.png"
            alt="확대"
          />
        </span>
        <span onClick={() => zoomOut(map, setLevel)}>
          <img
            src="https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/ico_minus.png"
            alt="축소"
          />
        </span>
      </div>
    </div>
  );
};

export default HomePage;

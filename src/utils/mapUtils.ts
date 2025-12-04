import type { KakaoMap } from "@/global";

export const zoomIn = (map: KakaoMap, setLevel: React.Dispatch<number>) => {
  const currentLevel = map.getLevel();
  map.setLevel(currentLevel - 1);
  setLevel(map.getLevel());
};

export const zoomOut = (map: KakaoMap, setLevel: React.Dispatch<number>) => {
  const currentLevel = map.getLevel();
  map.setLevel(currentLevel + 1);
  setLevel(map.getLevel());
};

//장소 선택시 해당 장소 확대
export const zoomLocation = (map: KakaoMap) => {
  // const currentLevel = map.getLevel();
  map.setLevel(3);
  // setLevel(map.getLevel());
};

export const setZoom = (map: KakaoMap, zoom: number) => {
  map.setLevel(zoom);
};

export const displayLevel = (map: KakaoMap, setLevel: React.Dispatch<number>) => {
  setLevel(map.getLevel());
};

// 지도타입 컨트롤의 지도 또는 스카이뷰 버튼을 클릭하면 호출되어 지도타입을 바꾸는 함수입니다
export const setMapType = (map: KakaoMap, mapType: string) => {
  if (map) {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const roadmapControl = document.getElementById("btnRoadmap")!;
    const skyviewControl = document.getElementById("btnSkyview")!;
    if (mapType === "roadmap") {
      map.setMapTypeId(window.kakao.maps.MapTypeId.ROADMAP);
      roadmapControl.className = "selected_btn";
      skyviewControl.className = "btn";
    } else {
      map.setMapTypeId(window.kakao.maps.MapTypeId.HYBRID);
      skyviewControl.className = "selected_btn";
      roadmapControl.className = "btn";
    }
  }
};

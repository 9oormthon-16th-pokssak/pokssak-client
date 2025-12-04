// src/global.d.ts

declare global {
  interface Window {
    kakao: Kakao;
    AndroidBridge: AndroidBridge;
    webkit?: WebkitBridge;
  }
}

/* ---------------- Kakao Maps ---------------- */

interface Kakao {
  maps: KakaoMaps;
}

interface KakaoMaps {
  Map: new (container: HTMLElement | string, options: KakaoMapOptions) => KakaoMap;
  LatLng: new (lat: number, lng: number) => KakaoLatLng;
  Marker: new (options: KakaoMarkerOptions) => KakaoMarker;
  MapTypeId: KakaoMapTypeId;
}

interface KakaoMapTypeId {
  ROADMAP: string;
  HYBRID: string;
}

export interface KakaoMap {
  setCenter(latlng: KakaoLatLng): void;
  setLevel(level: number): void;
  getLevel(): number;
  setMapTypeId(type: string): void;
}

interface KakaoLatLng {
  getLat(): number;
  getLng(): number;
}

interface KakaoMapOptions {
  center: KakaoLatLng;
  level: number;
}

interface KakaoMarker {
  setMap(map: KakaoMap | null): void;
}

interface KakaoMarkerOptions {
  position: KakaoLatLng;
  map?: KakaoMap;
}

/* ---------------- Android Bridge ---------------- */

interface AndroidBridge {
  navigateTo?: (destination: string, url: string) => void;
  goBack?: () => void;
  handleLogout?: () => void;
}

/* ---------------- Webkit Bridge ---------------- */

interface WebkitBridge {
  messageHandlers?: Record<string, WebkitMessageHandler>;
}

interface WebkitMessageHandler {
  postMessage: (message: unknown) => void;
}

export {};

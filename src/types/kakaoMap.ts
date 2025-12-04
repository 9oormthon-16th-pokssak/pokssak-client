// 장소 데이터 타입 정의
export interface Place {
  id: number | string;
  lat: number;
  lng: number;
  name: string;
  address: string; // 상세 정보에 필요한 필드 추가
  phone?: string;
}

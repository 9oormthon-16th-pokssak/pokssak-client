import iconFire from "@/assets/icon_fire.svg";
import iconJoystick from "@/assets/icon_joystick.svg";
import iconMoon from "@/assets/icon_moon.svg";
import iconNature from "@/assets/icon_nature.svg";
import iconTangerine from "@/assets/icon_tangerine.svg";

export const PREFERENCES = [
  { label: "조용한", value: "QUIET", iconURL: iconMoon },
  { label: "로컬스러운", value: "LOCAL", iconURL: iconTangerine },
  { label: "활동적인", value: "ACTIVE", iconURL: iconJoystick },
  { label: "자연 친화적인", value: "NATURE", iconURL: iconNature },
  { label: "핫플레이스", value: "POPULAR", iconURL: iconFire },
] as const;

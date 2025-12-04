import { PREFERENCES } from "@/constants/preferences";

import activityDol from "@/assets/harubang/activity_dol.png";
import localDol from "@/assets/harubang/local_dol.png";
import natureDol from "@/assets/harubang/nature_dol.png";
import popularDol from "@/assets/harubang/popular_dol.png";
import quietDol from "@/assets/harubang/quiet_dol.png";
import originalActivityDol from "@/assets/original_harubang/original_activity_dol.png";
import originalHotDol from "@/assets/original_harubang/original_hot_dol.png";
import originalLocalDol from "@/assets/original_harubang/original_local_dol.png";
import originalNatureDol from "@/assets/original_harubang/original_nature_dol.png";
import originalQuietDol from "@/assets/original_harubang/original_quiet_dol.png";

interface UserKeywordHarubangProps {
  keyword: string;
  className?: string;
  alt?: string;
  original?: boolean;
}

const HARUBANG_IMAGES: Record<string, string> = {
  QUIET: quietDol,
  LOCAL: localDol,
  ACTIVE: activityDol,
  NATURE: natureDol,
  POPULAR: popularDol,
};

const ORIGINAL_HARUBANG_IMAGES: Record<string, string> = {
  QUIET: originalQuietDol,
  LOCAL: originalLocalDol,
  ACTIVE: originalActivityDol,
  NATURE: originalNatureDol,
  POPULAR: originalHotDol,
};

const UserKeywordHarubang = ({
  keyword,
  className = "",
  alt,
  original = false,
}: UserKeywordHarubangProps) => {
  const preference = PREFERENCES.find(pref => pref.value === keyword);

  if (!preference) {
    return null;
  }

  const imageSrc = original ? ORIGINAL_HARUBANG_IMAGES[keyword] : HARUBANG_IMAGES[keyword];

  if (!imageSrc) {
    return null;
  }

  return <img src={imageSrc} alt={alt || preference.label} className={className} />;
};

export default UserKeywordHarubang;

import { PREFERENCES } from "@/constants/preferences";

import activityDol from "@/assets/harubang/activity_dol.png";
import localDol from "@/assets/harubang/local_dol.png";
import natureDol from "@/assets/harubang/nature_dol.png";
import popularDol from "@/assets/harubang/popular_dol.png";
import quietDol from "@/assets/harubang/quiet_dol.png";

interface UserKeywordHarubangProps {
  keyword: string;
  className?: string;
  alt?: string;
}

const HARUBANG_IMAGES: Record<string, string> = {
  QUIET: quietDol,
  LOCAL: localDol,
  ACTIVE: activityDol,
  NATURE: natureDol,
  POPULAR: popularDol,
};

const UserKeywordHarubang = ({ keyword, className = "", alt }: UserKeywordHarubangProps) => {
  const preference = PREFERENCES.find(pref => pref.value === keyword);

  if (!preference) {
    return null;
  }

  const imageSrc = HARUBANG_IMAGES[keyword];

  if (!imageSrc) {
    return null;
  }

  return <img src={imageSrc} alt={alt || preference.label} className={className} />;
};

export default UserKeywordHarubang;

import { PREFERENCES } from "@/constants/preferences";

interface UserKeywordImageProps {
  keyword: string;
  className?: string;
  alt?: string;
}

const UserKeywordImage = ({ keyword, className = "", alt }: UserKeywordImageProps) => {
  const preference = PREFERENCES.find(pref => pref.label === keyword);

  if (!preference) {
    return null;
  }

  return <img src={preference.iconURL} alt={alt || preference.label} className={className} />;
};

export default UserKeywordImage;

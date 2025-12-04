import { LocationIcon } from "@vapor-ui/icons";

interface MyLocationButtonProps {
  onClick?: () => void;
}

const MyLocationButton = ({ onClick }: MyLocationButtonProps) => {
  return (
    <button
      className="flex h-[45px] w-[45px] cursor-pointer items-center justify-center rounded-full bg-white shadow-[0_0_8px_#00000025] transition-colors hover:bg-gray-50"
      onClick={onClick}
      type="button"
      aria-label="현재 위치로 이동"
    >
      <LocationIcon width={25} height={25} />
    </button>
  );
};

export default MyLocationButton;

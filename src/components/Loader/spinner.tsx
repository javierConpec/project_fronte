import ClipLoader from "react-spinners/ClipLoader";
import BeatLoader from "react-spinners/BeatLoader";

export function SpinnerClip() {
  return (
    <div className="flex justify-center  bg-background-0 rounded-2xl items-center h-full ">
      <ClipLoader color="#3d77a3ff" size={50} />
    </div>
  );
}
export function SpinnerBeat() {
  return (
    <div className="flex justify-center  bg-background-0 rounded-2xl items-center h-full ">
      <BeatLoader color="#3d77a3ff" size={20} />
    </div>
  );
}


import { useSelector } from "react-redux";
import { Howl } from "howler";

export const useSound = (toSound, volume) => {
  const isSound = useSelector((state) => state.sound);

  const sound = new Howl({
    src: [toSound],
    volume: volume,
  });

  const playSound = () => {
    isSound && sound.play();
  };

  return playSound;
};

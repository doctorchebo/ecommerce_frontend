import { useEffect, useState } from "react";

const useScroll = () => {
  const [lastPosition, setLastPosition] = useState(window.scrollY);
  const [visible, setVisible] = useState(true);
  useEffect(() => {
    const handleScroll = () => {
      let currentPosition = window.scrollY;
      if (currentPosition > lastPosition) {
        setVisible(false);
      } else {
        setVisible(true);
      }
      setLastPosition(currentPosition);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [visible]);

  return { visible };
};

export default useScroll;

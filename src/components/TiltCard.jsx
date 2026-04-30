import { useRef, useEffect } from "react";
import VanillaTilt from "vanilla-tilt";

const isTouch = window.matchMedia("(hover: none)").matches;

const TiltCard = ({ children, options, className = "", ...props }) => {
  const tiltRef = useRef(null);

  useEffect(() => {
    if (isTouch || !tiltRef.current) return;
    VanillaTilt.init(tiltRef.current, options || {
      max: 20,
      speed: 500,
      glare: true,
      transition: true,
      "max-glare": 0.1,
    });
    return () => tiltRef.current?.vanillaTilt?.destroy();
  }, [options]);

  return (
    <div ref={isTouch ? null : tiltRef} className={className} {...props}>
      {children}
    </div>
  );
};

export default TiltCard;

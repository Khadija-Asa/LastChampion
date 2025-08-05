import React, { useRef, useEffect } from "react";
import VanillaTilt from "vanilla-tilt";

const TiltCard = ({ children, options, className = "", ...props }) => {
  const tiltRef = useRef(null);

  useEffect(() => {
    if (tiltRef.current) {
      VanillaTilt.init(tiltRef.current, options || {
        max: 20,
        speed: 100,
        glare: true,
        "max-glare": 1,
      });
    }
    return () => tiltRef.current?.vanillaTilt?.destroy();
  }, [options]);

  return (
    <div ref={tiltRef} className={className} {...props}>
      {children}
    </div>
  );
};

export default TiltCard;

import React, { useEffect, useState } from "react";
import "./Watermark.css";

const WATERMARK_TEXT = "CJK Software Solutions";

/**
 * Determines if the current viewport is mobile-sized
 * Mobile breakpoint: 768px
 */
const useIsMobile = (): boolean => {
  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    // Initial check
    checkMobile();

    // Listen for resize events
    window.addEventListener("resize", checkMobile);

    return () => {
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

  return isMobile;
};

/**
 * Global Watermark Component
 */
const Watermark: React.FC = () => {
  const isMobile = useIsMobile();

  const isWatermarkEnabled =
    import.meta.env.VITE_IS_WATERMARK_ENABLED === "true";

  if (!isWatermarkEnabled) {
    return null;
  }

  const watermarkItems = Array.from({ length: 50 }, (_, index) => (
    <span key={index} className="watermark-text">
      {WATERMARK_TEXT}
    </span>
  ));

  return (
    <div
      className={`watermark-container ${
        isMobile ? "watermark-mobile" : "watermark-desktop"
      }`}
      aria-hidden="true"
      data-testid="watermark"
    >
      <div className="watermark-content">{watermarkItems}</div>
    </div>
  );
};

export default Watermark;

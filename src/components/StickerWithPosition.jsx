import React from 'react';
import "../CSS/Global/Stickers.css"

const StickerWithPosition = ({ position, top, bottom, left, right, rotation, src, alt, className }) => {
  const stickerClassName = `sticker-container ${className || ""}`;

  const imageStyle = {
    position: position,
    top: top,
    bottom: bottom,
    left: left,
    right: right,
    transform: `rotate(${rotation}deg)`,
  };

  return (
    <div className={stickerClassName}>
      <img src={src} alt={alt} style={imageStyle} />
    </div>
  );
};

export default StickerWithPosition;

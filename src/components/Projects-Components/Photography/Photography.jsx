import React, { useMemo } from "react";
import "../../../CSS/Projects/Photography/Photography.css";

// Automatically require all images from folder
const importAll = (r) =>
  r.keys().map((key) => ({
    src: r(key),
    alt: key.replace('./', '').replace(/\.[^/.]+$/, '') // remove './' and file extension
  }));

const originalImages = importAll(
  require.context("./Photograph_Images", false, /\.(jpe?g|png|webp)$/)
);

export default function Photography() {
  // Shuffle once on first render
  const shuffledImages = useMemo(() => {
    const shuffled = [...originalImages];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  }, []);

  return (
    <div className="photography-page">
      <section className="photograph-intro">
        <h1>Pictures I Have Taken So Far</h1>
        <p>Moments in time, framed through my lens</p>
      </section>

      <section className="photograph-gallery">
        <div className="photo-grid">
          {shuffledImages.map((img, index) => (
            <img key={index} src={img.src} alt={img.alt} className="photo" />
          ))}
        </div>
      </section>
    </div>
  );
}

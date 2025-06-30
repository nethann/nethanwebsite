import React, { useMemo } from "react";

import birthdayCake from "./Photograph_Images/birthday_cake.jpg";
import colongue from "./Photograph_Images/colongue.jpg";
import duck from "./Photograph_Images/duck.jpg";
import forest1 from "./Photograph_Images/forest_1.jpg";
import forest2 from "./Photograph_Images/forest_2.jpg";
import grass from "./Photograph_Images/grass.jpg";
import portrait from "./Photograph_Images/portrait.jpg";

import "../../../CSS/Projects/Photography/Photography.css";

export default function Photography() {
  const originalImages = [
    { src: birthdayCake, alt: "Birthday Cake" },
    { src: colongue, alt: "Cologne" },
    { src: duck, alt: "Duck" },
    { src: forest1, alt: "Forest 1" },
    { src: forest2, alt: "Forest 2" },
    { src: grass, alt: "Grass" },
    { src: portrait, alt: "Portrait" },
  ];

  // Shuffle once on first render using useMemo
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
        <p>Explore moments I've captured through my lens.</p>
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

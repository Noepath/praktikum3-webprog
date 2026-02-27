"use client";

import { useEffect, useState } from "react";

interface Star {
  id: number;
  x: number;
  y: number;
  duration: number;
  delay: number;
  bright: boolean;
  size: number;
}

function randomStars(count: number): Star[] {
  const stars: Star[] = [];
  for (let i = 0; i < count; i++) {
    stars.push({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      duration: 7 + Math.random() * 10, // 7-17 detik, lebih lambat
      delay: Math.random() * 12,
      bright: Math.random() > 0.7,
      size: 1 + Math.random() * 1.2, // 1 - 2.2px, lebih kecil
    });
  }
  return stars;
}

export default function StarsBackground() {
  const [stars, setStars] = useState<Star[]>([]);

  useEffect(() => {
    setStars(randomStars(100));
  }, []);

  return (
    <div className="fixed inset-0 z-1 pointer-events-none overflow-hidden">
      {stars.map((star) => (
        <div
          key={star.id}
          className={`star${star.bright ? " star-bright" : ""}`}
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            ["--duration" as string]: `${star.duration}s`,
            ["--delay" as string]: `${star.delay}s`,
          }}
        />
      ))}
    </div>
  );
}

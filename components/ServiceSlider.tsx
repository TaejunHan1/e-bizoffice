"use client";

import React, { useState, useEffect, useRef } from 'react';
import { useKeenSlider, KeenSliderPlugin } from 'keen-slider/react';
import 'keen-slider/keen-slider.min.css';

interface ServiceSliderProps {
  images: string[];
  title: string;
  description: string;
}

export default function ServiceSlider({ images, title, description }: ServiceSliderProps) {
  const [pause, setPause] = useState(false);
  const timer = useRef<NodeJS.Timeout>();

  const [sliderRef, sliderInstanceRef] = useKeenSlider<HTMLDivElement>(
    {
      loop: true,
      slides: { perView: 1 },
      renderMode: 'performance',
      defaultAnimation: {
        duration: 1000,
      },
    },
    [FadeSlider]
  );

  useEffect(() => {
    const slider = sliderInstanceRef.current;
    if (!slider) return;

    let timeout: NodeJS.Timeout;

    const clearNextTimeout = () => {
      if (timeout) clearTimeout(timeout);
    };

    const nextTimeout = () => {
      clearTimeout(timeout);
      if (pause) return;
      timeout = setTimeout(() => {
        slider.next();
      }, 3000);
    };

    slider.on('created', nextTimeout);
    slider.on('dragStarted', clearNextTimeout);
    slider.on('animationEnded', nextTimeout);
    slider.on('updated', nextTimeout);

    return () => {
      clearNextTimeout();
    };
  }, [pause, sliderInstanceRef]);

  return (
    <div
      className="mb-16"
      onMouseEnter={() => setPause(true)}
      onMouseLeave={() => setPause(false)}
    >
      <div ref={sliderRef} className="keen-slider relative h-[600px]">
        {images.map((image, idx) => (
          <div key={idx} className="keen-slider__slide">
            <img 
              src={image} 
              alt={`${title} ${idx + 1}`} 
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>
      <div className="text-center mt-8">
        <h2 className="text-3xl font-bold mb-4">{title}</h2>
        <p className="text-gray-600">{description}</p>
      </div>
    </div>
  );
}

// 페이드 효과를 위한 플러그인 정의
const FadeSlider: KeenSliderPlugin = (slider) => {
  function removeTransition() {
    slider.slides.forEach((slide) => {
      slide.style.transition = 'none';
    });
  }
  function setTransition() {
    slider.slides.forEach((slide) => {
      slide.style.transition = 'opacity 1s ease';
    });
  }
  function setOpacity() {
    slider.slides.forEach((slide, idx) => {
      slide.style.opacity = idx === slider.track.details.rel ? '1' : '0';
    });
  }
  slider.on('created', () => {
    slider.container.style.position = 'relative';
    slider.slides.forEach((slide) => {
      slide.style.position = 'absolute';
      slide.style.left = '0';
      slide.style.top = '0';
      slide.style.width = '100%';
    });
    setOpacity();
  });
  slider.on('animationStarted', () => {
    setTransition();
  });
  slider.on('animationEnded', () => {
    removeTransition();
    setOpacity();
  });
  slider.on('updated', () => {
    setOpacity();
  });
};

"use client";

import React, { useState, useEffect } from 'react';
import { useKeenSlider } from 'keen-slider/react';
import 'keen-slider/keen-slider.min.css';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface ServiceSliderProps {
  images: string[];
  title: string;
  description: string;
}

export default function ServiceSlider({ images, title, description }: ServiceSliderProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [loaded, setLoaded] = useState(false);

  // 수정된 슬라이더 설정
  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
    slides: {
      perView: 1,
      spacing: 0,
    },
    loop: true,
    initial: 0,
    slideChanged(slider) {
      setCurrentSlide(slider.track.details.rel);
    },
    created() {
      setLoaded(true);
    },
  });

  // 자동 슬라이딩 기능
  useEffect(() => {
    const timer = setInterval(() => {
      if (instanceRef.current) {
        instanceRef.current.next();
      }
    }, 5000);
    
    return () => {
      clearInterval(timer);
    };
  }, [instanceRef]);

  return (
    <div className="mb-16">
      <div className="relative">
        <div ref={sliderRef} className="keen-slider h-[300px] md:h-[500px] rounded-2xl overflow-hidden shadow-sm">
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

        {/* Navigation arrows */}
        {loaded && instanceRef.current && (
          <>
            <button 
              onClick={(e) => {
                e.stopPropagation();
                instanceRef.current?.prev();
              }} 
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-gray-700 w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center shadow-md transition-all duration-300 z-10"
              aria-label="Previous slide"
            >
              <ChevronLeft size={24} />
            </button>
            
            <button 
              onClick={(e) => {
                e.stopPropagation();
                instanceRef.current?.next();
              }} 
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-gray-700 w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center shadow-md transition-all duration-300 z-10"
              aria-label="Next slide"
            >
              <ChevronRight size={24} />
            </button>
          </>
        )}

        {/* Dots */}
        {loaded && instanceRef.current && (
          <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
            {Array.from(
              { length: instanceRef.current.track.details.slides.length },
              (_, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    instanceRef.current?.moveToIdx(idx);
                  }}
                  className={`w-2 h-2 md:w-3 md:h-3 rounded-full transition-all duration-300 ${
                    currentSlide === idx ? "bg-white scale-125" : "bg-white/50"
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              )
            )}
          </div>
        )}
      </div>
      
      <div className="text-center mt-6 md:mt-8">
        <h2 className="text-xl md:text-2xl font-bold mb-2 md:mb-3">{title}</h2>
        <p className="text-gray-600 max-w-3xl mx-auto text-sm md:text-base">{description}</p>
      </div>
    </div>
  );
}
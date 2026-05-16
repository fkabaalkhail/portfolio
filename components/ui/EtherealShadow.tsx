'use client';

import { useRef, useId, useEffect } from 'react';
import { animate, useMotionValue } from 'framer-motion';

interface EtherealShadowProps {
  color?: string;
  animation?: { scale: number; speed: number };
  noise?: { opacity: number; scale: number };
  sizing?: 'fill' | 'stretch';
  className?: string;
}

function mapRange(value: number, fromLow: number, fromHigh: number, toLow: number, toHigh: number) {
  if (fromLow === fromHigh) return toLow;
  return toLow + ((value - fromLow) / (fromHigh - fromLow)) * (toHigh - toLow);
}

// animated background effect for the hero section
export default function EtherealShadow({
  color = 'rgba(128, 128, 128, 1)',
  animation,
  noise,
  sizing = 'fill',
  className,
}: EtherealShadowProps) {
  const id = useId().replace(/:/g, '');
  const filterId = `shadow-${id}`;
  const matrixRef = useRef<SVGFEColorMatrixElement>(null);
  const hueValue = useMotionValue(180);

  const scale = animation ? mapRange(animation.scale, 1, 100, 20, 100) : 0;
  const speed = animation ? mapRange(animation.speed, 1, 100, 1000, 50) : 1;
  const enabled = animation && animation.scale > 0;

  useEffect(() => {
    if (!enabled || !matrixRef.current) return;

    hueValue.set(0);
    const ctrl = animate(hueValue, 360, {
      duration: speed / 25,
      repeat: Infinity,
      repeatType: 'loop',
      ease: 'linear',
      onUpdate: (v: number) => {
        matrixRef.current?.setAttribute('values', String(v));
      },
    });

    return () => ctrl.stop();
  }, [enabled, speed, hueValue]);

  return (
    <div className={className} style={{ overflow: 'hidden', position: 'relative', width: '100%', height: '100%' }}>
      <div style={{ position: 'absolute', inset: -scale, filter: enabled ? `url(#${filterId}) blur(4px)` : 'none' }}>
        {enabled && (
          <svg style={{ position: 'absolute' }}>
            <defs>
              <filter id={filterId}>
                <feTurbulence
                  result="undulation"
                  numOctaves={3}
                  baseFrequency={`${mapRange(animation.scale, 0, 100, 0.0008, 0.0003)},${mapRange(animation.scale, 0, 100, 0.003, 0.0015)}`}
                  seed={42}
                  type="fractalNoise"
                />
                <feColorMatrix ref={matrixRef} in="undulation" type="hueRotate" values="180" />
                <feColorMatrix in="dist" result="circulation" type="matrix" values="4 0 0 0 1  4 0 0 0 1  4 0 0 0 1  1 0 0 0 0" />
                <feDisplacementMap in="SourceGraphic" in2="circulation" scale={scale} result="dist" />
                <feDisplacementMap in="dist" in2="undulation" scale={scale} result="output" />
              </filter>
            </defs>
          </svg>
        )}
        <div
          style={{
            backgroundColor: color,
            maskImage: `url('https://framerusercontent.com/images/ceBGguIpUU8luwByxuQz79t7To.png')`,
            maskSize: sizing === 'stretch' ? '100% 100%' : 'cover',
            maskRepeat: 'no-repeat',
            maskPosition: 'center',
            width: '100%',
            height: '100%',
          }}
        />
      </div>

      {noise && noise.opacity > 0 && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: `url("https://framerusercontent.com/images/g0QcWrxr87K0ufOxIUFBakwYA8.png")`,
            backgroundSize: noise.scale * 200,
            backgroundRepeat: 'repeat',
            opacity: noise.opacity / 2,
          }}
        />
      )}
    </div>
  );
}

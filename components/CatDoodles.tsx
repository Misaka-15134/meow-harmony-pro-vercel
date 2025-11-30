import React from 'react';

export const PeekingCat = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 100 60" className={className} fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
    {/* Head */}
    <path d="M20 60 V 30 C 20 10, 80 10, 80 30 V 60" />
    {/* Ears */}
    <path d="M25 20 L 20 5 L 40 15" />
    <path d="M75 20 L 80 5 L 60 15" />
    {/* Face */}
    <path d="M35 35 Q 40 40, 45 35" /> 
    <path d="M55 35 Q 60 40, 65 35" />
    <circle cx="50" cy="45" r="2" fill="currentColor" stroke="none" />
    <path d="M50 45 L 45 50 M 50 45 L 55 50" />
    {/* Paws */}
    <path d="M10 60 Q 15 40, 25 60" />
    <path d="M75 60 Q 85 40, 90 60" />
  </svg>
);

export const SleepingCat = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 100 60" className={className} fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
    {/* Body */}
    <path d="M10 50 Q 10 20, 50 20 Q 90 20, 90 50" />
    <path d="M10 50 L 90 50" />
    {/* Tail */}
    <path d="M90 50 Q 100 40, 95 30" />
    {/* ZZZ */}
    <path d="M70 10 L 80 10 L 70 20 L 80 20" strokeWidth="2" opacity="0.6" />
    <path d="M85 0 L 90 0 L 85 5 L 90 5" strokeWidth="1.5" opacity="0.4" />
    {/* Face */}
    <path d="M30 40 Q 35 45, 40 40" /> 
    <path d="M45 40 Q 50 45, 55 40" />
  </svg>
);

export const RockCat = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 100 100" className={className} fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
    {/* Head */}
    <path d="M30 40 Q 30 20, 50 20 Q 70 20, 70 40 V 60 Q 70 80, 50 80 Q 30 80, 30 60 Z" />
    {/* Ears */}
    <path d="M35 25 L 30 10 L 45 22" />
    <path d="M65 25 L 70 10 L 55 22" />
    {/* Sunglasses */}
    <path d="M35 45 H 65 V 55 H 35 Z" fill="currentColor" fillOpacity="0.2"/>
    <line x1="50" y1="45" x2="50" y2="55" />
    {/* Mouth */}
    <path d="M45 70 Q 50 75, 55 70" />
    {/* Lightning */}
    <path d="M80 20 L 70 40 L 85 40 L 75 60" stroke="#EF5350" />
  </svg>
);

export const PawPrint = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 40 40" className={className} fill="currentColor">
    <circle cx="20" cy="25" r="9" />
    <circle cx="10" cy="15" r="3.5" />
    <circle cx="20" cy="10" r="3.5" />
    <circle cx="30" cy="15" r="3.5" />
  </svg>
);

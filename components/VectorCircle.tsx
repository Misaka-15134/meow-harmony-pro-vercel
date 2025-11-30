import React, { useRef, useEffect } from 'react';
import { ChordVector, SequenceItem } from '../types';
import { CIRCLE_ANGLES } from '../constants';

interface VectorCircleProps {
  currentVector: ChordVector | null;
  sequence: SequenceItem[];
  showNotes?: boolean;
  showPath?: boolean;
}

const VectorCircle: React.FC<VectorCircleProps> = ({ currentVector, sequence, showNotes = true, showPath = true }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const w = canvas.width;
    const h = canvas.height;
    const cx = w / 2;
    const cy = h / 2;
    const rMax = w / 2 - 40; // Padding

    // Clear
    ctx.clearRect(0, 0, w, h);

    // Draw Zones (Pastel Cat Theme Colors)
    const zones = [
      { start: 45, end: 135, color: 'rgba(0, 230, 118, 0.05)' }, // Greenish
      { start: -45, end: 45, color: 'rgba(255, 82, 82, 0.05)' }, // Reddish
      { start: 135, end: 225, color: 'rgba(68, 138, 255, 0.05)' } // Blueish
    ];
    
    zones.forEach(z => {
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.arc(cx, cy, rMax, -z.end * Math.PI / 180, -z.start * Math.PI / 180);
      ctx.fillStyle = z.color;
      ctx.fill();
    });

    // Draw Grid
    ctx.strokeStyle = '#E0E0E0';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.arc(cx, cy, rMax, 0, Math.PI * 2);
    ctx.stroke();
    
    ctx.beginPath();
    ctx.arc(cx, cy, rMax * 0.6, 0, Math.PI * 2);
    ctx.setLineDash([5, 5]);
    ctx.stroke();
    ctx.setLineDash([]);

    // Draw Labels (Circle of Fifths)
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.font = '14px "Comic Sans MS", sans-serif'; // Cat theme font

    Object.keys(CIRCLE_ANGLES).forEach(note => {
      const deg = CIRCLE_ANGLES[note];
      const rad = deg * Math.PI / 180;
      const labelR = rMax + 20;
      const x = cx + labelR * Math.cos(-rad);
      const y = cy + labelR * Math.sin(-rad);

      const isActive = currentVector?.notes.includes(note);
      
      ctx.fillStyle = isActive ? '#FF8A65' : '#9E9E9E'; // Primary vs Grey
      if (isActive) ctx.font = 'bold 16px "Comic Sans MS", sans-serif';
      else ctx.font = '12px "Comic Sans MS", sans-serif';
      
      ctx.fillText(note, x, y);

      if (isActive && showNotes) {
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.lineTo(cx + rMax * Math.cos(-rad), cy + rMax * Math.sin(-rad));
        ctx.strokeStyle = 'rgba(255, 138, 101, 0.3)';
        ctx.stroke();
      }
    });

    // Draw Path
    if (showPath && sequence.length > 0) {
      ctx.beginPath();
      const scale = rMax / 10;
      sequence.forEach((item, i) => {
        const x = cx + item.vector.x * scale;
        const y = cy - item.vector.y * scale; // Invert Y for canvas
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      });
      ctx.strokeStyle = '#FFD54F'; // Warm Yellow
      ctx.lineWidth = 3;
      ctx.lineJoin = 'round';
      ctx.stroke();
      
      // Draw dots for sequence
      sequence.forEach((item, i) => {
          const x = cx + item.vector.x * scale;
          const y = cy - item.vector.y * scale;
          ctx.beginPath();
          ctx.arc(x, y, 4, 0, Math.PI*2);
          ctx.fillStyle = '#FFB74D';
          ctx.fill();
      });
    }

    // Draw Current Vector
    if (currentVector) {
      const scale = rMax / 10;
      const x = cx + currentVector.x * scale;
      const y = cy - currentVector.y * scale;

      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.lineTo(x, y);
      ctx.strokeStyle = '#FF8A65';
      ctx.lineWidth = 3;
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(x, y, 8, 0, Math.PI * 2);
      ctx.fillStyle = '#FF8A65';
      ctx.fill();
      ctx.strokeStyle = '#FFF';
      ctx.lineWidth = 2;
      ctx.stroke();
    }
  }, [currentVector, sequence, showNotes, showPath]);

  return (
    <div className="flex justify-center items-center bg-[#1a1a1a] rounded-3xl p-4 shadow-inner border border-gray-700">
      <canvas ref={canvasRef} width={400} height={400} className="max-w-full h-auto" />
    </div>
  );
};

export default VectorCircle;
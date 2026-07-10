'use client';

import { useEffect, useRef, useMemo } from 'react';
import { LOCATIONS } from '@/lib/constants';
import { isLand } from '@/lib/mapData';

interface Point3D {
  x: number;
  y: number;
  z: number;
  color?: string;
  size?: number;
  name?: string;
  ping?: string;
}

const isHub = (name?: string) => name === 'Mumbai';

export default function Globe() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rotationRef = useRef({ x: 0.003, y: 0.003 });
  const mouseRef = useRef({ x: 0, y: 0 });

  // Generate Earth landmass 3D coordinates once
  const landPoints = useMemo(() => {
    const points: Point3D[] = [];
    const radius = 1.0;
    // Step sizes for grid density
    const latStep = 3.5;
    const lngStep = 3.5;

    for (let lat = -90; lat <= 90; lat += latStep) {
      const radLat = (lat * Math.PI) / 180;
      for (let lng = -180; lng <= 180; lng += lngStep) {
        if (isLand(lng, lat)) {
          const radLng = (lng * Math.PI) / 180;
          // Calculate Cartesian coordinates on sphere
          points.push({
            x: Math.cos(radLat) * Math.sin(radLng),
            y: Math.sin(radLat),
            z: Math.cos(radLat) * Math.cos(radLng),
          });
        }
      }
    }
    return points;
  }, []);

  // Set up locations in 3D space
  const locationPoints = useMemo(() => {
    return LOCATIONS.map((loc) => {
      const radLat = (loc.lat * Math.PI) / 180;
      const radLng = (loc.lng * Math.PI) / 180;

      return {
        x: Math.cos(radLat) * Math.sin(radLng),
        y: Math.sin(radLat),
        z: Math.cos(radLat) * Math.cos(radLng),
        name: loc.name,
        ping: loc.ping,
      };
    });
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = canvas.width;
    let height = canvas.height;
    let radius = Math.min(width, height) * 0.42;

    // Track original 3D points
    const earthPoints: Point3D[] = landPoints.map(p => ({ ...p }));
    const locations: Point3D[] = locationPoints.map(p => ({ ...p }));

    let angleX = rotationRef.current.x;
    let angleY = rotationRef.current.y;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const mx = e.clientX - rect.left - width / 2;
      const my = e.clientY - rect.top - height / 2;
      mouseRef.current = { x: mx, y: my };

      angleY = mx * 0.00004;
      angleX = my * 0.00004;
    };

    window.addEventListener('mousemove', handleMouseMove);

    let animationId: number;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Sphere ambient glow (ocean layer)
      const glow = ctx.createRadialGradient(
        width / 2,
        height / 2,
        radius * 0.8,
        width / 2,
        height / 2,
        radius * 1.1
      );
      glow.addColorStop(0, 'rgba(16, 29, 14, 0.2)');
      glow.addColorStop(0.8, 'rgba(10, 20, 10, 0.3)');
      glow.addColorStop(1, 'rgba(0, 13, 1, 0)');
      ctx.fillStyle = glow;
      ctx.beginPath();
      ctx.arc(width / 2, height / 2, radius * 1.1, 0, Math.PI * 2);
      ctx.fill();

      // Draw sphere outline
      ctx.strokeStyle = 'rgba(163, 230, 53, 0.05)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(width / 2, height / 2, radius, 0, Math.PI * 2);
      ctx.stroke();

      // Rotate and Project Earth Landmass Points
      earthPoints.forEach((point) => {
        // Y-axis rotation
        const cosY = Math.cos(angleY);
        const sinY = Math.sin(angleY);
        const x1 = point.x * cosY - point.z * sinY;
        const z1 = point.z * cosY + point.x * sinY;

        // X-axis rotation
        const cosX = Math.cos(angleX);
        const sinX = Math.sin(angleX);
        const y2 = point.y * cosX - z1 * sinX;
        const z2 = z1 * cosX + point.y * sinX;

        point.x = x1;
        point.y = y2;
        point.z = z2;

        if (z2 > 0) { // Only render front side
          const scale = (z2 + 1.5) / 2.5;
          const px = width / 2 + point.x * radius * scale;
          const py = height / 2 - point.y * radius * scale;

          ctx.beginPath();
          ctx.arc(px, py, 1.2 * scale, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(163, 230, 53, ${0.12 * scale})`;
          ctx.fill();
        }
      });

      // Rotate and Project Location Pins
      locations.forEach((point) => {
        const cosY = Math.cos(angleY);
        const sinY = Math.sin(angleY);
        const x1 = point.x * cosY - point.z * sinY;
        const z1 = point.z * cosY + point.x * sinY;

        const cosX = Math.cos(angleX);
        const sinX = Math.sin(angleX);
        const y2 = point.y * cosX - z1 * sinX;
        const z2 = z1 * cosX + point.y * sinX;

        point.x = x1;
        point.y = y2;
        point.z = z2;

        if (z2 > -0.2) {
          const scale = (z2 + 1.8) / 2.8;
          const px = width / 2 + point.x * radius * scale;
          const py = height / 2 - point.y * radius * scale;

          ctx.beginPath();
          ctx.arc(px, py, 4 * scale, 0, Math.PI * 2);
          ctx.fillStyle = isHub(point.name) ? '#a3e635' : '#10b981';
          ctx.fill();

          // Pulse circle
          ctx.beginPath();
          ctx.arc(px, py, 8 * scale, 0, Math.PI * 2);
          ctx.strokeStyle = isHub(point.name) ? 'rgba(163, 230, 53, 0.4)' : 'rgba(16, 185, 129, 0.3)';
          ctx.lineWidth = 1;
          ctx.stroke();

          // Render Label
          ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
          ctx.font = 'bold 9px monospace';
          ctx.fillText(`${point.name} (${point.ping})`, px + 8, py + 3);
        }
      });

      // Draw connection lines to Mumbai hub
      const hub = locations[0];
      const hubScale = (hub.z + 1.8) / 2.8;
      const hx = width / 2 + hub.x * radius * hubScale;
      const hy = height / 2 - hub.y * radius * hubScale;

      locations.slice(1).forEach((point) => {
        if (point.z > -0.2 && hub.z > -0.2) {
          const pointScale = (point.z + 1.8) / 2.8;
          const px = width / 2 + point.x * radius * pointScale;
          const py = height / 2 - point.y * radius * pointScale;

          // Drawing arc
          ctx.beginPath();
          ctx.moveTo(hx, hy);
          
          // Bezier control point pulled slightly towards center to curve
          const cx = (hx + px) / 2 + (width / 2 - (hx + px) / 2) * 0.15;
          const cy = (hy + py) / 2 + (height / 2 - (hy + py) / 2) * 0.15;

          ctx.quadraticCurveTo(cx, cy, px, py);
          ctx.strokeStyle = 'rgba(163, 230, 53, 0.1)';
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      });

      animationId = requestAnimationFrame(render);
    };

    const handleResize = () => {
      if (!canvas) return;
      const parent = canvas.parentElement;
      if (parent) {
        width = canvas.width = parent.clientWidth;
        height = canvas.height = parent.clientHeight;
        radius = Math.min(width, height) * 0.42;
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize();
    render();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
    };
  }, [landPoints, locationPoints]);

  return (
    <div className="w-full h-full relative min-h-[400px] flex items-center justify-center">
      <canvas ref={canvasRef} className="w-full h-full block" />
    </div>
  );
}

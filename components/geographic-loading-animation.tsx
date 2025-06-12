"use client"

import { useEffect, useState } from "react"
import { svgBoundaries } from "../data/split_boundaries_ts"
// @ts-ignore
import bounds from "svg-path-bounds" // at the top of your file

// Expecting this structure:
const scaleMapping = [
  { key: "ward", label: "Wards" },               // INTERIOR: Wards of BD
  { key: "borough", label: "Borough" },          // BOUNDARY: BD boundary
  { key: "boroughs", label: "Boroughs" },        // INTERIOR: Boroughs of London
  { key: "city", label: "London" },              // BOUNDARY: London
  { key: "counties", label: "Counties" },        // INTERIOR: Counties
  { key: "country", label: "United Kingdom" },   // BOUNDARY: UK
  { key: "europe_countries", label: "Countries" },// INTERIOR: Countries in Europe
  { key: "continent", label: "Europe" },         // BOUNDARY: Europe
];

// --- Create animation step plan: alternate boundary/interior ---
const steps = [
  { type: "boundary", key: "borough" },
  { type: "interior", key: "ward" },
  { type: "boundary", key: "city" },
  { type: "interior", key: "boroughs" },
  { type: "boundary", key: "country" },
  { type: "interior", key: "counties" },
  { type: "boundary", key: "continent" },
  { type: "interior", key: "europe_countries" },
];

export function GeographicLoadingAnimation({
  size = 120,
  onComplete,
}: {
  size?: number;
  onComplete?: () => void;
}) {
  const [stageIndex, setStageIndex] = useState(0);
  const [phase, setPhase] = useState<"boundary-glitch-in" | "interior-fill" | "boundary-glitch-out" | "empty">("boundary-glitch-in");
  const [glitchState, setGlitchState] = useState(false);
  const [filledCount, setFilledCount] = useState(0);

  // Animation Phases
  useEffect(() => {
    let timer: any;
    if (phase === "boundary-glitch-in") {
      setFilledCount(0);
      setGlitchState(false);
      let count = 0;
      timer = setInterval(() => {
        setGlitchState(g => !g);
        count++;
        if (count > 3) {
          clearInterval(timer);
          setGlitchState(false); // End on unfilled!
          setTimeout(() => setPhase("interior-fill"), 180);
        }
      }, 90);
      return () => clearInterval(timer);
    }
    if (phase === "interior-fill") {
      setGlitchState(false);
      setFilledCount(0);
      const paths = svgBoundaries[scaleMapping[stageIndex].key] || [];
      if (!paths.length) {
        setTimeout(() => setPhase("boundary-glitch-out"), 300);
        return;
      }
      let i = 0;
      timer = setInterval(() => {
        i++;
        setFilledCount(i);
        if (i >= paths.length) {
          clearInterval(timer);
          setTimeout(() => setPhase("boundary-glitch-out"), 450);
        }
      }, 45);
      return () => clearInterval(timer);
    }
    if (phase === "boundary-glitch-out") {
      setFilledCount(0);
      setGlitchState(false);
      let count = 0;
      timer = setInterval(() => {
        setGlitchState(g => !g);
        count++;
        if (count > 3) {
          clearInterval(timer);
          setGlitchState(false);
          // Add empty pause before next boundary glitch-in
          setPhase("empty");
          setTimeout(() => {
            setPhase("boundary-glitch-in");
            setStageIndex(i => i + 2);
          }, 200); // brief empty frame
        }
      }, 90);
      return () => clearInterval(timer);
    }
    if (phase === "empty") {
      setGlitchState(false);
      setFilledCount(0);
      // All shapes hidden during empty
    }
  }, [stageIndex, phase, svgBoundaries, scaleMapping]);

  // On complete
  useEffect(() => {
    if (stageIndex >= scaleMapping.length) {
      if (onComplete) onComplete();
    }
  }, [stageIndex, scaleMapping.length, onComplete]);

  // Get keys/paths for this stage
  const isBoundaryPhase = phase === "boundary-glitch-in" || phase === "boundary-glitch-out";
  const boundaryKey = scaleMapping[stageIndex + 1]?.key;
  const interiorKey = scaleMapping[stageIndex]?.key;
  const boundaryPaths = svgBoundaries[boundaryKey] || [];
  const interiorPaths = svgBoundaries[interiorKey] || [];

  return (
    <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>

      <svg
        width={size}
        height={size}
        viewBox="-60 -60 120 120"
        className="absolute inset-0"
        style={{ overflow: "visible" }}
      >
        {/* Only show boundary on glitch phases */}
        {isBoundaryPhase && phase !== "empty" && boundaryPaths.map((boundaryPath, i) => (
          <path
            key={`boundary-${i}`}
            d={boundaryPath}
            fill={glitchState ? "hsl(var(--primary))" : "none"}
            stroke="none"
            strokeWidth={0}
            opacity={glitchState ? 0.96 : 0.0}
            style={{
              transition: "fill 120ms, opacity 120ms",
            }}
          />
        ))}
        {/* Only show interiors when filling, no strokes */}
        {phase === "interior-fill" && interiorPaths.map((p, i) => (
          <path
            key={`interior-${i}`}
            d={p}
            fill={i < filledCount ? "hsl(var(--primary))" : "none"}
            stroke={i < filledCount ? "hsl(var(--primary))" : "none"}
            opacity={i < filledCount ? 0.96 : 0.0}
            style={{
              transition: "fill 200ms, opacity 220ms",
            }}
          />
        ))}
        {/* Optional: Reference circles */}
        <g className="opacity-10">
          <circle cx="0" cy="0" r="15" fill="none" stroke="hsl(var(--primary))" strokeWidth="0.2" />
          <circle cx="0" cy="0" r="25" fill="none" stroke="hsl(var(--primary))" strokeWidth="0.2" />
          <circle cx="0" cy="0" r="35" fill="none" stroke="hsl(var(--primary))" strokeWidth="0.2" />
        </g>
      </svg>
      {/* Scale label */}
      <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2">
        <div className="text-xs text-muted-foreground font-medium tracking-widest uppercase text-center">
          {scaleMapping[stageIndex]?.label}
        </div>
      </div>
    </div>
  );
}
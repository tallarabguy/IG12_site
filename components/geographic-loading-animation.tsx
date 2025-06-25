"use client"

import { useEffect, useState } from "react"
import { svgBoundaries } from "../data/split_boundaries_ts"
import GlobeAnimation from "./globe-animation"; // adjust path as needed

// @ts-ignore
import bounds from "svg-path-bounds" // at the top of your file

// Expecting this structure:
const scaleMapping = [
  { key: "ward", label: "Why do certain places pull us in?" },                  // INTERIOR: Wards of BD
  { key: "borough", label: "Borough" },                                         // BOUNDARY: BD boundary
  { key: "boroughs", label: "Which invisible forces guide our daily journeys?" }, // INTERIOR: Boroughs of London
  { key: "city", label: "London" },                                             // BOUNDARY: London
  { key: "counties", label: "Who is included - and who is excluded - in our stories about place?" }, // INTERIOR: Counties
  { key: "country", label: "United Kingdom" },                                  // BOUNDARY: UK
  { key: "europe_countries", label: "How do we navigate the convergence of global cultures in local life?" }, // INTERIOR: Countries in Europe
  { key: "continent", label: "Europe" },                                        // BOUNDARY: Europe
  { key: "globe", label: "Ultimately, where is ‘home’?" }                       // INTERIOR: Global view
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
  
  // Pseudo structure

  const [showGlobe, setShowGlobe] = useState(false);

  useEffect(() => {
    // Instead of immediately calling onComplete at the end:
    if (stageIndex >= scaleMapping.length - 1) {
      setShowGlobe(true); // This will render the globe animation
    }
  }, [stageIndex]);


  // Animation Phases
  useEffect(() => {
    let timer: any;
    if (stageIndex >= scaleMapping.length - 1) return;
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
          setTimeout(() => setPhase("interior-fill"), 0);
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
          }, 0); // brief empty frame
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
    //  if (stageIndex >= scaleMapping.length) {
    //    if (onComplete) onComplete();
    //  }
    //}, [stageIndex, scaleMapping.length, onComplete]);
      if (stageIndex >= scaleMapping.length - 1) { // -1 if last scale triggers globe
      setShowGlobe(true);
    }
  }, [stageIndex]);

  // Get keys/paths for this stage
  const isBoundaryPhase = phase === "boundary-glitch-in" || phase === "boundary-glitch-out";
  const boundaryKey = scaleMapping[stageIndex + 1]?.key;
  const interiorKey = scaleMapping[stageIndex]?.key;
  const boundaryPaths = svgBoundaries[boundaryKey] || [];
  const interiorPaths = svgBoundaries[interiorKey] || [];

  return (
    <div className="flex flex-col items-center w-full">
    <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
      {stageIndex < scaleMapping.length - 1 ? (
        <svg
          width={size}
          height={size}
          viewBox="-60 -60 120 120"
          className="absolute inset-0"
          style={{ overflow: "visible" }}
        >
        
          {phase === "boundary-glitch-in" &&
            interiorPaths.slice(
              0,
              stageIndex === 6 ? 2 : 1
            ).map((path, i) => (
              <path
                key={`glitchin-interior-${i}`}
                d={path}
                fill={glitchState ? "hsl(var(--primary))" : "none"}
                stroke="none"
                strokeWidth={0}
                opacity={glitchState ? 0.96 : 0.0}
                style={{
                  transition: "fill 120ms, opacity 120ms",
                }}
              />
            ))}

          {/* Glitch-out phase: Animate ALL boundary paths */}
          {phase === "boundary-glitch-out" && boundaryPaths.map((boundaryPath, i) => (
            <path
              key={`boundary-out-${i}`}
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

        </svg>
      ) : (
        // Globe layer (replace 'globe-animation' with your component file)
        <GlobeAnimation
          size={size}
          onComplete={() => {
            setShowGlobe(false);
            if (onComplete) onComplete(); // Now it's truly complete!
          }}
        />
      )}
    </div>

    {/* Scale label */}
    <div className="mt-6 px-6 w-full flex justify-center">
      <p className="text-muted-foreground font-medium tracking-wide text-sm uppercase text-center max-w-md">
        {scaleMapping[stageIndex]?.label}
      </p>
    </div>

    </div>
  );
}
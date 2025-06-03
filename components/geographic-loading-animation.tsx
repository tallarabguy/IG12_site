"use client"

import { useEffect, useState } from "react"
import { svgBoundaries } from "../data/split_boundaries_ts"

interface GeographicLoadingAnimationProps {
  size?: number
  isSlowMode?: boolean
}

export function GeographicLoadingAnimation({ size = 120, isSlowMode = false }: GeographicLoadingAnimationProps) {
  const [currentScale, setCurrentScale] = useState(0)
  const [isCollapsing, setIsCollapsing] = useState(false)

  // Map animation scales to your data structure
  const scaleMapping = [
    { key: "ward", label: "Wards" },
    { key: "borough", label: "Borough" },
    { key: "city", label: "London" },
    { key: "country", label: "United Kingdom" },
    { key: "continent", label: "Europe" },
    { key: "continents", label: "World" },
  ]

  useEffect(() => {
    const scales = [0, 1, 2, 3, 4, 5]
    let scaleIndex = 0
    let direction = 1

    // Slower timing for post-loading animation
    const intervalTime = isSlowMode ? 800 : 450

    const animationInterval = setInterval(() => {
      if (direction === 1) {
        if (scaleIndex < scales.length - 1) {
          scaleIndex++
          setCurrentScale(scales[scaleIndex])
        } else {
          direction = -1
          setIsCollapsing(true)
          scaleIndex--
          setCurrentScale(scales[scaleIndex])
        }
      } else {
        if (scaleIndex > 0) {
          scaleIndex--
          setCurrentScale(scales[scaleIndex])
        } else {
          direction = 1
          setIsCollapsing(false)
          scaleIndex = 0
          setCurrentScale(scales[scaleIndex])
        }
      }
    }, intervalTime)

    return () => clearInterval(animationInterval)
  }, [isSlowMode])

  const getCurrentBoundaries = (scaleIndex: number) => {
    const scaleKey = scaleMapping[scaleIndex]?.key
    return svgBoundaries[scaleKey] || []
  }

  return (
    <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
      {/* Luminous center point */}
      <div
        className={`absolute w-1 h-1 bg-primary rounded-full transition-all duration-500 ${
          isCollapsing && currentScale === 0
            ? "scale-150 opacity-100 shadow-[0_0_20px_hsl(var(--primary))]"
            : "scale-100 opacity-60"
        }`}
        style={{
          zIndex: 10,
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)",
        }}
      />

      {/* Geographic layers - properly centered SVG */}
      <svg
        width={size}
        height={size}
        viewBox={`-60 -60 120 120`}
        className="absolute inset-0"
        style={{ overflow: "visible" }}
      >
        {/* Render current scale boundaries */}
        {scaleMapping.map((scale, scaleIndex) => {
          const boundaries = getCurrentBoundaries(scaleIndex)
          const isActive = currentScale === scaleIndex

          return (
            <g
              key={scale.key}
              className={`transition-all duration-700 ease-in-out ${
                isActive ? "opacity-100 scale-100" : "opacity-30 scale-75"
              }`}
            >
              {boundaries.map((boundaryPath, pathIndex) => (
                <path
                  key={`${scale.key}-${pathIndex}`}
                  d={boundaryPath}
                  fill="none"
                  stroke="hsl(var(--primary))"
                  strokeWidth={scaleIndex === 5 ? "2" : scaleIndex === 4 ? "1.5" : scaleIndex === 3 ? "1.2" : "0.8"}
                  opacity={isActive ? 0.9 - pathIndex * 0.1 : 0.3}
                />
              ))}
            </g>
          )
        })}

        {/* Concentric circles for scale reference - properly centered */}
        <g className="opacity-20">
          <circle cx="0" cy="0" r="15" fill="none" stroke="hsl(var(--primary))" strokeWidth="0.2" />
          <circle cx="0" cy="0" r="25" fill="none" stroke="hsl(var(--primary))" strokeWidth="0.2" />
          <circle cx="0" cy="0" r="35" fill="none" stroke="hsl(var(--primary))" strokeWidth="0.2" />
        </g>
      </svg>

      {/* Scale indicator */}
      <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2">
        <div className="text-xs text-muted-foreground font-medium tracking-widest uppercase text-center">
          {scaleMapping[currentScale]?.label}
        </div>
      </div>
    </div>
  )
}

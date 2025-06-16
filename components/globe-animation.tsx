import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import { geoOrthographic, geoPath, geoCentroid } from "d3-geo";

const FILL_COLOR = "hsl(var(--primary))";
//const STROKE_COLOR = "hsl(var(--primary))";
const UNFILLED_COLOR = "#fff";

const continentOrder = [
  "Core Europe",
  "Africa",
  "Asia (with Russia)",
  "Oceania",
  "South America",
  "North America",
];

export default function GlobeAnimation({
  onComplete,
  spinSpeed = 0.15,
  size = 120,
}) {
  const [geojson, setGeojson] = useState(null);
  const [centroids, setCentroids] = useState([]);
  const [rotation, setRotation] = useState([0, 0]);
  const [currentContinent, setCurrentContinent] = useState(0);
  const [filledContinents, setFilledContinents] = useState([]);
  const [animationStep, setAnimationStep] = useState("animating"); // "animating", "glitching", "filling", "done", "glitchOut"
  const [glitchState, setGlitchState] = useState(false);
  const svgRef = useRef();

  // Load GeoJSON and set up centroids
  useEffect(() => {
    fetch("/final_continents.geojson")
      .then((res) => res.json())
      .then((gj) => {
        setGeojson(gj);
        const cents = continentOrder.map((name) => {
          const feat = gj.features.find((f) => f.properties.CONTINENT === name);
          return feat ? geoCentroid(feat) : [0, 0];
        });
        setCentroids(cents);
        setRotation(cents[0]);
      });
  }, []);

  // Spin to each continent in order (with custom speed and direction fix)
  useEffect(() => {
    if (!centroids.length || !geojson) return;
    let frame;
    if (animationStep === "animating") {
      const [targetLon, targetLat] = centroids[currentContinent] || [0, 0];
      function animateToTarget() {
        setRotation((r) => {
          let deltaLon = targetLon - r[0];
          let deltaLat = targetLat - r[1];

          // Always spin shortest direction
          if (deltaLon > 180) deltaLon -= 360;
          if (deltaLon < -180) deltaLon += 360;

          // Special-case: Oceania → South America (spin west)
          if (
            currentContinent === 3 && // South America
            r[0] > 0 &&
            targetLon < 0
          ) {
            if (deltaLon > 0) deltaLon += 360;
          }

          // Ease spin with configurable speed
          const nextLon =
            Math.abs(deltaLon) < 0.5 ? targetLon : r[0] + deltaLon * spinSpeed;
          const nextLat =
            Math.abs(deltaLat) < 0.5 ? targetLat : r[1] + deltaLat * spinSpeed;

          // Arrived
          if (
            Math.abs(nextLon - targetLon) < 0.7 &&
            Math.abs(nextLat - targetLat) < 0.7
          ) {
            setRotation([targetLon, targetLat]);
            // Only glitch-in for "Core Europe", else fill directly
            setAnimationStep(currentContinent === 0 ? "glitching" : "filling");
            return [targetLon, targetLat];
          }
          return [nextLon, nextLat];
        });
        frame = requestAnimationFrame(animateToTarget);
      }
      animateToTarget();
      return () => frame && cancelAnimationFrame(frame);
    }
  }, [animationStep, centroids, currentContinent, geojson, spinSpeed]);

  // Glitch-in only for first continent
  useEffect(() => {
    if (animationStep !== "glitching") return;
    let count = 0;
    setGlitchState(false);
    const glitchInterval = setInterval(() => {
      setGlitchState((g) => !g);
      count++;
      if (count > 3) {
        clearInterval(glitchInterval);
        setGlitchState(true);
        setTimeout(() => setAnimationStep("filling"), 0);
      }
    }, 90);
    return () => clearInterval(glitchInterval);
  }, [animationStep]);

  // Fill continent and persist
  useEffect(() => {
    if (animationStep !== "filling") return;
    const i = currentContinent;
    if (i === 0) {
      setFilledContinents((prev) => (prev.includes(i) ? prev : [...prev, i]));
      const unfill = setTimeout(() => {
        setFilledContinents((prev) => prev.filter((idx) => idx !== i));
        const refill = setTimeout(() => {
          setFilledContinents((prev) =>
            prev.includes(i) ? prev : [...prev, i]
          );
          setAnimationStep("done");
        }, 50);
        return () => clearTimeout(refill);
      }, 20);
      return () => clearTimeout(unfill);
    } else {
      setFilledContinents((prev) => (prev.includes(i) ? prev : [...prev, i]));
      const doneTimeout = setTimeout(() => {
        setAnimationStep("done");
      }, 100);
      return () => clearTimeout(doneTimeout);
    }
  }, [animationStep, currentContinent]);

  // After filling, pause, then spin to next continent or glitch out
  useEffect(() => {
    if (animationStep !== "done") return;
    const nextTimeout = setTimeout(() => {
      if (currentContinent < centroids.length - 1) {
        setCurrentContinent((idx) => idx + 1);
        setAnimationStep("animating");
      } else {
        setAnimationStep("glitchOut");
      }
    }, 100);
    return () => clearTimeout(nextTimeout);
  }, [animationStep, currentContinent, centroids.length]);

  // Globe glitch-out: rapidly alternate filling/unfilling all
  useEffect(() => {
    if (animationStep !== "glitchOut") return;
    let step = 0;
    const glitcher = setInterval(() => {
      setFilledContinents(
        step % 2 === 0 ? [...Array(continentOrder.length).keys()] : []
      );
      step++;
      if (step > 6) {
        clearInterval(glitcher);
        setTimeout(() => {
          setAnimationStep("empty");
          if (onComplete) onComplete();
        }, 100);
      }
    }, 85);
    return () => clearInterval(glitcher);
  }, [animationStep, onComplete]);

  // --- Render Globe ---
  useEffect(() => {
    if (!geojson || !centroids.length) return;
    const projection = geoOrthographic()
      .scale(size / 2)
      .translate([size / 2, size / 2])
      .rotate([-rotation[0], -rotation[1]]);
    const pathGenerator = geoPath(projection);
    const svg = d3.select(svgRef.current);

    svg
      .selectAll("path")
      .data(geojson.features)
      .join("path")
      .attr("d", pathGenerator)
      .attr("fill", (d) => {
        const idx = continentOrder.findIndex(
          (name) => name === d.properties.CONTINENT
        );
        // Glitching for Core Europe only
        if (currentContinent === 0 && animationStep === "glitching") {
          return glitchState && idx === 0 ? FILL_COLOR : UNFILLED_COLOR;
        }
        return filledContinents.includes(idx) ? FILL_COLOR : UNFILLED_COLOR;
      })
      .attr("stroke", "none")
      .attr("stroke-width", 0);
  }, [
    geojson,
    rotation,
    centroids,
    currentContinent,
    filledContinents,
    animationStep,
    glitchState,
    size,
  ]);

  if (animationStep === "empty") return null;

  return (
    <svg
      ref={svgRef}
      width={size}
      height={size}
      style={{
        background: "white",
      }}
    />
  );
}

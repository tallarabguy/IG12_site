// Utility functions for processing geographic boundary data

export interface BoundaryPoint {
  lat: number
  lng: number
}

export interface ProcessedBoundary {
  path: string
  bounds: {
    north: number
    south: number
    east: number
    west: number
  }
}

// Convert lat/lng coordinates to SVG path
export function coordinatesToSVGPath(coordinates: BoundaryPoint[], viewBoxSize = 128): string {
  if (coordinates.length === 0) return ""

  // Calculate bounds
  const lats = coordinates.map((c) => c.lat)
  const lngs = coordinates.map((c) => c.lng)
  const bounds = {
    north: Math.max(...lats),
    south: Math.min(...lats),
    east: Math.max(...lngs),
    west: Math.min(...lngs),
  }

  // Convert to SVG coordinates
  const latRange = bounds.north - bounds.south
  const lngRange = bounds.east - bounds.west
  const scale = Math.min(viewBoxSize / latRange, viewBoxSize / lngRange) * 0.8 // 80% of viewbox

  const svgPoints = coordinates.map((coord) => {
    const x = ((coord.lng - bounds.west) / lngRange - 0.5) * viewBoxSize * 0.8
    const y = ((bounds.north - coord.lat) / latRange - 0.5) * viewBoxSize * 0.8 // Flip Y axis
    return `${x.toFixed(2)},${y.toFixed(2)}`
  })

  return `M${svgPoints.join(" L")} Z`
}

// Simplify boundary data using Douglas-Peucker algorithm
export function simplifyBoundary(coordinates: BoundaryPoint[], tolerance = 0.001): BoundaryPoint[] {
  if (coordinates.length <= 2) return coordinates

  // Find the point with maximum distance from line between first and last
  let maxDistance = 0
  let maxIndex = 0

  for (let i = 1; i < coordinates.length - 1; i++) {
    const distance = perpendicularDistance(coordinates[i], coordinates[0], coordinates[coordinates.length - 1])
    if (distance > maxDistance) {
      maxDistance = distance
      maxIndex = i
    }
  }

  // If max distance is greater than tolerance, recursively simplify
  if (maxDistance > tolerance) {
    const left = simplifyBoundary(coordinates.slice(0, maxIndex + 1), tolerance)
    const right = simplifyBoundary(coordinates.slice(maxIndex), tolerance)
    return [...left.slice(0, -1), ...right]
  } else {
    return [coordinates[0], coordinates[coordinates.length - 1]]
  }
}

function perpendicularDistance(point: BoundaryPoint, lineStart: BoundaryPoint, lineEnd: BoundaryPoint): number {
  const A = lineEnd.lat - lineStart.lat
  const B = lineStart.lng - lineEnd.lng
  const C = lineEnd.lng * lineStart.lat - lineStart.lng * lineEnd.lat
  return Math.abs(A * point.lng + B * point.lat + C) / Math.sqrt(A * A + B * B)
}

// Fetch boundary data from various APIs
export async function fetchBoundaryFromOverpass(placeName: string, adminLevel: string): Promise<BoundaryPoint[]> {
  const query = `
    [out:json][timeout:25];
    (
      relation["name"="${placeName}"]["admin_level"="${adminLevel}"];
    );
    out geom;
  `

  try {
    const response = await fetch("https://overpass-api.de/api/interpreter", {
      method: "POST",
      body: query,
    })

    if (!response.ok) throw new Error("API request failed")

    const data = await response.json()

    // Process the response to extract coordinates
    if (data.elements && data.elements.length > 0) {
      const element = data.elements[0]
      if (element.members) {
        // Extract coordinates from relation members
        const coordinates: BoundaryPoint[] = []
        element.members.forEach((member: any) => {
          if (member.geometry) {
            member.geometry.forEach((point: any) => {
              coordinates.push({ lat: point.lat, lng: point.lon })
            })
          }
        })
        return simplifyBoundary(coordinates, 0.001)
      }
    }

    return []
  } catch (error) {
    console.error("Error fetching boundary data:", error)
    return []
  }
}

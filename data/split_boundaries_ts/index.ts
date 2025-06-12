import { wardsPaths } from "./wards"
import { boroughPaths } from "./boroughPaths"
import { cityPaths } from "./cityPaths"
import { countryPaths } from "./countryPaths_fixed"
import { europePaths } from "./europePaths_fixed"
//import { continentsPaths } from "./continents"
import { boroughsPaths } from "./boroughsPaths_simplified"
import { countiesPaths } from "./countiesPaths_cleaned_simplified"
import { countriesPaths } from "./countriesPaths_fixed"

export const svgBoundaries: Record<string, string[]> = {
  ward: wardsPaths,
  borough: boroughPaths,
  boroughs: boroughsPaths,
  city: cityPaths,
  continent: europePaths,
  //continents: continentsPaths,
  counties: countiesPaths,
  country: countryPaths,
  europe_countries: countriesPaths,
}

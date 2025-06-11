import { wardsPaths } from "./wards"
import { boroughPaths } from "./boroughPaths"
import { cityPaths } from "./cityPaths"
import { countryPaths } from "./countryPaths"
import { europePaths } from "./europePaths"
//import { continentsPaths } from "./continents"
import { boroughsPaths } from "./boroughsPaths"
import { countiesPaths } from "./countiesPaths"
import { europeCountriesPaths } from "./countriesPaths"

export const svgBoundaries: Record<string, string[]> = {
  ward: wardsPaths,
  borough: boroughPaths,
  boroughs: boroughsPaths,
  city: cityPaths,
  continent: europePaths,
  //continents: continentsPaths,
  counties: countiesPaths,
  country: countryPaths,
  europe_countries: europeCountriesPaths,
}

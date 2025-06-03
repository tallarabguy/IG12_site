import { wardPaths } from "./ward"
import { boroughPaths } from "./borough"
import { cityPaths } from "./city"
import { countryPaths } from "./country"
import { continentPaths } from "./continent"
import { continentsPaths } from "./continents"
import { boroughsPaths } from "./boroughs"
import { countiesPaths } from "./counties"
import { europeCountriesPaths } from "./europe_countries"

export const svgBoundaries: Record<string, string[]> = {
  ward: wardPaths,
  borough: boroughPaths,
  boroughs: boroughsPaths,
  city: cityPaths,
  continent: continentPaths,
  continents: continentsPaths,
  counties: countiesPaths,
  country: countryPaths,
  europe_countries: europeCountriesPaths,
}

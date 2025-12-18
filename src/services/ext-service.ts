import { Departement } from "../types/departement"
import { Region } from "../types/region"

export const fetchRegionsDepartments = async (): Promise<string[]> => {
  let result: string[] = []
  let response = await fetch("https://geo.api.gouv.fr/regions")
  let json = await response.json()

  result = result.concat(json.map((region: Region) => region.nom))

  response = await fetch("https://geo.api.gouv.fr/departements")
  json = await response.json()
  result = result.concat(json.map((departement: Departement) => departement.nom))

  return result
}

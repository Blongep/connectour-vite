import Autocomplete from "@mui/material/Autocomplete"
import TextField from "@mui/material/TextField"
import { useEffect, useState } from "react"
import { fetchRegionsDepartments } from "../services/ext-service"

export default function GeoSearchBar() {
  const [regionsDepartments, setRegionsDepartments] = useState([])

  useEffect(() => {
    setRegionsDepartments(fetchRegionsDepartments())
  }, [])
  return (
    <Autocomplete
      disabled={regionsDepartments.isEmpty}
      disablePortal
      options={regionsDepartments}
      renderInput={(params) => <TextField {...params} label="Region ou département" />}
    />
  )
}

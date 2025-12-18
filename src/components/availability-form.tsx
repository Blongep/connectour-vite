import React from "react"
import { Button, FormControl, Stack } from "@mui/joy"
import Autocomplete, { AutocompleteRenderInputParams } from "@mui/material/Autocomplete"
import TextField from "@mui/material/TextField"
import { DatePicker } from "@mui/x-date-pickers"
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider"
import { Dayjs } from "dayjs"
import "dayjs/locale/fr"
import { useEffect, useState } from "react"
import { addAvailability } from "../services/artist-service"
import { fetchRegionsDepartments } from "../services/ext-service"
import { Availability } from "../types/availability"

export function AvailabilityForm(availabilitiesFormProps: AvailabilitiesFormProps): JSX.Element {
  const [startDate, setStartDate] = useState<Dayjs | null>(null)
  const [endDate, setEndDate] = useState<Dayjs | null>(null)
  const [zoneList, setZoneList] = useState<string[]>([""])

  const updateZoneList = (indexToChange: number, newValue: string) => {
    setZoneList(
      zoneList.map((zone: string, index: number) => {
        if (index === indexToChange) {
          return newValue
        } else {
          return zone
        }
      })
    )
  }
  const deleteFromZoneList = (indexToDelete: number) => {
    const nextZones = zoneList
      .map((zone: string, index: number) => {
        if (index === indexToDelete) {
          return undefined
        } else {
          return zone
        }
      })
      .filter((zone: string | undefined) => zone !== undefined)
    // Re-render with the new array
    setZoneList(nextZones)
  }

  const [regionsDepartments, setRegionsDepartments] = useState<string[]>([])

  useEffect(() => {
    async function fetchData() {
      setRegionsDepartments(await fetchRegionsDepartments())
    }
    fetchData()
    setZoneList([""])
  }, [])

  const addAutocomplete = () => {
    setZoneList([...zoneList, ""])
  }

  const deleteAutocomplete = (key: number) => {
    deleteFromZoneList(key)
  }

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="fr">
      <form
        onSubmit={async (event) => {
          event.preventDefault()
          const newAvailability: Availability = {
            id: "",
            artistId: availabilitiesFormProps.artistId,
            artistName: "",
            startDate: startDate as Dayjs,
            endDate: endDate as Dayjs,
            zones: zoneList as string[],
            options: [],
          }
          await addAvailability(newAvailability)
          availabilitiesFormProps.updateState()
          setZoneList([""])
          setStartDate(null)
          setEndDate(null)
        }}
      >
        <Stack spacing={2}>
          <FormControl required>
            <DatePicker
              disablePast
              label="Date de début"
              value={startDate}
              onChange={(newValue: Dayjs | null) => setStartDate(newValue)}
            />
          </FormControl>
          <FormControl required>
            <DatePicker
              disablePast
              minDate={startDate || undefined}
              label="Date de fin"
              value={endDate}
              onChange={(newValue: Dayjs | null) => setEndDate(newValue)}
            />
          </FormControl>
          {zoneList.map((zone: string, index: number) => (
            <FormControl key={index} required>
              <Autocomplete
                disablePortal
                options={regionsDepartments}
                onChange={(event: React.ChangeEvent<HTMLInputElement>, newValue: string | null) =>
                  newValue ? updateZoneList(index, newValue) : updateZoneList(index, "")
                }
                renderInput={(params: AutocompleteRenderInputParams) => (
                  <TextField {...params} label="Region ou département" />
                )}
              />
              {index !== 0 && (
                <Button onClick={() => deleteAutocomplete(index)}>Supprimer la zone</Button>
              )}
            </FormControl>
          ))}

          <Button onClick={addAutocomplete}>Zone Supplémentaire</Button>
          <Button
            disabled={
              startDate === null ||
              endDate === null ||
              startDate.isAfter(endDate) ||
              zoneList.includes("")
            }
            type="submit"
            sx={{ mt: 1 }}
          >
            Créer une dispo
          </Button>
        </Stack>
      </form>
    </LocalizationProvider>
  )
}

export type AvailabilitiesFormProps = {
  artistId: string
  updateState: () => void
}

import { Table, Typography, IconButton, Sheet } from "@mui/joy"
import dayjs from "dayjs"
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider"
import "dayjs/locale/fr"
import { Availability } from "../types/availability"
import { Option } from "../types/option"
import React from "react"
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown"
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp"

export function CommonGrid(gridProps: GridProps): JSX.Element {
  const width: string = gridProps.withArtistName ? "21%" : "27%"
  return (
    <Table aria-label="basic table">
      <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="fr">
        <thead>
          <tr>
            {gridProps.onlyWithOptions && <th style={{ width: "5%" }} aria-label="empty" />}
            {gridProps.withArtistName && <th style={{ width: width }}>Artiste</th>}
            <th style={{ width: width }}>Région</th>
            <th style={{ width: width }}>Début de disponibilité</th>
            <th style={{ width: width }}>Fin de disponibilité</th>
            <th style={{ width: "10%" }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {gridProps.availabilities.map(
            (availability: Availability, index) =>
              (!gridProps.onlyWithOptions || availability.options?.length > 0) && (
                <Row
                  key={availability.id}
                  availability={availability}
                  initialOpen={index === 0}
                  updateState={gridProps.updateState}
                  withArtistName={gridProps.withArtistName}
                  onlyWithOptions={gridProps.onlyWithOptions}
                  artistManagement={gridProps.onlyWithOptions}
                />
              )
          )}
        </tbody>
      </LocalizationProvider>
    </Table>
  )
}

function AvailabilityRow(props: {
  availability: Availability
  initialOpen?: boolean
  onToggle: () => void
  updateState: () => void
  withArtistName?: boolean
  artistManagement?: boolean
  onlyWithOptions?: boolean
  isOpen: boolean
}) {
  const availability = props.availability
  return (
    <tr key={availability.id}>
      {props.onlyWithOptions && (
        <td>
          <IconButton
            aria-label="Afficher les options"
            variant="plain"
            color="neutral"
            size="sm"
            onClick={props.onToggle}
          >
            {props.isOpen ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </td>
      )}
      {props.withArtistName && (
        <td>
          <Typography color="primary">{availability.artistName}</Typography>
        </td>
      )}
      <td>
        <Typography color="primary">
          {availability.zones.reduce(
            (accumulator: string, currentValue: string) => currentValue + " " + accumulator,
            ""
          )}
        </Typography>
      </td>
      <td>
        <Typography color="primary">
          {dayjs(availability.startDate).format("DD/MM/YYYY")}
        </Typography>
      </td>
      <td>
        <Typography color="primary">{dayjs(availability.endDate).format("DD/MM/YYYY")}</Typography>
      </td>
    </tr>
  )
}

function OptionRow(props: {
  availability: Availability
  artistManagement: boolean
  updateState: () => void
}) {
  return (
    <tr>
      <td style={{ height: 0, padding: 0 }} colSpan={5}>
        <Sheet sx={{ p: 1, pl: 6, boxShadow: "inset 0 3px 6px 0 rgba(0 0 0 / 0.08)" }}>
          <Typography level="body-lg" component="div">
            Options
          </Typography>
          <Table
            borderAxis="bothBetween"
            size="sm"
            aria-label="options"
            sx={{
              "--TableCell-paddingX": "0.5rem",
            }}
          >
            <thead>
              <tr>
                <th style={{ width: "%25" }}>Organisateur</th>
                <th style={{ width: "25%" }}>Lieu</th>
                <th style={{ width: "25%" }}>Date</th>
                <th style={{ width: "25%" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {props.availability.options?.map((option: Option) => (
                <tr key={option.id}>
                  <td>
                    {" "}
                    <Typography color="primary">{option.organizer}</Typography>
                  </td>
                  <td>
                    <Typography color="primary">{option.venueName}</Typography>
                  </td>
                  <td>
                    <Typography color="primary">
                      {dayjs(option.date).format("DD/MM/YYYY")}
                    </Typography>
                  </td>
                  <td></td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Sheet>
      </td>
    </tr>
  )
}

function Row(props: {
  availability: Availability
  initialOpen?: boolean
  withArtistName?: boolean
  onlyWithOptions?: boolean
  artistManagement?: boolean
  updateState: () => void
}) {
  const [open, setOpen] = React.useState(props.initialOpen || false)
  return (
    <React.Fragment>
      <AvailabilityRow
        availability={props.availability}
        initialOpen={props.initialOpen}
        onToggle={() => setOpen(!open)}
        isOpen={open}
        withArtistName={props.withArtistName}
        artistManagement={props.artistManagement}
        updateState={props.updateState}
      />
      {open && props.onlyWithOptions && (
        <OptionRow
          availability={props.availability}
          artistManagement={props.artistManagement}
          updateState={props.updateState}
        />
      )}
    </React.Fragment>
  )
}

export type GridProps = {
  availabilities: Availability[]
  updateState: () => void
  withArtistName?: boolean
  onlyWithOptions?: boolean
  artistManagement?: boolean
}

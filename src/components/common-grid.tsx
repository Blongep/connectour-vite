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
import {
  ArtistManagementAvailabilityActions,
  ArtistManagementOptionActions,
  ProdManagementAvailabilityActions,
  ProdManagementOptionActions,
} from "./flow-action-buttons"
import { useCurrentUserType } from "../core/auth"

export function CommonGrid(gridProps: GridProps): JSX.Element {
  const width: string = gridProps.withArtistName ? "19%" : "23%"
  const currentUserType = useCurrentUserType()

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
            <th style={{ width: "20%" }}>Actions</th>
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
                  currentUserType={currentUserType}
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
  onlyWithOptions?: boolean
  isOpen: boolean
  currentUserType: { type: string } | null
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
      <td>
        {props.currentUserType?.type === "agent" && <ArtistManagementAvailabilityActions />}
        {props.currentUserType?.type === "prod" && (
          <ProdManagementAvailabilityActions
            availability={availability}
            updateState={props.updateState}
          />
        )}
      </td>
    </tr>
  )
}

function OptionRow(props: {
  availability: Availability
  updateState: () => void
  currentUserType: { type: string } | null
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
                  <td>
                    {props.currentUserType?.type === "agent" && (
                      <ArtistManagementOptionActions
                        option={option}
                        updateState={props.updateState}
                      />
                    )}
                    {props.currentUserType?.type === "prod" && (
                      <ProdManagementOptionActions
                        option={option}
                        updateState={props.updateState}
                      />
                    )}
                  </td>
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
  updateState: () => void
  currentUserType: { type: string } | null
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
        updateState={props.updateState}
        onlyWithOptions={props.onlyWithOptions}
        currentUserType={props.currentUserType}
      />
      {open && props.onlyWithOptions && (
        <OptionRow
          availability={props.availability}
          updateState={props.updateState}
          currentUserType={props.currentUserType}
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
}

import { IconButton, Stack } from "@mui/joy"
import {
  createOptionFromAvailability,
  confirmOption,
  acceptOption,
  refuseOption,
} from "../services/artist-service"
import { Availability } from "../types/availability"
import { Dayjs } from "dayjs"
import { Option, optionStatus } from "../types/option"
import React, { useEffect, useState } from "react"
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline"
import CancelIcon from "@mui/icons-material/Cancel"
import TaskIcon from "@mui/icons-material/Task"
import PendingIcon from "@mui/icons-material/Pending"
import DoDisturbIcon from "@mui/icons-material/DoDisturb"
import { DatePicker } from "@mui/x-date-pickers"
import "dayjs/locale/fr"
import Tooltip from "@mui/material/Tooltip"

export function ArtistManagementAvailabilityActions() {
  return (
    <Stack
      direction="row"
      spacing={2}
      sx={{
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Tooltip title="Disponibilité communiquée">
        <span>
          <IconButton
            sx={{ mb: 1 }}
            aria-label="Disponibilité communiquée"
            variant="plain"
            disabled={true}
          >
            <PendingIcon />
          </IconButton>
        </span>
      </Tooltip>
    </Stack>
  )
}

export function ProdManagementAvailabilityActions(props: {
  availability: Availability
  updateState: () => void
}) {
  const [optionDate, setOptionDate] = useState<Dayjs | null>(null)
  useEffect(() => {
    setOptionDate(props.availability.startDate)
  }, [props.availability])
  return (
    <Stack
      direction="row"
      spacing={2}
      sx={{
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <DatePicker
        disablePast
        minDate={props.availability.startDate}
        maxDate={props.availability.endDate}
        label="Date"
        value={props.availability.startDate}
        onChange={(newValue: Dayjs | null) => {
          if (newValue) {
            setOptionDate(newValue)
          }
        }}
      />
      <Tooltip title="Créer une option">
        <IconButton
          sx={{ mb: 1 }}
          variant="plain"
          onClick={() => {
            createOptionFromAvailability(props.availability, optionDate)
            props.updateState()
            setOptionDate(props.availability.startDate)
          }}
        >
          <CheckCircleOutlineIcon />
        </IconButton>
      </Tooltip>
    </Stack>
  )
}

export function ArtistManagementOptionActions(props: { option: Option; updateState: () => void }) {
  return (
    <Stack
      direction="row"
      spacing={2}
      sx={{
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {props.option.status && props.option.status === optionStatus.proposée && (
        <>
          <Tooltip title="Accepter l'option pour confirmation auprès de la production">
            <IconButton
              sx={{ mb: 1 }}
              aria-label="Accepter l'option pour confirmation auprès de la production"
              variant="plain"
              onClick={async () => {
                await acceptOption(props.option)
                props.updateState()
              }}
            >
              <CheckCircleOutlineIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Refuser l'option">
            <IconButton
              sx={{ mb: 1 }}
              aria-label="Refuser l'option"
              variant="plain"
              onClick={async () => {
                await refuseOption(props.option)
                props.updateState()
              }}
            >
              <CancelIcon />
            </IconButton>
          </Tooltip>
        </>
      )}
      {props.option.status && props.option.status === optionStatus.acceptée && (
        <Tooltip title="Vous avez accepté cette option, en attente de confirmation auprès de la production">
          <span>
            <IconButton
              sx={{ mb: 1 }}
              aria-label="Vous avez accepté cette option, en attente de confirmation auprès de la production"
              variant="plain"
              disabled={true}
            >
              <PendingIcon />
            </IconButton>
          </span>
        </Tooltip>
      )}
      {props.option.status && props.option.status === optionStatus.confirmée && (
        <Tooltip title="Option confirmée, vous pourrez trouver le concert dans la section dédiée">
          <span>
            <IconButton
              sx={{ mb: 1 }}
              aria-label="Option confirmée, vous pourrez trouver le concert dans la section dédiée"
              variant="plain"
              disabled={true}
            >
              <TaskIcon />
            </IconButton>
          </span>
        </Tooltip>
      )}
    </Stack>
  )
}

export function ProdManagementOptionActions(props: { option: Option; updateState: () => void }) {
  return (
    <Stack
      direction="row"
      spacing={2}
      sx={{
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {props.option.status && props.option.status === optionStatus.proposée && (
        <>
          <Tooltip title="Vous avez proposé cette option, en attente de confirmation auprès de l'agent">
            <span>
              <IconButton
                sx={{ mb: 1 }}
                aria-label="Vous avez proposé cette option, en attente de confirmation auprès de l'agent"
                variant="plain"
                disabled={true}
              >
                <PendingIcon />
              </IconButton>
            </span>
          </Tooltip>
        </>
      )}
      {props.option.status && props.option.status === optionStatus.acceptée && (
        <>
          <Tooltip title="Confirmer l'option pour créer un concert">
            <IconButton
              sx={{ mb: 1 }}
              aria-label="Confirmer l'option pour créer un concert"
              variant="plain"
              onClick={async () => {
                await confirmOption(props.option)
                props.updateState()
              }}
            >
              <CheckCircleOutlineIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Supprimer l'option">
            <IconButton
              sx={{ mb: 1 }}
              aria-label="Supprimer l'option"
              variant="plain"
              onClick={async () => {
                await refuseOption(props.option)
                props.updateState()
              }}
            >
              <CancelIcon />
            </IconButton>
          </Tooltip>
        </>
      )}
      {props.option.status && props.option.status === optionStatus.confirmée && (
        <Tooltip title="Option confirmée, vous pourrez trouver le concert dans vos la section dédiée">
          <span>
            <IconButton
              sx={{ mb: 1 }}
              aria-label="Option confirmée, vous pourrez trouver le concert dans vos la section dédiée"
              variant="plain"
              disabled={true}
            >
              <TaskIcon />
            </IconButton>
          </span>
        </Tooltip>
      )}
      {props.option.status && props.option.status === optionStatus.refusée && (
        <Tooltip title="Option refusée">
          <span>
            <IconButton sx={{ mb: 1 }} aria-label="Option refusée" variant="plain" disabled={true}>
              <DoDisturbIcon />
            </IconButton>
          </span>
        </Tooltip>
      )}
    </Stack>
  )
}

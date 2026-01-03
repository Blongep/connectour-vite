/* SPDX-FileCopyrightText: 2014-present Kriasoft */
/* SPDX-License-Identifier: MIT */

import { Box, Container, Stack, Typography } from "@mui/joy"
import Divider from "@mui/joy/Divider"
import Tab from "@mui/material/Tab"
import Tabs from "@mui/material/Tabs"
import { useEffect, useState } from "react"
import { CommonGrid } from "../components/common-grid"
import { useCurrentUser } from "../core/auth"
import { usePageEffect } from "../core/page"
import { fetchAvailabilities } from "../services/artist-service"
import { Availability } from "../types/availability"
import React from "react"
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider"

interface TabPanelProps {
  children?: React.ReactNode
  index: number
  value: number
}

export const Component = function DashboardProd(): JSX.Element {
  usePageEffect({ title: "Dashboard Prod" })

  const [availabilityData, setAvailabilityData] = useState<Availability[]>([])
  const currentUser = useCurrentUser()

  const [value, setValue] = useState(0)

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue)
  }

  function CustomTabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props

    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
      </div>
    )
  }

  function a11yProps(index: number) {
    return {
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`,
    }
  }
  async function fetchAvailabilityData() {
    if (currentUser) {
      try {
        const availabilities = await fetchAvailabilities()
        setAvailabilityData(availabilities)
      } catch (error) {
        console.error("Error fetching availability data:", error)
      }
    }
  }

  useEffect(() => {
    fetchAvailabilityData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser])

  function handleUpdate(): void {
    fetchAvailabilityData()
  }

  return (
    <Container sx={{ py: 2 }}>
      <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="fr">
        <Typography color="primary" sx={{ mb: 2 }} level="h2">
          Dashboard Prod
        </Typography>

        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
            <Tab label="Disponibilités" {...a11yProps(0)} />
            <Tab label="Options" {...a11yProps(1)} />
          </Tabs>
        </Box>
        <CustomTabPanel value={value} index={0}>
          <Typography color="primary" sx={{ mb: 1 }} level="h3">
            Consulter les disponibilités
          </Typography>
          <CommonGrid
            availabilities={availabilityData || []}
            updateState={handleUpdate}
            withArtistName={true}
            onlyWithOptions={false}
          />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
          <Typography color="primary" sx={{ mb: 1 }} level="h3">
            Gérer mes options
          </Typography>
          <CommonGrid
            availabilities={availabilityData || []}
            updateState={handleUpdate}
            withArtistName={true}
            onlyWithOptions={true}
          />
        </CustomTabPanel>

        <Box sx={{ width: "100%" }}>
          <Stack spacing={3}>
            <Divider />
          </Stack>

          {/* {venueData.map((artist: Artist) => (
          <Card key={artist.id}>
            <CardContent sx={{ minHeight: 150 }}>
              <Button
                variant="plain"
                component="a"
                href={`/artist/${artist.shortName}`}
                startDecorator={<OpenInNew />}
              >
                <Typography  color="primary" level="h3">{artist.longName}</Typography>
              </Button>
              <Typography  color="primary">{artist.description}</Typography>
            </CardContent>
          </Card>
        ))} */}
        </Box>
      </LocalizationProvider>
    </Container>
  )
}

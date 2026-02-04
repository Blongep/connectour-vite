import { Box, Card, CardContent, Container, Typography } from "@mui/joy"
import Tab from "@mui/material/Tab"
import Tabs from "@mui/material/Tabs"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { useCurrentUser } from "../core/auth"
import { usePageEffect } from "../core/page"
import { fetchArtistFromShortName } from "../services/artist-service"
import { Artist } from "../types/artist"
import { CommonGrid } from "../components/common-grid"
import React from "react"
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider"
import { AvailabilityForm } from "../components/availability-form"
import { ConcertGrid } from "../components/concerts-grid"

interface TabPanelProps {
  children?: React.ReactNode
  index: number
  value: number
}

export const Component = function ArtistPage(): JSX.Element {
  const { artistShortName } = useParams()
  const [artistData, setArtistData] = useState<Artist>()
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

  async function fetchData() {
    if (currentUser && artistShortName) {
      const artist = await fetchArtistFromShortName(artistShortName)
      setArtistData(artist)
      console.log(artist)
    }
  }

  function handleUpdate(): void {
    fetchData()
  }

  useEffect(() => {
    fetchData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser, artistShortName])

  usePageEffect({ title: artistData?.longName })

  return (
    <Container sx={{ py: 2 }}>
      <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="fr">
        <Typography color="primary" sx={{ mb: 2 }} level="h2">
          {artistData?.longName}
        </Typography>

        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Card sx={{ mb: 2 }} key={artistData?.id}>
            <CardContent sx={{ minHeight: 150 }}>
              <Typography color="primary">{artistData?.description}</Typography>
            </CardContent>
          </Card>
          <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
            <Tab label="Disponibilités" {...a11yProps(0)} />
            <Tab label="Options" {...a11yProps(1)} />
            <Tab label="Dates programmées" {...a11yProps(2)} />
            <Tab label="Nouvelle disponibilité" {...a11yProps(3)} />
          </Tabs>
        </Box>
        <CustomTabPanel value={value} index={0}>
          <Typography color="primary" sx={{ mb: 1 }} level="h3">
            Disponibilités
          </Typography>
          <CommonGrid
            availabilities={artistData?.availabilities || []}
            updateState={handleUpdate}
            withArtistName={false}
            onlyWithOptions={false}
          />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
          <Typography color="primary" sx={{ mb: 1 }} level="h3">
            Options
          </Typography>
          <CommonGrid
            availabilities={artistData?.availabilities || []}
            updateState={handleUpdate}
            withArtistName={false}
            onlyWithOptions={true}
          />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={2}>
          <Typography color="primary" sx={{ mb: 1 }} level="h3">
            Dates programmées
          </Typography>
          <ConcertGrid concerts={artistData?.concerts || []} />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={3}>
          <Typography color="primary" sx={{ mb: 1 }} level="h3">
            Nouvelle disponibilité
          </Typography>
          <AvailabilityForm artistId={artistData?.id || ""} updateState={handleUpdate} />
        </CustomTabPanel>
      </LocalizationProvider>
    </Container>
  )
}

/* SPDX-FileCopyrightText: 2014-present Kriasoft */
/* SPDX-License-Identifier: MIT */

import OpenInNew from "@mui/icons-material/OpenInNew"
import { Box, Button, Card, CardContent, Container, Typography } from "@mui/joy"
import { useEffect, useState } from "react"
import { useCurrentUser } from "../core/auth"
import { usePageEffect } from "../core/page"
import { fetchArtists } from "../services/artist-service"
import { Artist } from "../types/artist"

export const Component = function DashboardAgent(): JSX.Element {
  usePageEffect({ title: "Dashboard Agent" })

  const [artistsData, setArtistsData] = useState<Artist[]>([])
  const currentUser = useCurrentUser()

  useEffect(() => {
    async function fetchData() {
      if (currentUser) {
        const artists = await fetchArtists()
        setArtistsData(artists)
      }
    }
    fetchData()
  }, [currentUser])

  return (
    <Container sx={{ py: 2 }}>
      <Typography color="primary" sx={{ mb: 2 }} level="h2">
        Dashboard Agent
      </Typography>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { sm: "1fr", md: "1fr 1fr" },
          gap: 2,
        }}
      >
        {artistsData.map((artist: Artist) => (
          <Card key={artist.id}>
            <CardContent sx={{ minHeight: 150 }}>
              <Button
                variant="plain"
                component="a"
                href={`/artist/management/${artist.shortName}`}
                startDecorator={<OpenInNew />}
              >
                <Typography color="primary" level="h3">
                  {artist.longName}
                </Typography>
              </Button>
              <Typography color="primary">{artist.description}</Typography>
            </CardContent>
          </Card>
        ))}
      </Box>
    </Container>
  )
}

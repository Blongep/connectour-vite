import { Box, Link } from "@mui/joy";
import { Paper, Typography } from "@mui/material";
import Popper from "@mui/material/Popper";
import { Stack } from "@mui/system";

import { useEffect, useState } from "react";
import { fetchArtistsFromString } from "../services/artist-service";
import { Artist } from "../types/artist";
import React from "react";

/**
 * Component to filter and display products based on search input.
 * @param {string} searchstring - The search string to filter products.
 * @param {Array} list - The array of products to filter.
 * @returns {JSX.Element} - The filtered product list.
 */
export function SearchedArtists(searchedArtistsProps: SearchedArtistsProps): JSX.Element {
  // Create a new array, filteredList, using the array filter function to filter the dummy data based on input.
  const [artistsData, setArtistsData] = useState<Artist[]>([]);
  const searchBar = document.getElementById("search-bar");

  useEffect(() => {
    async function fetchData() {
      const artists = await fetchArtistsFromString(searchedArtistsProps.searchString);
      console.log(artists);
      setArtistsData(artists);
    }
    if (searchedArtistsProps.searchString) {
      fetchData();
    }
  }, [searchedArtistsProps.searchString]);

  // Display the filtered product list.
  return (
    <React.Fragment>
      {artistsData && artistsData.length > 0 && (
        <Popper
          id="mouse-over-popper"
          open={true}
          anchorEl={searchBar}
          style={{ width: searchBar?.clientWidth }}
        >
          <Box sx={{ border: 1, p: 1, bgcolor: "primary" }}>
            <Stack
              spacing={2}
              sx={{
                overflow: "auto",
                maxHeight: 500,
              }}
            >
              {artistsData.map((artist: Artist) => (
                <Link
                  overlay
                  key={artist.id}
                  href={`/artist/${artist.shortName}`}
                  underline="none"
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "start",
                  }}
                >
                  <Paper
                    sx={{
                      textAlign: "left",
                    }}
                  >
                    <Typography>
                      <strong>{artist.longName}</strong>: {artist.description}
                    </Typography>
                  </Paper>
                </Link>
              ))}
            </Stack>
          </Box>
        </Popper>
      )}
    </React.Fragment>
  );
}

export type SearchedArtistsProps = {
  searchString: string;
};

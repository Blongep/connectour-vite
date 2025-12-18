import SearchIcon from "@mui/icons-material/Search"
import { Box, TextField } from "@mui/material"
import { useEffect, useState } from "react"
import { SearchedArtists } from "./searched-artists"

export function SearchBar(): JSX.Element {
  const [input, setInput] = useState("")
  const [debouncedInputValue, setDebouncedInputValue] = useState("")

  const handleInput = (e) => {
    setInput(e.target.value)
  }

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setDebouncedInputValue(input)
      console.log(input)
    }, 500)
    return () => clearTimeout(timeoutId)
  }, [input])

  return (
    <Box
      className="App"
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-evenly",
      }}
    >
      <form style={{ display: "flex", alignItems: "center" }}>
        <TextField
          id="search-bar"
          className="text"
          onInput={handleInput}
          label="Rechercher un artiste"
          variant="outlined"
          placeholder="Recherche..."
          size="small"
          sx={{
            width: 350,
            margin: "10px auto",
          }}
        />
        <SearchIcon />
      </form>

      <SearchedArtists searchString={debouncedInputValue} />
    </Box>
  )
}

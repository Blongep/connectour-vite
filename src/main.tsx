/* SPDX-FileCopyrightText: 2014-present Kriasoft */
/* SPDX-License-Identifier: MIT */

import { CssBaseline } from "@mui/joy"
import { CssVarsProvider as JoyCssVarsProvider } from "@mui/joy/styles"
import {
  THEME_ID as MATERIAL_THEME_ID,
  Experimental_CssVarsProvider as MaterialCssVarsProvider,
} from "@mui/material/styles"
import { SnackbarProvider } from "notistack"
import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { StoreProvider } from "./core/store"
import { themeJoy, themeMui } from "./core/theme"
import { Router } from "./routes/router"
const container = document.getElementById("root")
const root = createRoot(container!)

root.render(
  <StrictMode>
    <MaterialCssVarsProvider theme={{ [MATERIAL_THEME_ID]: themeMui }}>
      <JoyCssVarsProvider theme={themeJoy}>
        <SnackbarProvider>
          <CssBaseline enableColorScheme />
          <StoreProvider>
            <Router />
          </StoreProvider>
        </SnackbarProvider>
      </JoyCssVarsProvider>
    </MaterialCssVarsProvider>
  </StrictMode>
)

if (import.meta.hot) {
  import.meta.hot.dispose(() => root.unmount())
}

/* SPDX-FileCopyrightText: 2014-present Kriasoft */
/* SPDX-License-Identifier: MIT */

import { DarkModeRounded, LightModeRounded } from "@mui/icons-material"
import {
  Dropdown,
  IconButton,
  IconButtonProps,
  ListItemContent,
  ListItemDecorator,
  Menu,
  MenuButton,
  MenuItem,
} from "@mui/joy"
import { useColorScheme as useJoyColorScheme } from "@mui/joy/styles"
import { useColorScheme as useMaterialColorScheme } from "@mui/material/styles"
import { memo } from "react"

export function ColorSchemeButton(props: ColorSchemeButtonProps): JSX.Element {
  const { mode, systemMode } = useJoyColorScheme()

  return (
    <Dropdown>
      <MenuButton slots={{ root: IconButton }} slotProps={{ root: props }}>
        {mode === "light" || (mode === "system" && systemMode === "light") ? (
          <LightModeRounded />
        ) : (
          <DarkModeRounded />
        )}
      </MenuButton>

      <Menu size="sm">
        <ModeMenuItem mode="light" />
        <ModeMenuItem mode="dark" />
        <ModeMenuItem mode="system" />
      </Menu>
    </Dropdown>
  )
}

const ModeMenuItem = memo(function ModeMenuItem({ mode }: ModeMenuItemProps): JSX.Element {
  const schemeJoy = useJoyColorScheme()
  const schemeMaterial = useMaterialColorScheme()

  return (
    <MenuItem
      onClick={() => {
        schemeJoy.setMode(mode)
        schemeMaterial.setMode(mode)
      }}
      selected={schemeJoy.mode === mode}
    >
      <ListItemDecorator sx={{ ml: 0.5 }}>
        {mode === "light" || (mode !== "dark" && schemeJoy.systemMode === "light") ? (
          <LightModeRounded />
        ) : (
          <DarkModeRounded />
        )}
      </ListItemDecorator>
      <ListItemContent sx={{ pr: 2 }}>
        {mode === "light" ? "Light theme" : mode === "dark" ? "Dark theme" : "Device default"}
      </ListItemContent>
    </MenuItem>
  )
})

type ColorSchemeButtonProps = Omit<IconButtonProps, "children">
type ModeMenuItemProps = { mode: "dark" | "light" | "system" }

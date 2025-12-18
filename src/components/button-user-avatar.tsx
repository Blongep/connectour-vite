/* SPDX-FileCopyrightText: 2014-present Kriasoft */
/* SPDX-License-Identifier: MIT */

import { LogoutRounded, SettingsRounded } from "@mui/icons-material"
import {
  Avatar,
  Dropdown,
  IconButton,
  IconButtonProps,
  ListItemContent,
  ListItemDecorator,
  Menu,
  MenuButton,
  MenuItem,
} from "@mui/joy"
import { getAuth, signOut } from "firebase/auth"
import { useNavigate } from "react-router-dom"
import { useCurrentUser } from "../core/auth"

export function UserAvatarButton(props: UserAvatarButtonProps): JSX.Element {
  const { sx, ...other } = props
  const user = useCurrentUser()!
  const navigate = useNavigate()

  return (
    <Dropdown>
      <MenuButton
        slots={{ root: IconButton }}
        slotProps={{
          root: {
            sx: { borderRadius: "50%", p: "2px", ...sx },
            ...other,
          },
        }}
      >
        <Avatar sx={{ width: 36, height: 36 }} src={user.photoURL ?? undefined}>
          {user.displayName}
        </Avatar>
      </MenuButton>

      <Menu size="sm">
        <MenuItem>
          <ListItemDecorator sx={{ ml: 0.5 }}>
            <SettingsRounded />
          </ListItemDecorator>
          <ListItemContent sx={{ mr: 2 }}>Settings</ListItemContent>
        </MenuItem>
        <MenuItem
          onClick={() =>
            signOut(getAuth())
              .then(() => navigate("/"))
              .finally(() => {
                window.location.reload()
              })
          }
        >
          <ListItemDecorator sx={{ ml: 0.5 }}>
            <LogoutRounded />
          </ListItemDecorator>
          <ListItemContent sx={{ mr: 2 }}>Logout</ListItemContent>
        </MenuItem>
      </Menu>
    </Dropdown>
  )
}

export type UserAvatarButtonProps = Omit<IconButtonProps, "children">

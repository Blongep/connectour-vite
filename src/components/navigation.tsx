/* SPDX-FileCopyrightText: 2014-present Kriasoft */
/* SPDX-License-Identifier: MIT */

import { Dashboard } from "@mui/icons-material"
import {
  List,
  ListItem,
  ListItemButton,
  ListItemContent,
  ListItemDecorator,
  ListProps,
} from "@mui/joy"
import { ReactNode, memo, useState } from "react"
import { Link, useMatch } from "react-router-dom"
import { useCurrentUserType } from "../core/auth"

export const Navigation = memo(function Navigation(props: NavigationProps): JSX.Element {
  const { sx, ...other } = props
  const [currentUserType] = useState(useCurrentUserType())

  return (
    <List sx={{ "--ListItem-radius": "4px", ...sx }} size="sm" role="navigation" {...other}>
      {currentUserType?.type === "agent" && (
        <NavItem path="/dashboard/agent" label="Dashboard Agent" icon={<Dashboard />} />
      )}
      {currentUserType?.type === "prod" && (
        <NavItem path="/dashboard/prod" label="Dashboard Prod" icon={<Dashboard />} />
      )}
      <NavItem path="/dashboard/agent" label="Dashboard Agent" icon={<Dashboard />} />
    </List>
  )
})

function NavItem(props: NavItemProps): JSX.Element {
  return (
    <ListItem>
      <ListItemButton
        component={Link}
        selected={!!useMatch(props.path)}
        to={props.path}
        aria-current="page"
      >
        <ListItemDecorator children={props.icon} />
        <ListItemContent>{props.label}</ListItemContent>
      </ListItemButton>
    </ListItem>
  )
}

type NavigationProps = Omit<ListProps, "children">
type NavItemProps = {
  path: string
  label: string
  icon: ReactNode
}

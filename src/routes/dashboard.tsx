import { Box, Button, Container, Typography } from "@mui/material"
import { useState } from "react"
import { Link } from "react-router-dom"
import { useCurrentUserType } from "../core/auth"

export const Component = function Dashboard(): JSX.Element {
  const [currentUserType] = useState(useCurrentUserType())
  return (
    <Container>
      <Box sx={{ textAlign: "center", mt: 5 }}>
        <Typography color="primary" variant="h4" gutterBottom>
          Welcome to the Dashboard
        </Typography>
        <Box sx={{ mt: 3 }}>
          {currentUserType?.type === "agent" && (
            <Button
              variant="contained"
              color="primary"
              component={Link}
              to="/dashboard/agent"
              sx={{ mr: 2 }}
            >
              Dashboard Agent
            </Button>
          )}
          {currentUserType?.type === "prod" && (
            <Button variant="contained" color="secondary" component={Link} to="/dashboard/prod">
              Dashboard Prod
            </Button>
          )}
        </Box>
      </Box>
    </Container>
  )
}

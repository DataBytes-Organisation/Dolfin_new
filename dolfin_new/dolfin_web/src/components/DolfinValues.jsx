import * as React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import { Typography } from "@mui/material";
import ConstructionIcon from "@mui/icons-material/Construction";
import LocalLibraryIcon from "@mui/icons-material/LocalLibrary";
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';

const item = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  px: 5,
  boxShadow: 2,
  borderRadius: 2,
};

function DolfinValues() {
  return (
    <Box component="section" sx={{ display: "flex", overflow: "hidden" }}>
      <Container sx={{ mt: 15, mb: 15, display: "flex", position: "relative" }}>
        <Grid container spacing={5}>
          <Grid item xs={12} md={4}>
            <Box sx={item}>
              <Box
                component={ConstructionIcon}
                sx={{ fontSize: 55, height: 55, color: "info.main", mt: 5 }}
              />
              <Typography
                variant="h6"
                align="center"
                sx={{ my: 5, fontWeight: "bold" }}
              >
                AI-Driven Insights
              </Typography>
              <Typography variant="h5" sx={{ mb: 5 }}>
                Harness the power of AI for tailored financial forecasts. DolFin
                delivers personalized guidance to navigate your financial
                future.
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Box sx={item}>
              <Box
                component={AccountBalanceIcon}
                sx={{ fontSize: 55, height: 55, color: "info.main", mt: 5 }}
              />
              <Typography
                variant="h6"
                align="center"
                sx={{ fontWeight: "bold", my: 5 }}
              >
                Open Banking Freedom
              </Typography>
              <Typography variant="h5" sx={{ mb: 5 }}>
                Access and manage your finances in one place. DolFin uses the
                open banking platform to democratize financial services for
                everyone.
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Box sx={item}>
              <Box
                component={LocalLibraryIcon}
                sx={{ fontSize: 55, height: 55, color: "info.main", mt: 5 }}
              />
              <Typography
                variant="h6"
                align="center"
                sx={{ fontWeight: "bold", my: 5 }}
              >
                Empower Through Knowledge
              </Typography>
              <Typography variant="h5" sx={{ mb: 5 }}>
                Elevate your financial literacy with DolFin. We equip you with
                the tools to foster healthy financial habits and close the
                inequality gap.
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default DolfinValues;

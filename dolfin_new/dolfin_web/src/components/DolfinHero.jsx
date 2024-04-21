import * as React from "react";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import DolfinHeroLayout from "./DolfinHeroLayout.jsx";
import backgroundImage from "../assets/images/homebackground.jpg";
import { Link } from "@mui/material";

export default function DolfinHero() {
  return (
    <DolfinHeroLayout
      sxBackground={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundColor: "#7fc7d9",
        backgroundPosition: "center",
      }}
    >
      <img
        style={{ display: "none" }}
        src={backgroundImage}
        alt="increase priority"
      />
      <Typography
        color="inherit"
        align="center"
        variant="h2"
        marked="center"
        sx={{
          fontWeight: "bold",
          fontSize: "4rem",
          textShadow: "1px 1px 4px rgba(0,0,0,0.6)",
          mb: 1,
        }}
      >
        Navigate to Financial Wellbeing
      </Typography>
      <Typography
        color="inherit"
        align="center"
        variant="h5"
        sx={{
          mb: 4,
          mt: { xs: 4, sm: 10 },
          letterSpacing: "0.1rem",
          textShadow: "1px 1px 3px rgba(0,0,0,0.5)",
        }}
      >
        Empower Your Finances, Embrace Your Future
      </Typography>
      <Button
        color="secondary"
        variant="contained"
        size="large"
        component={Link}
        href="/login"
        sx={{
          minWidth: 200,
          bgcolor: "primary.main",
          ":hover": {
            bgcolor: "primary.dark",
            boxShadow: "0 4px 20px 0 rgba(0,0,0,0.12)",
          },
          fontWeight: "bold",
          fontSize: "1rem",
          border: "none",
          borderRadius: "5px",
          textTransform: "none",
          padding: "10px 20px",
        }}
      >
        JOIN US
      </Button>

      <Typography
        variant="body2"
        color="inherit"
        sx={{
          mt: 2,
          letterSpacing: "0.05rem",
          opacity: 0.8,
        }}
      >
        Discover the experience
      </Typography>
    </DolfinHeroLayout>
  );
}

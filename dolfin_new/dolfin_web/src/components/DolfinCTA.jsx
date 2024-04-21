import * as React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import { Typography } from "@mui/material";
import Input from "@mui/material/Input";
import Snackbar from "./Snackbar";
import Button from "@mui/material/Button";
import CTAImage from "../assets/images/cta.png";

function DolfinCTA() {
  const [open, setOpen] = React.useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Container component="section" sx={{ mt: 10, display: "flex", mb: 10 }}>
      <Grid container>
        <Grid item xs={12} md={6} sx={{ zIndex: 1 }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              bgcolor: "white",
              py: 8,
              px: 3,
              border: 2,
              borderColor: "#2196f3",
              borderRadius: 2,
            }}
          >
            <Box
              component="form"
              onSubmit={handleSubmit}
              sx={{ maxWidth: 450 }}
            >
              <Typography
                variant="h2"
                component="h2"
                gutterBottom
                sx={{ color: "#2196f3" }}
              >
                Boost with Dolfin
              </Typography>
              <Typography variant="h5" sx={{ color: "#2196f3" }}>
                Begin Your Wealth Journey Now
              </Typography>
              <Input
                variant="plain"
                placeholder="Your email"
                sx={{
                  width: "100%",
                  mt: 3,
                  mb: 2,
                  bgcolor: "white",
                }}
              />
              <Button
                type="submit"
                color="primary"
                variant="outlined"
                sx={{
                  width: "100%",
                  border: 2,
                  fontWeight: "bold",
                  p: 1,
                  "&:hover": {
                    border: 2,
                  },
                }}
              >
                Keep me updated
              </Button>
            </Box>
          </Box>
        </Grid>
        <Grid
          item
          xs={12}
          md={6}
          sx={{ display: { md: "block", xs: "none" }, position: "relative" }}
        >
          <Box
            sx={{
              position: "absolute",
              top: -67,
              left: -67,
              right: 0,
              bottom: 0,
              width: "100%",
            }}
          />
          <Box
            component="img"
            src={CTAImage}
            alt="call to action"
            sx={{
              position: "absolute",
              top: -28,
              left: -28,
              right: 0,
              bottom: 0,
              width: "100%",
              maxWidth: 600,
              borderRadius: 2,
            }}
          />
        </Grid>
      </Grid>
      <Snackbar
        open={open}
        closeFunc={handleClose}
        message="Welcome aboard! We're excited to share our journey with you."
        onClose={handleClose}
      />
    </Container>
  );
}

export default DolfinCTA;

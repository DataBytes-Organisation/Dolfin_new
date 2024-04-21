import React from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

function Banner(props) {
  return (
    <>
      <Typography
        variant="h4"
        component="h2"
        sx={{
          textAlign: "center",
          mt: 4,
          fontWeight: "bold",
          fontSize: "3rem",
        }}
      >
        {props.content}
      </Typography>
      <Box
        sx={{ display: "flex", alignItems: "center", flexDirection: "column" }}
      >
        <Box sx={{ borderTop: 5, borderColor: "primary.main", width: 80 }} />
      </Box>
    </>
  );
}

export default Banner;

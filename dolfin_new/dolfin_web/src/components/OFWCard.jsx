import React from "react";
import { CardHeader } from "@mui/material";
import { IconButton } from "@mui/material";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
const RFWCard = () => {
  return (
    <Card sx={{ minWidth: 275 }}>
      <CardHeader
        action={
          <IconButton aria-label="help">
            <HelpOutlineIcon />
          </IconButton>
        }
        title={
            <Typography color="#2196f3" sx={{fontWeight: "bold",fontSize: 24, fontStyle: "italic"}} >
              Observed Financial Well-being Score
            </Typography>
          }
      />
      <CardContent>
        <Typography
          sx={{
            fontSize: 100,
            fontWeight: "bold",
            textAlign: "center",
          }}
          gutterBottom
        >
          90
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Refresh</Button>
      </CardActions>
    </Card>
  );
};
export default RFWCard;
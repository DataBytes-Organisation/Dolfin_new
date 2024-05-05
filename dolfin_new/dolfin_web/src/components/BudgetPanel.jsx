import React from "react";
import { Gauge, gaugeClasses } from "@mui/x-charts/Gauge";
import { CardHeader } from "@mui/material";
import { IconButton } from "@mui/material";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
const BudgetPanel = () => {
  return (
    <Card sx={{ minWidth: 275 }}>
      <CardHeader
        action={
          <IconButton aria-label="help">
            <HelpOutlineIcon />
          </IconButton>
        }
        title={
          <Typography
            color="#2196f3"
            sx={{ fontWeight: "bold", fontSize: 24, fontStyle: "italic" }}
          >
            Budget Panel
          </Typography>
        }
      />
      <CardContent sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Gauge
          width={250}
          height={250}
          value={60}
          startAngle={-110}
          endAngle={110}
          sx={{
            [`& .${gaugeClasses.valueText}`]: {
              fontSize: 30,
              transform: "translate(0px, 0px)",
            },
          }}
          text={({ value, valueMax }) => `${value} / ${valueMax}`}
        />
      </CardContent>
      <CardActions>
        <Button size="small">Refresh</Button>
      </CardActions>
    </Card>
  );
};
export default BudgetPanel;

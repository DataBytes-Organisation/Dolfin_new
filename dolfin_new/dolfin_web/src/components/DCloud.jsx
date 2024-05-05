import React from "react";
import { PieChart } from "@mui/x-charts/PieChart";
import { Button, CardHeader } from "@mui/material";
import { IconButton,Box } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import CardActions from "@mui/material/CardActions";
import wordCloudImage from "../assets/images/word_cloud.png";

const DCloud = () => {
  const data = [
    { id: 0, value: 10, label: "Low Level" },
    { id: 1, value: 15, label: "Medium Level" },
    { id: 2, value: 20, label: "High Level" },
  ];
  return (
    <>
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
              D-Cloud
            </Typography>
          }
          subheader="Current Mode: Amount"
        />
        <CardContent>
        <Box display="flex" justifyContent="space-around" alignItems="center" p={2}>
      <Box sx={{ flexBasis: '50%', p: 1,  }}>
        <PieChart
          series={[
            {
              data,
              highlightScope: { faded: "global", highlighted: "item" },
              faded: {
                innerRadius: 30,
                additionalRadius: -30,
                color: "gray",
              },
            },
          ]}
          height={200}
        />
      </Box>
      <Box sx={{ flexBasis: '50%', p: 1,  overflow: 'hidden' }}>
        <img src={wordCloudImage} alt="Description" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
      </Box>
    </Box>
        </CardContent>
        <CardActions>
        <Button  color="primary">
            Amount
          </Button>
          <Button  color="primary">
            Frequence
          </Button>
        </CardActions>
      </Card>
    </>
  );
};
export default DCloud;

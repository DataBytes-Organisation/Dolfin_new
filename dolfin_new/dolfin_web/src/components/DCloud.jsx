import React from "react";
import { PieChart } from "@mui/x-charts/PieChart";
import { Button, CardHeader } from "@mui/material";
import { IconButton,Box } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import CardActions from "@mui/material/CardActions";
import { useEffect } from "react";
import { useContext } from "react";
import { UserContext } from "../context/user.context";
import { updateUserDCloud } from "../api/database";
const DCloud = () => {
  const { currentUser } = useContext(UserContext);
  const [dataset,setDataset]=React.useState([]);
  const [cloudImage,setCloudImage]=React.useState();
  useEffect(() => {
    const fetchDCloud = async () => {
      const response = await updateUserDCloud(
        currentUser.email,
        currentUser.jwt
      );
      if (response.success) {
        setDataset(response.cluster);
        setCloudImage(response.image)
      }
    };
    fetchDCloud();
  },[currentUser.email, currentUser.jwt]);
  const handleRefresh=async()=>{
    const response = await updateUserDCloud(
      currentUser.email,
      currentUser.jwt
    );
    if (response.success) {
      setDataset(response.cluster);
      setCloudImage(response.image)
    }
  }
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
        />
        <CardContent>
        <Box display="flex" justifyContent="space-around" alignItems="center" p={2}>
      <Box sx={{ flexBasis: '50%', p: 1,  }}>
        <PieChart
          series={[
            {
              data:dataset,
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
        <img src={cloudImage} alt="Description" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
      </Box>
    </Box>
        </CardContent>
        <CardActions>
        <Button  color="primary" onClick={handleRefresh}>
            Fresh
          </Button>
        </CardActions>
      </Card>
    </>
  );
};
export default DCloud;

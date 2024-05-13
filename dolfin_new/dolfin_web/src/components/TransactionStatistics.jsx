import React from "react";
import { CardHeader } from "@mui/material";
import { IconButton } from "@mui/material";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import { BarChart } from "@mui/x-charts/BarChart";
import { axisClasses } from "@mui/x-charts";
import { updateUserIncomeAndExpenditure } from "../api/database";
import { useContext } from "react";
import { UserContext } from "../context/user.context";
import { useEffect } from "react";
const TransactionStatistics = () => {
  const { currentUser } = useContext(UserContext);
  const [dataset, setDataset] = React.useState([]);
  const chartSetting = {
    yAxis: [
      {
        label: "amount (AUD)",
      },
    ],
    width: 700,
    height: 250,
    sx: {
      [`.${axisClasses.left} .${axisClasses.label}`]: {
        transform: "translate(-20px, 0)",
      },
    },
  };

  const handleRefresh = async () => {
    const response = await updateUserIncomeAndExpenditure(
      currentUser.email,
      currentUser.jwt
    );
    if (response.success) {
      setDataset(response.data);
      console.log(response.data);
    }
  
  };
  useEffect(() => {
    const fetchIncomeAndExpenditure = async () => {
      const response = await updateUserIncomeAndExpenditure(
        currentUser.email,
        currentUser.jwt
      );
      if (response.success) {
        setDataset(response.data);
      }
    };
    fetchIncomeAndExpenditure();
  }, [currentUser.email, currentUser.jwt]);

  const valueFormatter = (value) => `${value}AUD`;
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
            Income and Expenditure Statistics
          </Typography>
        }
      />
      <CardContent
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      >
        <BarChart
          dataset={dataset}
          xAxis={[{ scaleType: "band", dataKey: "year_month" }]}
          series={[
            { dataKey: "Income", label: "Income", valueFormatter },
            { dataKey: "Expenditure", label: "Expenditure", valueFormatter },
          ]}
          {...chartSetting}
        />
      </CardContent>
      <CardActions>
        <Button size="small" onClick={handleRefresh}>
          Refresh
        </Button>
      </CardActions>
    </Card>
  );
};
export default TransactionStatistics;

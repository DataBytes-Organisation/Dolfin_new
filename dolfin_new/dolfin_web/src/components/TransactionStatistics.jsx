import React from "react";
import { CardHeader } from "@mui/material";
import { IconButton } from "@mui/material";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import { BarChart } from '@mui/x-charts/BarChart';
import { axisClasses } from '@mui/x-charts';
const TransactionStatistics = () => {
    const chartSetting = {
        yAxis: [
          {
            label: 'amount (AUD)',
          },
        ],
        width: 700,
        height: 250,
        sx: {
          [`.${axisClasses.left} .${axisClasses.label}`]: {
            transform: 'translate(-20px, 0)',
          },
        },
      };
      const generateMonthlyFinance = () => {
        const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        const finances = months.map(month => {
          const income = Math.floor(Math.random() * 100) + 50;  
          const expenditure = Math.floor(Math.random() * 50) + 30;  
          return {
            month,
            income,
            expenditure
          };
        });
        return finances;
      };
      const dataset = generateMonthlyFinance();
      
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
      <CardContent sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <BarChart
      dataset={dataset}
      xAxis={[{ scaleType: 'band', dataKey: 'month' }]}
      series={[
        { dataKey: 'income', label: 'Income', valueFormatter },
        { dataKey: 'expenditure', label: 'Expenditure', valueFormatter },
      ]}
      {...chartSetting}
    />
      </CardContent>
      <CardActions>
        <Button size="small">Refresh</Button>
      </CardActions>
    </Card>
  );
};
export default TransactionStatistics;

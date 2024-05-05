import React from "react";
import { useContext } from "react";
import { UserContext } from "../context/user.context";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Typography, Container } from "@mui/material";
import Footer from "../components/Footer";
import Banner from "../components/Banner";
import Grid from "@mui/material/Grid";
import RFWCard from "../components/RFWCard";
import OFWCard from "../components/OFWCard";
import DCloud from "../components/DCloud";
import BudgetPanel from "../components/BudgetPanel";
import TransactionStatistics from "../components/TransactionStatistics";
import AIAssistant from "../components/AIAssistant";

const DashboardPage = () => {
  const { currentUser } = useContext(UserContext);
  const navigate = useNavigate();
  useEffect(() => {
    if (!currentUser) {
      navigate("/login");
    }
  }, [currentUser, navigate]);
  return (
    <>
      <Container sx={{ mt: 2, mb: 2 }}>
        <Typography variant="h2">{`Welcome, ${
          currentUser ? currentUser.firstName : ""
        }!`}</Typography>
        <Typography
          variant="h6"
          color="text.secondary"
          sx={{ ml: 20, fontStyle: "italic" }}
        >
          ---- Manage your assets here
        </Typography>
        <Banner content="Financial Well-being Insight" />
        <br></br>
        <Grid container spacing={5}>
          <Grid item xs={12} md={6}>
            <RFWCard />
          </Grid>
          <Grid item xs={12} md={6}>
            <OFWCard />
          </Grid>
        </Grid>

        <br></br>
        <Banner content="Financial Overview" />
        <br></br>
        <Grid container spacing={5}>
          <Grid item xs={12} md={4}>
            <BudgetPanel />
          </Grid>
          <Grid item xs={12} md={8}>
            <TransactionStatistics />
          </Grid>
        </Grid>
        
        <br></br>
        <DCloud />
        <br></br>
        <Banner content="Financial intelligent support" />
        <br></br>
        <AIAssistant />
        <br></br>
        <br></br>
      </Container>
      <Footer />
    </>
  );
};
export default DashboardPage;

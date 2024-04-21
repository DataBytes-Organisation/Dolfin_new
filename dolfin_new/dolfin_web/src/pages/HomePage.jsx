import React from "react";
import DolfinHero from "../components/DolfinHero";
import DolfinValues from "../components/DolfinValues";
import Banner from "../components/Banner";
import HubCTA from "../components/DolfinCTA";
import Footer from "../components/Footer";

const HomePage = () => {
  return (
    <>
      <DolfinHero />
      <Banner content="WHY US" />
      <DolfinValues />
      <Banner content="FOLLOW US" />
      <HubCTA />
      <Footer/>
    </>
  );
};
export default HomePage;

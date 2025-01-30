import React from "react";
import backgroundImage from "../../assets/images/theme/theme1.svg";
import Grid from "@mui/material/Grid";

const RankCard = (props) => {
  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      className="h-screen bg-cover bg-center"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      {props.FirstComponent}
      {props.SecondComponent}
    </Grid>
  );
};

export default RankCard;

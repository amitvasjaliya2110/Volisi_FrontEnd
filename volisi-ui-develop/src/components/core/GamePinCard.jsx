import React from "react";
import { Grid, Typography } from "@mui/material";

const GamePinCard = () => {
  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      position="fixed"
      style={{
        width: "234px",
        height: "124px",
        top: "0px",
        borderRadius: "0px 0px 32px 32px",
        padding: "24px",
        gap: "18px",
        backgroundColor: "#FEF3E7",
      }}
    >
      <Grid container justifyContent="center" alignItems="center">
        <Grid item className="w-[186px] h-[76px]">
          <Typography
            variant="h2"
            align="center"
            fontWeight={500}
            fontSize="20px"
            lineHeight="24px"
            color="#E93E3A"
            gutterBottom
          >
            Game Pin:
          </Typography>
          <Typography
            variant="h2"
            align="center"
            fontWeight={700}
            fontSize="48px"
            lineHeight="52px"
            color="#27272A"
            gutterBottom
          >
            606 808
          </Typography>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default GamePinCard;

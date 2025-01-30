import React from "react";
import { Grid, Typography } from "@mui/material";

const WaitingPlayerCard = () => {
  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      className="absolute"
      style={{
        width: "270px",
        height: "53px",
        top: "300px",
        borderRadius: "4px",
        padding: "12px",
        gap: "10px",
        backgroundColor: "rgba(254, 243, 231, 0.50)",
      }}
    >
      <Typography
        variant="h1"
        align="center"
        style={{
          fontWeight: 600,
          fontSize: "24px",
          lineHeight: "28.8px",
          color: "#FFFFFF",
        }}
      >
        Waiting for players…
      </Typography>
    </Grid>
  );
};

export default WaitingPlayerCard;

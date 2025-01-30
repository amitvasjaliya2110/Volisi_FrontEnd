import React from "react";
import { Grid, Typography } from "@mui/material";

const ScoreboardLabelCard = () => {
  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      sx={{
        position: "absolute",
        width: "319px",
        height: "80px",
        top: "0px",
        gap: "18px",
        borderRadius: "0px 0px 32px 32px",
        background: "rgba(254, 243, 231, 1)",
      }}
    >
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        sx={{
          width: "217px",
          height: "52px",
        }}
      >
        <Typography
          variant="h2"
          sx={{
            fontSize: "48px",
            fontWeight: 700,
            lineHeight: "52px",
            textAlign: "center",
            color: "rgba(39, 39, 42, 1)",
          }}
        >
          Scoreboard
        </Typography>
      </Grid>
    </Grid>
  );
};

export default ScoreboardLabelCard;

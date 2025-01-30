import React from "react";
import { Grid, Typography } from "@mui/material";

const PlayQuizCard = () => {
  return (
    <Grid
      item
      className="fixed w-[422px] h-[84px] p-6 left-1/2 top-0 transform -translate-x-1/2 bg-[#FEF3E7] rounded-b-[32px]"
    >
      <Typography
        variant="h3"
        align="center"
        gutterBottom
        style={{ color: "#E93E3A", fontSize: "32px" }}
      >
        Get Ready To Play Quiz
      </Typography>
    </Grid>
  );
};

export default PlayQuizCard;

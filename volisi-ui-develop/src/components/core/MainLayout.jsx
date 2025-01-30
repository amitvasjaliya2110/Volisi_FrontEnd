/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from "react";
import Grid from "@mui/material/Grid";
import AuthImage from "./AuthImage";

const MainLayout = (props) => {
  return (
    <Grid
      container
      style={{
        height: "100vh",
      }}
    >
      <Grid
        item
        xs={6}
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "75px",
        }}
      >
        {props.PageComponent}
      </Grid>
      <AuthImage display="flex" />
    </Grid>
  );
};

export default MainLayout;

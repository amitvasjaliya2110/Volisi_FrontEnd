import { Grid } from "@mui/material";
import React from "react";
const img = "/src/Assets/images/AuthImage.svg";

const AuthImage = () => {
  return (
    <Grid
      item
      xs={5.25}
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundImage: `url(${img})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        borderRadius: "400px 400px 0 0",
        marginTop: "56px",
      }}
    />
  );
};

export default AuthImage;

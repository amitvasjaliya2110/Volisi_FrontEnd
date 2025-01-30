import React from "react";
import Logo from "../../assets/icons/Volisi_logo.svg";
import Grid from "@mui/material/Grid";
import Button from "./Button.jsx";

const RankLabelCard = () => {
    return (
        <Grid
              container
              justifyContent="center"
              alignItems="center"
              style={{
                top: "0px",
                position: "absolute",
                width: "204px", // Set width
                height: "88px", // Set height
                padding: "24px", // Set padding
                gap: "18px", // Set gap between items
                borderRadius: "0px 0px 32px 32px", // Set border radius
                background: "rgba(254, 243, 231, 1)", // Set background color
              }}
            >
              <img src={Logo} alt="Volisi favicon icon" />
            </Grid>
    );
};

export default RankLabelCard
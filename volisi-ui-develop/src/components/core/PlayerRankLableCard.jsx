import React from "react";
import Logo from "../../assets/icons/Volisi_logo.svg";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";

const PlayerRankLabelCard = ({ showButtons = false }) => {
  return (
    <Grid
      container
      justifyContent="space-between"
      alignItems="flex-start"
      style={{
        top: 0,
        position: "absolute",
        width: "100%",
        height: "85px",
      }}
    >
      {showButtons && (
        <Grid item style={{ padding: "24px" }}>
          <Button
            variant="contained"
            color="error"
            style={{
              width: "111px",
              height: "40px",
              borderRadius: "12px",
              textTransform: "none",
              fontSize: "20px",
              padding: "6px 16px",
            }}
          >
            Home
          </Button>
        </Grid>
      )}

      <Grid
        item
        style={{
          background: "rgba(254, 243, 231, 1)",
          width: "204px",
          height: "85px",
          padding: "24px",
          borderRadius: "0 0 32px 32px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          margin: showButtons ? "0" : "0 auto",
        }}
      >
        <img src={Logo} alt="Volisi logo" />
      </Grid>

      {showButtons && (
        <Grid item style={{ padding: "24px" }}>
          <Button
            variant="contained"
            color="error"
            style={{
              width: "175px",
              height: "40px",
              borderRadius: "12px",
              textTransform: "none",
              fontSize: "20px",
              padding: "6px 16px",
            }}
          >
            More Players
          </Button>
        </Grid>
      )}
    </Grid>
  );
};

export default PlayerRankLabelCard;

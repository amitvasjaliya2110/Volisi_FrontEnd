import React from "react";
import { Grid, AppBar, Toolbar, Box } from "@mui/material";
import Logo from "../../assets/icons/Volisi_logo.svg";
import "./Header.css";
import OnBoardHeader from "../../pages/onboardscreen/OnBoardHeader";
import DashBoardHeader from "../../pages/dashboard/DashBoardHeader";
import CreateQuizHeader from "../../pages/createquiz/CreateQuizHeader";

const Header = ({ onBoardHeader, createQuizHeader }) => {
  return (
    <AppBar
      position="static"
      className="app-bar"
      elevation={0}
      sx={{ borderBottom: "2px solid #D4D4D8" }}
    >
      <Toolbar className="toolbar">
        <Grid container alignItems="center" justifyContent="space-between">
          <Grid item xs={4}>
            <Box
              component="img"
              className="Header-logo"
              alt="Volisi favicon icon"
              src={Logo}
            />
          </Grid>
          <Grid item xs={8}>
            {onBoardHeader ? (
              <OnBoardHeader />
            ) : createQuizHeader ? (
              <CreateQuizHeader />
            ) : (
              <DashBoardHeader />
            )}
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
};

export default Header;

import React from "react";
import backgroundImage from "./../../assets/images/theme/theme1.svg";
import Logo from "../../assets/icons/Volisi_logo.svg";
import Grid from "@mui/material/Grid";
import { Box } from "@mui/system";

const ShareOtp = (props) => {
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
      <Box
        position="fixed"
        bottom={20}
        left={0}
        right={0}
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        px={4} 
      >
        <Box>
          <img src={Logo} alt="Volisi favicon icon" style={{ width: '156px', height: '40px' }} />
        </Box>
        </Box>
    </Grid>
  );
};

export default ShareOtp;

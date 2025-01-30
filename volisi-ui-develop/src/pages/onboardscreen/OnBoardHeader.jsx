import React from "react";
import { Grid } from "@mui/material";
import Button from "../../components/core/Button";
import { useNavigate } from "react-router-dom";

const OnBoardHeader = () => {
  const navigate = useNavigate();
  return (
    <Grid container spacing={1} alignItems="center" justifyContent="flex-end">
      <Grid item>
        <Button
          sx={{
            height: "38px",
            padding: "8px 16px 8px 16px",
            borderRadius: "12px",
          }}
          name="Log In"
          backgroundColor="#FFFFFF"
          fontColor="#000000"
          width="77px"
          onClick={() => navigate("/login")}
        />
      </Grid>
      <Grid item>
        <Button
          sx={{
            height: "38px",
            padding: "8px 16px",
          }}
          name="Register"
          width="144px"
          onClick={() => navigate("/register")}
        />
      </Grid>
    </Grid>
  );
};

export default OnBoardHeader;

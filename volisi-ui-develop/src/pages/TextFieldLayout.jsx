import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import TextFields from "../components/core/TextField";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

export default function TextFieldLayout() {
  return (
    <Box>
      <Grid container spacing={2} direction="row" xs={8} lg={8} m="0rem 1rem">
        <Grid item xs={4}>
          <TextFields
            placeholder="Enter Email ID"
            type="text"
            label="Email ID"
          />
        </Grid>
        <Grid item xs={4}>
          <TextFields
            placeholder="Enter Password"
            type="password"
            label="Password"
            showPasswordTooltip="true"
            showForgotPassword = 'true'
          />
        </Grid>
        <Grid item xs={4}>
          <TextFields
            placeholder="Enter Password"
            type="password"
            label="Confrom Password"
            showPasswordTooltip="true"
          />
        </Grid>
        <Grid item xs={4}>
          <TextFields
            placeholder="Enter Email ID with error field"
            label="Email ID"
            type="emial"
            errorMessage="didnt match email id"
            showError="true"
            
          />
        </Grid>
        <Grid item xs={4}>
          <TextFields
            placeholder="Enter Password"
            type="password"
            label="Password"
            showPasswordTooltip="true"
            errorMessage="Incorrect formate "
            showError="true"
            showForgotPassword = 'true'
          />
        </Grid>
        <Grid item xs={4}>
          <TextFields
            placeholder="Enter Password"
            type="password"
            errorMessage="Error Message"
            showError="true"
            label="Confrom Password"
            showPasswordTooltip="true"
          />
        </Grid>
      </Grid>
    </Box>
  );
}
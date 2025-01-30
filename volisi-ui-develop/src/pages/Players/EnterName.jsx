/* eslint-disable no-unused-vars */
import { Box, Container, Grid } from "@mui/material";
import { styled } from "@mui/system";
import TextFields from "../../components/core/TextField";
import Button from "../../components/core/Button";

const StyledContainer = styled(Container)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  alignContent: "center",
  height: "80vh",
  [theme.breakpoints.down("sm")]: {
    padding: "30px",
  },
}));

const StyledTextField = styled(TextFields)(({ theme }) => ({
  width: "100%",
  padding: "24px 24px 0px 24px",
  "& .MuiInputBase-input": {
    textAlign: "center",
    fontWeight: 600,
    fontSize: "20px",
  },

  "& .MuiInputBase-input::placeholder": {
    textAlign: "center",
  },
}));

const StyledButton = styled(Button)(({ theme }) => ({
  width: "100%",
}));

function EnterName() {
  return (
    <StyledContainer>
      <Grid
        Container
        sx={{
          justifyContent: "space-between",
          alignItems: "center",
          backgroundColor: "#FEF3E7",
          borderRadius: "20px",
        }}
      >
        <StyledTextField placeholder="Enter Name" variant="outlined" />
        <Grid sx={{ padding: "0px 24px 24px 24px" }}>
          <StyledButton name="Continue" variant="contained" color="primary" />
        </Grid>
      </Grid>
    </StyledContainer>
  );
}

export default EnterName;

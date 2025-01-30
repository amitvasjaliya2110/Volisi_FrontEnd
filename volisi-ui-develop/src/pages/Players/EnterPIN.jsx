/* eslint-disable no-unused-vars */
import { Box, Container, Grid, Typography } from "@mui/material";
import { styled } from "@mui/system";
import { useNavigate } from "react-router-dom";
import TextFields from "../../components/core/TextField";
import Button from "../../components/core/Button";
import { useState } from "react";
import { MESSAGES } from "../../constants/constants";
import { API_ENDPOINT } from "../../constants/constants";
import useAxios from "../../app/hooks/useAxios";
import { notification } from "antd";

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

function EnterPIN() {
  const navigate = useNavigate();
  const [pin, setPin] = useState("");
  const [error, setError] = useState("");
  const { post } = useAxios();

  const handlePinChange = (e) => {
    const value = e.target.value.replace(/\s/g, "");
    if (/^\d{0,6}$/.test(value)) {
      const formattedValue = value.replace(/(\d{3})(?=\d)/g, "$1 ");
      setPin(formattedValue);
      setError("");
    } else {
      setError("");
    }
  };
  const handleContinue = async () => {
    const pinInt = parseInt(pin.replace(/\s/g, ""), 10);
    const response = await post(`${API_ENDPOINT.PIN_VERIFY}`, {
      code: pinInt,
    })
      .then(() => {
        notification.success({
          message: "success",
          description: MESSAGES.VALID_PIN,
        });
        navigate("/entername");
      })
      .catch(() => {
        setError(MESSAGES.INVALID_PIN);
      });
  };

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
        <StyledTextField
          placeholder="Enter PIN"
          variant="outlined"
          value={pin}
          onChange={handlePinChange}
        />
        {error && (
          <Typography color="error" textAlign={"center"} marginBottom={"12PX"}>
            {error}
          </Typography>
        )}
        <Grid sx={{ padding: "0px 24px 24px 24px" }}>
          <StyledButton
            name="Continue"
            variant="contained"
            color="primary"
            onClick={handleContinue}
          />
        </Grid>
      </Grid>
    </StyledContainer>
  );
}

export default EnterPIN;

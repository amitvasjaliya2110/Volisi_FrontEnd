import React, { useState, useRef, useEffect } from "react";
import { TextField } from "@mui/material";
import Grid from "@mui/material/Grid";
import { DATA_KEY, REGEX } from "../../constants/constants";

const OTPTextField = ({ numInputs, onChange }) => {
  const [otp, setOtp] = useState(new Array(numInputs).fill(""));
  const inputRefs = useRef([]);
  const handleChange = (index, value) => {
    const updatedValue = value.toUpperCase();
    if (REGEX.OTP.test(updatedValue)) {
      const newOtp = [...otp];
      newOtp[index] = updatedValue;
      setOtp(newOtp);
      onChange(newOtp.join(""));
      if (updatedValue && inputRefs.current[index + 1]) {
        inputRefs.current[index + 1].focus();
      }
    }
  };

  const handlePaste = (event) => {
    const updatedData = event.clipboardData
      ?.getData(DATA_KEY)
      ?.trim()
      ?.toUpperCase();
    if (updatedData?.length === numInputs) {
      const value = updatedData?.split("");
      setOtp(value);
      onChange(value?.join(""));
      inputRefs?.current[numInputs - 1].focus();
    }
  };

  const handleBackspace = (index, event) => {
    if (event.key === "Backspace" && index !== 0 && !otp[index]) {
      const newOtp = [...otp];
      newOtp[index] = "";
      setOtp(newOtp);
      if (inputRefs.current[index - 1]) {
        inputRefs.current[index - 1].focus();
      }
    }
  };

  return (
    <Grid container spacing={2} justifyContent={"center"}>
      {Array.from({ length: numInputs }, (_, index) => (
        <Grid item key={index} style={{ padding: "10px" }}>
          <TextField
            inputRef={(ref) => (inputRefs.current[index] = ref)}
            value={otp[index]}
            onChange={(e) => handleChange(index, e.target.value)}
            onKeyUp={(e) => handleBackspace(index, e)}
            onPaste={handlePaste}
            inputProps={{
              maxLength: 1,
              style: {
                textAlign: "center",
                width: "60px",
                height: "60px",
                margin: "0",
                padding: "0",
                fontSize: "32px",
                color: "#E93E3A",
              },
            }}
            variant="outlined"
            type="text"
            autoComplete="off"
          />
        </Grid>
      ))}
    </Grid>
  );
};

export default OTPTextField;

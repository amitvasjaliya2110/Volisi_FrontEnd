/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { Box, Typography, Grid, Alert } from "@mui/material";
import Button from "../../../components/core/Button";
import OTPTextField from "../../../components/core/OTPTextField";
import useAxios from "../../../app/hooks/useAxios";
import { useNavigate } from "react-router-dom";
import { API_ENDPOINT, MESSAGES } from "../../../constants/constants";
import { notification } from "antd";

const volisiLogo = "/src/Assets/images/Volisi_logo.svg";
const OtpVerification = () => {
  const [timer, setTimer] = useState(60);
  const [otp, setotp] = useState("");
  const id = localStorage.getItem("userId");
  const email = localStorage.getItem("email");

  const [alertMessage, setAlertMessage] = useState({
    errorType: "",
    errorMessage: "",
    open: false,
  });
  const navigate = useNavigate();
  const { get, post } = useAxios();

  useEffect(() => {
    let interval = null;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [timer]);

  const handleResendOtp = async () => {
    setTimer(60);
    try {
      const otpResponse = await get(`${API_ENDPOINT.OTP_GENERATE}/${id}`);
    } catch (otpError) {
      console.error(otpError);
    }
  };

  const handleSubmit = async () => {
    if (otp.length < 6) {
      notification.error({
        message: "error",
        description: MESSAGES.OTP_ERROR,
      });
    } else {
      await post(API_ENDPOINT.VERIFY_OTP, { id, otp })
        .then(() => {
          notification.success({
            message: "success",
            description: MESSAGES.OTP_SUCCESS,
          });
          navigate("/create-new-password");
        })
        .catch(() => {
          notification.error({
            message: "error",
            description: MESSAGES.OTP_ERROR,
          });
        });
    }
  };

  return (
    <Grid
      container
      component="main"
      flexDirection={"column"}
      className="h-[90%] px-[90px] justify-between"
    >
      <Grid container className="justify-center">
        <Box component="img" alt="Volisi Logo" src={volisiLogo} />
      </Grid>
      <Grid>
        <Typography
          component="h1"
          className="text-center font-semibold text-4xl"
          fontSize={"2rem"}
        >
          OTP Verification
        </Typography>

        <Typography
          className="text-center font-normal px-15 pt-2 pb-10"
          color={"#3F3F46"}
        >
          We sent a code on{" "}
          <Typography component="span" color={"black"}>
            {email}
          </Typography>
        </Typography>
        <Grid />

        <Grid className="h-24 m-2 gap-2">
          <OTPTextField numInputs={6} onChange={(otp) => setotp(otp)} />
        </Grid>

        <Grid className="text-center font-normal px-20 py-2 ">
          {timer > 0 ? (
            <>
              Use this OTP for the next{" "}
              <Typography component="span" className="text-[#E93E3A]">
                {`00:${timer < 10 ? `0${timer}` : timer}`}
              </Typography>
            </>
          ) : (
            <>
              Didn’t get the code?{" "}
              <Typography
                component="span"
                onClick={handleResendOtp}
                className="cursor-pointer text-[#E93E3A]"
              >
                Resend OTP
              </Typography>
            </>
          )}
          {alertMessage.open && (
            <Alert severity={alertMessage.errorType} className="my-2">
              {alertMessage.errorMessage}
            </Alert>
          )}
        </Grid>
      </Grid>
      <Grid className="h-16 gap-5">
        <Button name="Submit" onClick={handleSubmit} />
      </Grid>
    </Grid>
  );
};

export default OtpVerification;

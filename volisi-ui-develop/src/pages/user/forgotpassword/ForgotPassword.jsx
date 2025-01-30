import { useState } from "react";
import { Alert, Box, Grid, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import TextField from "../../../components/core/TextField";
import Button from "../../../components/core/Button";
import { API_ENDPOINT, REGEX, MESSAGES } from "../../../constants/constants";
import useAxios from "../../../app/hooks/useAxios";
import { notification } from "antd";

const volisiLogo = "/src/Assets/images/Volisi_logo.svg";
const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [showAlertMessage, setShowAlertMessage] = useState({
    errorType: "",
    errorMessage: "",
    open: false,
  });
  const { get } = useAxios();
  const navigate = useNavigate();

  const validateEmail = (event) => {
    setEmail(event.target.value);
    setEmailError(REGEX.EMAIL.test(event.target.value) ? "" : MESSAGES.EMAIL);
  };

  const verifyUser = async () => {
    await get(`${API_ENDPOINT.FORGOT_PASSWORD}/${email}`)
      .then((verifyResponse) => {
        const id = verifyResponse.data.id;
        localStorage.setItem("userId", verifyResponse.data.id);
        localStorage.setItem("email", email);
        get(`${API_ENDPOINT.OTP_GENERATE}/${id}`)
          .then((otpResponse) => {
            const otp = otpResponse?.data?.otp;
            console.log(otp);
            notification.success({
              message: "success",
              description: MESSAGES.OTP_GENERATE,
            });
            navigate("/OtpVerification");
          })
          .catch(() => {
            notification.error({
              message: "error",
              description: MESSAGES.OTP_VERIFICATION_FAILED,
            });
          });
      })
      .catch(() => {
        notification.error({
          message: "error",
          description: MESSAGES.ERROR_VERIFY_USER,
        });
      });
  };

  const handleSubmit = () => {
    if (!email) {
      setEmailError(MESSAGES.EMAIL_REQUIRED);
    } else {
      verifyUser();
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
          Forgot Password
        </Typography>

        <Typography className="text-8xl text-center text-gray-600 px-16 py-5">
          Enter the email address associated with your account and we’ll send an
          email with a confirmation to reset your password.
        </Typography>
        <Grid className="h-24 m-2 gap-2">
          <TextField
            type="text"
            label="Email ID"
            placeholder="Enter Email ID"
            errorMessage={emailError}
            onChange={validateEmail}
            showError={!!emailError}
          />
        </Grid>
      </Grid>

      {showAlertMessage.open && (
        <Grid className="m-2">
          <Alert severity={showAlertMessage.errorType}>
            {showAlertMessage.errorMessage}
          </Alert>
        </Grid>
      )}

      <Grid>
        <Typography
          variant="body2"
          sx={{ mt: 2, mb: 2 }}
          className="text-center"
        >
          Remember your password?{" "}
          <Link to="/login" className="text-[#E93E3A]">
            Log in
          </Link>
        </Typography>
        <Button name="Get OTP" onClick={handleSubmit} />
      </Grid>
    </Grid>
  );
};

export default ForgotPassword;

import { Box, Grid, Typography } from "@mui/material";
import { useState } from "react";
const volisiLogo = "/src/Assets/images/Volisi_logo.svg";
import Button from "../../../components/core/Button";
import { Link, useNavigate } from "react-router-dom";
import TextFields from "../../../components/core/TextField";
import { API_ENDPOINT, MESSAGES, REGEX } from "../../../constants/constants";
import useAxios from "../../../app/hooks/useAxios";
import { notification } from "antd";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const { post } = useAxios();

  const navigate = useNavigate();

  const emailVerification = (event) => {
    setEmail(event.target.value);
    setEmailError(REGEX.EMAIL.test(event.target.value) ? "" : MESSAGES.EMAIL);
  };

  const passwordVerification = (event) => {
    setPassword(event.target.value);
    setPasswordError(
      REGEX.PASSWORD.test(event.target.value) ? "" : MESSAGES.PASSWORD
    );
  };

  const confirmPasswordVerification = (event) => {
    setConfirmPassword(event.target.value);
    setConfirmPasswordError(
      event.target.value !== password ? MESSAGES.CONFIRM_PASSWORD : ""
    );
  };

  const registerUser = async () => {
    await post(API_ENDPOINT.USERS, {
      username: email,
      email,
      password,
    })
      .then(() => {
        notification.success({
          message: "success",
          description: MESSAGES.REGISTER_SUCCESS,
        });
        navigate("/login");
      })
      .catch((error) => {
        if (error.response.data.resultCode == 1101) {
          notification.error({
            message: "error",
            description: MESSAGES.REGISTER_ERROR,
          });
        }
      });
  };

  const handleOnClickRegister = async (event) => {
    event.preventDefault();
    if (!email) {
      setEmailError(MESSAGES.EMAIL_REQUIRED);
    }
    if (!password) {
      setPasswordError(MESSAGES.PASSWORD_REQUIRED);
    }
    if (!emailError && !passwordError && !confirmPasswordError) {
      registerUser();
    }
  };
  return (
    <Grid
      container
      component="main"
      flexDirection={"column"}
      className="px-[90px] justify-between"
    >
      <Grid container justifyContent={"center"}>
        <Box component="img" alt="Volisi Logo" src={volisiLogo} />
      </Grid>
      <Grid>
        <Typography
          component="h1"
          margin={4}
          fontWeight={600}
          fontSize={"2rem"}
          className="text-center"
        >
          Create New Account
        </Typography>
        <TextFields
          placeholder="Enter Email ID"
          type="text"
          label="Email ID"
          onChange={emailVerification}
          errorMessage={emailError}
          showError={!!emailError}
        />
        <TextFields
          placeholder="Enter Password"
          type="password"
          label="Password"
          showPasswordTooltip
          errorMessage={passwordError}
          onChange={passwordVerification}
          showError={!!passwordError}
        />
        <TextFields
          placeholder="Enter Password"
          type="password"
          label="Confirm Password"
          showPasswordTooltip
          errorMessage={confirmPasswordError}
          onChange={confirmPasswordVerification}
          showError={!!confirmPasswordError}
        />
      </Grid>
      <Grid>
        <Typography
          variant="body2"
          sx={{ mt: 2, mb: 2 }}
          className="text-center"
        >
          Already have an account?{" "}
          <Link to="/login" className="text-[#E93E3A]">
            Log In
          </Link>
        </Typography>
        <Button name="Register" type="submit" onClick={handleOnClickRegister} />
      </Grid>
    </Grid>
  );
};

export default Register;

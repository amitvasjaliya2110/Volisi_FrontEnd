/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react/no-unescaped-entities */
import { Grid, Box, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import TextFields from "../../../components/core/TextField";
import Button from "../../../components/core/Button";
import useAxios from "../../../app/hooks/useAxios";
const volisiLogo = "/src/Assets/images/Volisi_logo.svg";
import { REGEX, MESSAGES, API_ENDPOINT } from "../../../constants/constants";
import { notification } from "antd";
import VolisiContext from "../../../app/contexts/VolisiContext";

const Login = () => {
  const navigate = useNavigate();
  const { post } = useAxios();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const { fetchFolders } = useContext(VolisiContext);

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
    setEmailError(REGEX.EMAIL.test(event.target.value) ? "" : MESSAGES.EMAIL);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
    setPasswordError(
      REGEX.PASSWORD.test(event.target.value) ? "" : MESSAGES.PASSWORD
    );
  };

  const handleLogin = async (event) => {
    event.preventDefault();

    if (!email) setEmailError(MESSAGES.EMAIL_REQUIRED);
    if (!password) setPasswordError(MESSAGES.PASSWORD_REQUIRED);
    if (!emailError && !passwordError && email && password) {
      await post(API_ENDPOINT.LOGIN, {
        username: email,
        password: password,
      })
        .then((response) => {
          const data = response.data;
          localStorage.setItem("userId", data.userId);
          localStorage.setItem("userName", data.username);
          localStorage.setItem("token", data.token);
          localStorage.setItem("tokenExpiryTime", data.tokenExpiryTime);
          fetchFolders();
          navigate("/library");
        })
        .catch(() => {
          notification.error({
            message: "Error",
            description: MESSAGES.LOGIN_ERROR,
          });
        });
    }
  };

  return (
    <Grid
      container
      component="main"
      flexDirection="column"
      className="h-[95%] px-[90px] justify-between "
    >
      <Grid container justifyContent={"center"}>
        <Box component="img" alt="Volisi Logo" src={volisiLogo} />
      </Grid>
      <Grid>
        <Typography
          margin="24px 24px 34px 24px"
          fontSize="32px"
          fontWeight="600"
          className="text-center h-9"
        >
          Login
        </Typography>
      </Grid>
      <Grid>
        <TextFields
          placeholder="Enter Email ID"
          type="email"
          label="Email ID"
          value={email}
          onChange={handleEmailChange}
          showError={!!emailError}
          errorMessage={emailError}
        />
        <TextFields
          placeholder="Enter Password"
          type="password"
          label="Password"
          showPasswordTooltip="true"
          showForgotPassword="true"
          value={password}
          onChange={handlePasswordChange}
          showError={!!passwordError}
          errorMessage={passwordError}
        />
      </Grid>
      <Grid>
        <Typography
          variant="body2"
          sx={{ mt: 2, mb: 2 }}
          className="text-center"
        >
          Don't have an account?{" "}
          <Link to="/register" style={{ color: "#E93E3A" }}>
            Register
          </Link>
        </Typography>
        <Button name="Login" onClick={handleLogin}></Button>
      </Grid>
    </Grid>
  );
};

export default Login;

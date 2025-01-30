import { useState } from "react";
import { Box, Grid, Typography } from "@mui/material";
import Button from "../../../components/core/Button";
import TextFields from "../../../components/core/TextField";
import { useNavigate } from "react-router-dom";
import { REGEX, MESSAGES, API_ENDPOINT } from "../../../constants/constants";
import useAxios from "../../../app/hooks/useAxios";
import { notification } from "antd";

const volisiLogo = "/src/Assets/images/Volisi_logo.svg";

const CreateNewPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");

  const navigate = useNavigate();
  const { patch } = useAxios();

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setPasswordError(
      REGEX.PASSWORD.test(e.target.value) ? "" : MESSAGES.PASSWORD
    );
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
    setConfirmPasswordError(
      e.target.value === password ? "" : MESSAGES.CONFIRM_PASSWORD
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!password) setPasswordError(MESSAGES.PASSWORD_REQUIRED);
    if (!confirmPassword) setConfirmPasswordError(MESSAGES.PASSWORD_REQUIRED);

    if (
      password &&
      confirmPassword &&
      !passwordError &&
      !confirmPasswordError
    ) {
      const userId = localStorage.getItem("userId");
      await patch(`${API_ENDPOINT.USERS}/${userId}`, {
        password,
      })
        .then(() => {
          notification.success({
            message: "Success",
            description: "Password change successfully",
          });
          localStorage.clear();
          navigate("/login");
        })
        .catch(() => {
          notification.error({
            message: "Error",
            description: "Something went wrong",
          });
        });
    }
  };

  return (
    <Grid
      container
      component="main"
      direction="column"
      sx={{ height: "75%" }}
      className="px-[90px] justify-between h-screen"
    >
      <Grid container justifyContent="center">
        <Box component="img" alt="Volisi Logo" src={volisiLogo} />
      </Grid>
      <Grid>
        <Typography
          component="h1"
          variant="h6"
          fontWeight="600"
          fontSize="32px"
          margin={1}
          className="text-center"
        >
          Create New Password
        </Typography>
      </Grid>
      <Grid>
        <TextFields
          label="New Password"
          type="password"
          placeholder="Enter New Password"
          value={password}
          onChange={handlePasswordChange}
          className="mb-3"
          showPasswordTooltip={true}
          showError={!!passwordError}
          errorMessage={passwordError}
        />
        <TextFields
          label="Confirm New Password"
          type="password"
          placeholder="Confirm New Password"
          value={confirmPassword}
          onChange={handleConfirmPasswordChange}
          className="mb-3"
          showError={!!confirmPasswordError}
          errorMessage={confirmPasswordError}
        />
      </Grid>
      <Grid>
        <Button
          name="Submit"
          onClick={handleSubmit}
          className="bg-blue-500"
          disabled={!!passwordError || !!confirmPasswordError}
        />
      </Grid>
    </Grid>
  );
};

export default CreateNewPassword;

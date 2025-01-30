import { Grid, Typography } from "@mui/material";
import { useState } from "react";
import TextFields from "../../../components/core/TextField";
import Button from "../../../components/core/Button";
import { MESSAGES, REGEX, API_ENDPOINT } from "../../../constants/constants";
import { useNavigate } from "react-router-dom";
import useAxios from "../../../app/hooks/useAxios";

const ChangePassword = () => {
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
  const email = localStorage.getItem("userName");
  const handleSave = async (e) => {
    const userId = localStorage.getItem("userId");
    e.preventDefault();

    if (!password) setPasswordError(MESSAGES.PASSWORD_REQUIRED);
    if (!confirmPassword) setConfirmPasswordError(MESSAGES.PASSWORD_REQUIRED);

    if (
      password &&
      confirmPassword &&
      !passwordError &&
      !confirmPasswordError
    ) {
      try {
        const response = await patch(`${API_ENDPOINT.USERS}/${userId}`, {
          password,
        });
        if (response && response.resultCode === 1001) {
          navigate("/library");
        }
      } catch (error) {
        console.error("Failed to change password:", error);
      }
    }
  };

  return (
    <Grid component="main" className="ml-[24px] mt-[14px]">
      <Typography fontSize="32px" fontWeight="700" sx={{ marginBottom: 2 }}>
        Change Password
      </Typography>
      <Grid>
        <TextFields
          disabled
          sx={{
            width: "350px",
            borderRadius: "8px",
            background: "#A1A1AA",
            "& .MuiInputBase-input.Mui-disabled": {
              WebkitTextFillColor: "#FFFFFF",
              "&::placeholder": {
                color: "#FFFFFF",
              },
            },
          }}
          placeholder={email}
          label="Email ID"
        />
        <Grid className="flex flex-row gap-8">
          <TextFields
            sx={{ width: "350px" }}
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
            sx={{ width: "350px" }}
            label="Confirm New Password"
            type="password"
            placeholder="Confirm New Password"
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
            className="mb-3"
            showPasswordTooltip={true}
            showError={!!confirmPasswordError}
            errorMessage={confirmPasswordError}
          />
        </Grid>
        <Grid className="flex flex-row gap-4">
          <Button
            variant="outlined"
            sx={{
              height: "48px",
              borderColor: "#71717A",
            }}
            backgroundColor="#FFFFFF"
            fontColor="#000000"
            name="Cancel"
            width="144px"
            onClick={() => navigate("/library")}
          />
          <Button
            sx={{ height: "48px" }}
            name="Save"
            width="144px"
            onClick={handleSave}
          />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default ChangePassword;

/* eslint-disable react/prop-types */
import { useState } from "react";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import PasswordSuggestion from "./PasswordSuggestion";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import { Link } from "react-router-dom";

const TextFields = (props) => {
  const {
    className,
    placeholder,
    onChange,
    type,
    errorMessage,
    label,
    showError,
    showPasswordTooltip,
    showForgotPassword,
    ...otherProps
  } = props;

  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Grid marginBottom={3}>
      {label && (
        <Typography
          variant="body"
          component="div"
          style={{ marginBottom: "0.5rem" }}
        >
          {label}
          {showPasswordTooltip && <PasswordSuggestion />}
        </Typography>
      )}
      <TextField
        className={className}
        placeholder={placeholder}
        fullWidth
        onChange={onChange}
        type={type === "password" ? (showPassword ? "text" : "password") : type}
        InputProps={{
          endAdornment:
            type === "password" ? (
              <InputAdornment position="end">
                <IconButton onClick={handleClickShowPassword} edge="end">
                  {showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            ) : null,
        }}
        {...otherProps}
      />
      <Grid container justifyContent="space-between" alignItems="center">
        <Grid item>
          {showError && errorMessage && (
            <Typography
              variant="body2"
              style={{
                fontSize: "14px",
                fontWeight: "400",
                color: "#EF4444",
                padding: "0px 4px",
              }}
            >
              {errorMessage}
            </Typography>
          )}
        </Grid>
        <Grid item>
          {showForgotPassword && (
            <Typography
              variant="body2"
              sx={{ textAlign: "right", fontSize: "12px", color: "#E93E3A" }}
            >
              <Link to="/forgot-password">Forgot Password?</Link>
            </Typography>
          )}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default TextFields;

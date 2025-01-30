import React from "react";
import { Box, Typography } from "@mui/material";
import { styled } from "@mui/system";
import ErrorImage from "../assets/images/ErrorImage.png";
import Button from "../components/core/Button";
import Logo from "../assets/icons/Volisi_logo.svg";
import { useNavigate } from "react-router-dom";

const Container = styled(Box)({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  position: "relative",
  overflow: "hidden",
  background: "linear-gradient(135deg, ##F89E88, ##F89E88)",
});

const Image = styled("img")({
  width: "50%",
  maxWidth: "380px",
  marginBottom: "50px",
});

const LogoContainer = styled(Box)({
  position: "absolute",
  top: "20px",
  left: "20px",
  width: "156px",
});

const NotFound = () => {
  const navigate = useNavigate();
  return (
    <Container padding="10px">
      <LogoContainer>
        <img src={Logo} alt="Volisi logo" />
      </LogoContainer>
      <Image src={ErrorImage} alt="404 Error" />
      <Typography variant="h4" fontSize={"50px"} fontWeight={"700"} margin={0}>
        404-error
      </Typography>
      <Typography variant="h6" component="h2" gutterBottom>
        Page not found
      </Typography>
      <Typography variant="body1" fontSize={"14px"} color={"#71717A"}>
        The Page you are looking for is not found!
      </Typography>
      <Button
        sx={{
          height: "38px",
          padding: "8px 16px",
          marginTop: "20px",
        }}
        name="Back to home"
        width="300px"
        onClick={() => {
          navigate("/library");
        }}
      />
    </Container>
  );
};

export default NotFound;

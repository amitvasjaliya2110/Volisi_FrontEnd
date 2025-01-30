/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { Box, Grid, Typography } from "@mui/material";
import { styled } from "@mui/system";
import theme1 from "./../../assets/images/theme/theme1.svg";

const Background = styled(Box)(({ backgroundImage }) => ({
  backgroundImage: `url(${backgroundImage})`,
  backgroundSize: "cover",
  backgroundPosition: "center",
  height: "100vh",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const staticData = {
  answersLabel: "Answers",
  timeLimitLabel: "Time Limit",
  answersCount: 6,
  questionsLabel: "Questions",
  questionsCount: 2,
  totalQuestions: 10,
};

function PlayerQuizLayout(props) {
  const {
    answersLabel,
    timeLimitLabel,
    answersCount,
    questionsLabel,
    questionsCount,
    totalQuestions,
  } = staticData;

  const [timeLeft, setTimeLeft] = useState(30);

  useEffect(() => {
    if (timeLeft === 0) return;
    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes < 10 ? "0" : ""}${minutes}:${
      secs < 10 ? "0" : ""
    }${secs}`;
  };

  return (
    <Background
      backgroundImage={theme1}
      className="h-screen overflow-hidden"
      sx={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Grid
        container
        justifyContent="space-between"
        alignItems="center"
        sx={{
          backgroundColor: "#FEF3E7",
          borderRadius: "0px 00px 28px 28px",
          top: "0px",
        }}
      >
        <Grid
          container
          justifyContent="space-between"
          alignItems="center"
          sx={{
            display: "flex",
            flexDirection: "row",
            padding: "8px 36px 0px 24px",
          }}
        >
          <Typography variant="body2" color="#3F3F46" fontSize={18}>
            {answersLabel}
          </Typography>
          <Typography variant="body2" color="#3F3F46" fontSize={18}>
            {timeLimitLabel}
          </Typography>
        </Grid>
        <Grid
          container
          justifyContent="space-between"
          alignItems="center"
          sx={{
            display: "flex",
            flexDirection: "row",
            padding: "0px 24px",
          }}
        >
          <Typography variant="h3" color="#E93E3A">
            {answersCount}
          </Typography>
          <Typography variant="h3" color="#E93E3A">
            {formatTime(timeLeft)}
          </Typography>
        </Grid>
      </Grid>

      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        flex={1}
        width="100%"
      >
        <Grid container justifyContent="center">
          <Grid item xs={12} className="flex">
            {props.PageComponent}
          </Grid>
        </Grid>
      </Box>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        borderRadius="12px"
        bgcolor="#FEF3E70F"
        width="164px"
        height="32px"
        position="fixed"
        bottom="24px"
        right="16px"
        zIndex="1000"
      >
        <Typography variant="h6" color="#FFFFFF" fontSize={16}>
          {questionsLabel}:{questionsCount}/{totalQuestions}
        </Typography>
      </Box>
    </Background>
  );
}

export default PlayerQuizLayout;

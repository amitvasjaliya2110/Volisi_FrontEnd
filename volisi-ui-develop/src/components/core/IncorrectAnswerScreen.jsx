import { Box, Grid, Typography } from "@mui/material";
import InorrectAnswer from "../../assets/icons/IncorrectAnswer.svg";

const IncorrectAnswerScreen = () => (
  <Box
    sx={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "80vh",
    }}
  >
    <Box
      sx={{
        width: 244,
        height: 225,
        borderRadius: 8,
        bgcolor: "#FFFFFF",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 1,
      }}
    >
      <Grid container direction="column" alignItems="center">
        <Grid item>
          <Typography
            sx={{
              fontSize: 32,
              fontWeight: 700,
              color: "#6F0B2B",
            }}
          >
            Incorrect
          </Typography>
        </Grid>
        <Grid item padding={1}>
          <img src={InorrectAnswer} alt="Incorrect Answer Icon" />
        </Grid>
        <Grid item>
          <Typography
            sx={{
              fontSize: 24,
              fontWeight: 700,
              color: "#6F0B2B",
            }}
          >
            Points: +00
          </Typography>
        </Grid>
      </Grid>
    </Box>
  </Box>
);

export default IncorrectAnswerScreen;

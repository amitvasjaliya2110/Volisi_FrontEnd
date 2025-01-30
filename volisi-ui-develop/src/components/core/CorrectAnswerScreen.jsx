import { Box, Grid, Typography } from "@mui/material";
import CorrectAnswer from "../../assets/icons/CorrectAnswer.svg";

const points = 230;
const CorrectAnswerScreen = () => (
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
            Correct
          </Typography>
        </Grid>
        <Grid item padding={1}>
          <img src={CorrectAnswer} alt="Correct Answer Icon" />
        </Grid>
        <Grid item>
          <Typography
            sx={{
              fontSize: 24,
              fontWeight: 700,
              color: "#6F0B2B",
            }}
          >
            Points: +{points}
          </Typography>
        </Grid>
      </Grid>
    </Box>
  </Box>
);

export default CorrectAnswerScreen;

/* eslint-disable react/prop-types */
import { Box, Grid } from "@mui/material";
import { styled } from "@mui/system";
import theme1 from "../../assets/images/theme/theme1.svg";
const volisiLogo = "/src/Assets/images/Volisi_logo.svg";

const Background = styled(Box)(({ backgroundImage }) => ({
  backgroundImage: `url(${backgroundImage})`,
  backgroundSize: "cover",
  backgroundPosition: "center",
  height: "100vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
}));

function PlayerViewLayout(props) {
  return (
    <Background
      backgroundImage={theme1}
      className="h-screen overflow-hidden"
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <Grid>
        <Grid
          container
          sx={{ justifyContent: "center", alignItems: "center", paddingTop: 3 }}
        >
          <Box component="img" alt="Volisi Logo" src={volisiLogo} />
        </Grid>
        <Grid item xs={10} className="flex h-full">
          {props.PageComponent}
        </Grid>
      </Grid>
    </Background>
  );
}

export default PlayerViewLayout;

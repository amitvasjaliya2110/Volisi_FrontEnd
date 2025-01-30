import { CircularProgress, Grid } from "@mui/material";

const Loader = () => {
  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      className="h-screen"
    >
      <CircularProgress disableShrink />
    </Grid>
  );
};

export default Loader;

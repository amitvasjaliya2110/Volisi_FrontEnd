import Box from "@mui/material/Box";
import Grid from "@mui/material/Unstable_Grid2";
import Button from "../components/core/Button";

export default function ButtonLayout() {
  return (
    <Box>
      <Grid container spacing={2}>
        <Grid xs={8}>
          <Button
            name="login"
            backgroundColor="#FEF3E7"
            fontColor="#000000"
            width="100px"
          />
        </Grid>
        <Grid xs={4}>
          <Button name="register" />
        </Grid>
        <Grid xs={4}>
          <Button name="login" backgroundColor="#FEF3E7" fontColor="#000000" />
        </Grid>
        <Grid xs={8}>
          <Button name="register" />
        </Grid>
      </Grid>
    </Box>
  );
}

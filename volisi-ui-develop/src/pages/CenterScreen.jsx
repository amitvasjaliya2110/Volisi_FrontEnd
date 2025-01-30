import { Container, Grid, Typography } from "@mui/material";
import React from "react";
import CardComponent from "./CardComponent";
import quiz from "../assets/images/quiz.svg";
import player from "../assets/images/player.svg";
import report from "../assets/images/report.svg";
import {
  ONBOARD_SCREEN_DESCRIPTION,
  ONBOARD_SCREEN_TITLE,
} from ".././constants/constants";
import Button from "../components/core/Button";

const Centerscreen = () => {
  return (
    <>
      <Container maxWidth={"lg"} style={{ margin: "75px auto" }}>
        <Grid>
          <Grid>
            <Typography
              sx={{
                fontSize: { xs: 20, sm: 35, md: 54 },
                fontWeight: 900,
                lineHeight: "45px",
                textAlign: "center",
                marginTop: "133.5px",
              }}
            >
              {ONBOARD_SCREEN_TITLE.title}
            </Typography>
          </Grid>
          <Grid sx={{ padding: "0 125px", margin: "24px 0 0" }}>
            <Typography
              sx={{
                fontSize: { xs: 15, sm: 15, md: 19 },
                fontWeight: 400,
                lineHeight: "30px",
                textAlign: "center",
              }}
            >
              {ONBOARD_SCREEN_DESCRIPTION.description}
            </Typography>
          </Grid>
        </Grid>
        <Grid
          container
          direction="row"
          sx={{
            margin: "32px 0",
            flexWrap: "wrap",
            justifyContent: "center",
            marginBottom: "60px",
          }}
        >
          <CardComponent
            image={quiz}
            title={ONBOARD_SCREEN_TITLE.quizTitle}
            description={ONBOARD_SCREEN_DESCRIPTION.quizDescription}
          />
          <CardComponent
            image={player}
            title={ONBOARD_SCREEN_TITLE.codeTitle}
            description={ONBOARD_SCREEN_DESCRIPTION.codeDescription}
          />
          <CardComponent
            image={report}
            title={ONBOARD_SCREEN_TITLE.reportTitle}
            description={ONBOARD_SCREEN_DESCRIPTION.reportDescription}
          />
        </Grid>
        <Grid container direction="row" justifyContent="center">
          <Button
            name="Let's Start"
            width="220px"
            sx={{ height: "48px", padding: "8px 16px", borderRadius: "12px" }}
          />
        </Grid>
      </Container>
    </>
  );
};

export default Centerscreen;

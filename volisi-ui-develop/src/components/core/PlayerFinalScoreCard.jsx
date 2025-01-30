import React from "react";
import { Grid, Typography, Box, Button } from "@mui/material";
import { scoreboardData } from "../../util/jsonData";
import { useNavigate } from "react-router-dom";

const PlayerFinalScoreCard = () => {
  const navigate = useNavigate();

  const getTextColor = (index) => {
    switch (index) {
      case 0:
        return "#E93E3A";
      case 1:
        return "#C82A34";
      case 2:
        return "#7A700B";
      default:
        return "#71717A";
    }
  };
  const getBackGroundColor = (index) => {
    switch (index) {
      case 0:
        return "#FEF3E7";
      case 1:
        return "#FDE5D7";
      case 2:
        return "#FFF8E0";
      default:
        return "#FAFAFA";
    }
  };

  return (
    <Grid
      sx={{
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position: "relative",
      }}
    >
      <Grid
        container
        direction="row"
        alignItems="flex-start"
        sx={{
          position: "absolute",
          width: "820px",
          maxHeight: "500px",
          top: "100px",
          padding: "8px",
          gap: "6px",
          overflowY: "auto",
          "&::-webkit-scrollbar": { display: "block" },
          "-ms-overflow-style": "none",
          "scrollbar-width": "none",
        }}
      >
        {scoreboardData.map((item, index) => (
          <Grid
            container
            key={index}
            sx={{
              width: "800px",
              height: "50px",
              padding: "0px 20px 0px 0px",
              gap: "10px",
              borderRadius: "4px",
              background: getBackGroundColor(index),
            }}
          >
            <Grid
              container
              justifyContent="center"
              alignItems="center"
              sx={{ width: "50px", height: "100%" }}
            >
              <Typography
                variant="h1"
                sx={{
                  fontSize: "22px",
                  fontWeight: 700,
                  textAlign: "center",
                  color: getTextColor(index),
                }}
              >
                {item.rank}
              </Typography>
            </Grid>

            <Box boxShadow="0px 2px 0px 2px rgba(0, 0.5, 0, 0.05)">
              <Grid
                container
                justifyContent="center"
                alignItems="center"
                sx={{ width: "60px", height: "100%" }}
              >
                <Typography
                  variant="h1"
                  sx={{
                    fontSize: "22px",
                    fontWeight: 700,
                    textAlign: "center",
                    color: getTextColor(index),
                  }}
                >
                  {item.name.charAt(0)}
                </Typography>
              </Grid>
            </Box>

            <Grid
              container
              alignItems="center"
              sx={{ width: "570px", height: "100%", paddingLeft: "20px" }}
            >
              <Typography
                variant="h1"
                sx={{
                  fontSize: "22px",
                  fontWeight: 700,
                  textAlign: "left",
                  color: getTextColor(index),
                }}
              >
                {item.name}
              </Typography>
            </Grid>

            <Grid
              container
              justifyContent="center"
              alignItems="center"
              sx={{ width: "50px", height: "100%" }}
            >
              <Typography
                variant="h1"
                sx={{
                  fontSize: "22px",
                  fontWeight: 700,
                  textAlign: "left",
                  color: getTextColor(index),
                }}
              >
                {item.points}
              </Typography>
            </Grid>
          </Grid>
        ))}
      </Grid>
      <Grid sx={{ position: "absolute", bottom: "20px", right: "20px" }}>
        <Button
          sx={{
            height: "38px",
            width: "110px",
            marginRight: "20px",
            fontFamily: "Visby Round CF",
            fontSize: "20px",
            fontWeight: 500,
            textAlign: "center",
            color: "#FAFAFA",
            background: "#E93E3A",
            "&:hover": {
              background: "#E93E3A",
            },
          }}
          onClick={() => navigate("/library")}
        >
          Home
        </Button>
      </Grid>
    </Grid>
  );
};

export default PlayerFinalScoreCard;

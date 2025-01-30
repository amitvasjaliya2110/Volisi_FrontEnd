import React from "react";
import { Grid, Typography } from "@mui/material";
import first from "../../assets/images/first.svg";
import second from "../../assets/images/second.svg";
import third from "../../assets/images/third.svg";

const WinnerRankCard = () => {
  return (
    <>
      <Grid
        container
        justifyContent="center"
        alignItems="flex-end"
        style={{
          width: "70%",
          height: "70%",
          bottom: "0px",
          gap: "0px",
          position: "fixed",
        }}
      >
        <Grid
          item
          xs={4}
          style={{
            maxWidth: "300px",
            height: "600px",
            bottom: "0px",
            gap: "0px",
            borderRadius: "175px 175px 0px 0px",
            backgroundColor: "rgba(255, 242, 204, 1)",
            position: "relative",
          }}
        >
          <img
            src={second}
            alt="Rank 2"
            style={{
              position: "absolute",
              top: "-50px", // Adjust this value to position the image as needed
              left: "50%",
              transform: "translateX(-50%)",
              width: "265px", // Adjust the width as needed
              height: "auto", // Maintain aspect ratio
            }}
          />
          <Typography
            style={{
              width: "189px",
              height: "96px",
              position: "absolute",
              bottom: "50%",
              left: "20%",
              gap: "0px",
              fontSize: "80px",
              fontWeight: "700",
              lineHeight: "96px",
              textAlign: "center",
              color: "rgba(255, 152, 0, 1)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            Jane
          </Typography>
          <Typography
            sx={{
              width: "72px",
              height: "36px",
              position: "absolute",
              bottom: "45%",
              left: "40%",
              gap: "0px",
              fontSize: "32px",
              fontWeight: "700",
              lineHeight: "36px",
              textAlign: "center",
              color: "rgba(122, 52, 0, 1)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            1500
          </Typography>
        </Grid>
        <Grid
          item
          xs={4}
          style={{
            maxWidth: "300px",
            zIndex: "5",
            height: "650px",
            gap: "0px",
            borderRadius: "175px 175px 0px 0px",
            background: "rgba(253, 229, 215, 1)",
            position: "relative",
            bottom: "0px",
            boxShadow: `
                 0px 18px 40px 0px rgba(0, 0, 0, 0.1),
                 0px 73px 73px 0px rgba(0, 0, 0, 0.09),
                 0px 165px 99px 0px rgba(0, 0, 0, 0.05),
                 0px 293px 117px 0px rgba(0, 0, 0, 0.01),
                 0px 459px 128px 0px rgba(0, 0, 0, 0)
                 `,
          }}
        >
          <img
            src={first}
            alt="Rank 2"
            style={{
              position: "absolute",
              top: "-50px", // Adjust this value to position the image as needed
              left: "50%",
              transform: "translateX(-50%)",
              width: "265px", // Adjust the width as needed
              height: "auto", // Maintain aspect ratio
            }}
          />

          <Typography
            style={{
              width: "190px",
              height: "96px",
              position: "absolute",
              bottom: "50%",
              left: "20%",
              gap: "0px",
              fontSize: "80px",
              fontWeight: "700",
              lineHeight: "96px",
              textAlign: "center",
              color: "rgba(233, 62, 58, 1)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            John
          </Typography>
          <Typography
            sx={{
              width: "81px",
              height: "36px",
              position: "absolute",
              bottom: "45%",
              left: "40%",
              gap: "0px",
              fontSize: "32px",
              fontWeight: "700",
              lineHeight: "36px",
              textAlign: "center",
              color: "rgba(111, 11, 43, 1)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            2000
          </Typography>
        </Grid>
        <Grid
          item
          xs={4}
          style={{
            maxWidth: "300px",
            height: "550px",
            gap: "0px",
            borderRadius: "175px 175px 0px 0px",
            background: "rgba(255, 253, 215, 1)",
            position: "relative",
            bottom: "0px",
          }}
        >
          <img
            src={third}
            alt="Rank 2"
            style={{
              position: "absolute",
              top: "-50px", // Adjust this value to position the image as needed
              left: "50%",
              transform: "translateX(-50%)",
              width: "222px", // Adjust the width as needed
              height: "auto", // Maintain aspect ratio
            }}
          />
          <Typography
            sx={{
              width: "165px",
              height: "96px",
              position: "absolute",
              bottom: "50%",
              left: "20%",
              gap: "0px",
              fontSize: "80px",
              fontWeight: "700",
              lineHeight: "96px",
              textAlign: "center",
              color: "rgba(219, 207, 43, 1)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            Alex
          </Typography>

          <Typography
            sx={{
              width: "73px",
              height: "36px",
              position: "absolute",
              bottom: "45%",
              left: "40%",
              gap: "0px",
              fontSize: "32px",
              fontWeight: "700",
              lineHeight: "36px",
              textAlign: "center",
              color: "rgba(122, 112, 11, 1)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            1200
          </Typography>
        </Grid>
      </Grid>
    </>
  );
};

export default WinnerRankCard;

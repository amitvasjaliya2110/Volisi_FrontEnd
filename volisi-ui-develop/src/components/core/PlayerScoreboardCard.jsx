import React from "react";
import { Grid, Typography, Box, Button } from "@mui/material";

const PlayerScoreboardCard = () => {
  const scoreboardData = [
    { name: "John", points: 2000 },
    { name: "Alice", points: 1500 },
    { name: "Bob", points: 1800 },
    { name: "Williams", points: 1000 },
    { name: "Doe", points: 500 },
    { name: "Jane", points: 100 },
    { name: "Jane", points: 100 },
    { name: "Jane", points: 100 },
    { name: "Jane", points: 100 },
  ];
  const colorStyles = [
    {
      backgroundColor: "rgba(254, 243, 231, 1)",
      textColor: "rgba(233, 62, 58, 1)",
    },
    {
      backgroundColor: "rgba(253, 229, 215, 1)",
      textColor: "rgba(200, 42, 52, 1)",
    },
    {
      backgroundColor: "rgba(255, 248, 224, 1)",
      textColor: "rgba(122, 112, 11, 1)",
    },
    {
      backgroundColor: "rgba(250, 250, 250, 1)",
      textColor: "rgba(113, 113, 122, 1)",
    },
  ];

  return (
    <>
      <Grid
        container
        alignItems="center"
        style={{
          position: "absolute",
          width: "800px",
          height: "auto",
          top: "15%",
          padding: "8px",
          gap: "8px",
          // Example background, adjust as needed
        }}
      >
        {scoreboardData.map(
          (item, index) =>
            item &&
            item.name &&
            item.points !== undefined && (
              <Grid
                container
                key={index}
                style={{
                  width: "800px", // Fixed width
                  height: "50px", // Fixed height
                  padding: "0px 20px 0px 0px", // Padding
                  gap: "20px", // Gap between items
                  borderRadius: "4px", // Border radius
                  background:
                    colorStyles[index]?.backgroundColor ||
                    colorStyles[colorStyles.length - 1].backgroundColor, // Background color
                }}
              >
                <Box
                  boxShadow="4px 0px 4px rgba(0, 0, 0, 0.05)"
                  borderRadius={0.5}
                >
                  <Grid
                    container
                    justifyContent="center"
                    alignItems="center"
                    style={{
                      width: "60px", // Width set to hug content
                      height: "100%", // Height set to fill available space
                    }}
                  >
                    <Typography
                      variant="h1" // Set the variant to h1
                      style={{
                        fontSize: "24px", // Set the font size
                        fontWeight: 700, // Set the font weight
                        lineHeight: "28.8px", // Set the line height
                        textAlign: "center", // Set the text alignment
                        color:
                          colorStyles[index]?.textColor ||
                          colorStyles[colorStyles.length - 1].textColor, // Set the background color
                      }}
                    >
                      {item.name.charAt(0)}
                    </Typography>
                  </Grid>
                </Box>

                <Grid
                  container
                  alignItems="center"
                  style={{
                    width: "590px", // Width set to hug content
                    height: "100%", // Height set to fill available space
                  }}
                >
                  <Typography
                    variant="h1" // Set variant to h1
                    style={{
                      fontSize: "24px", // Set font size
                      fontWeight: 700, // Set font weight
                      lineHeight: "28.8px", // Set line height
                      textAlign: "left", // Set text align to left
                      color:
                        colorStyles[index]?.textColor ||
                        colorStyles[colorStyles.length - 1].textColor, // Set background color
                    }}
                  >
                    {item.name}
                  </Typography>
                </Grid>

                <Grid
                  container // Set container to true
                  justifyContent="center"
                  alignItems="center"
                  style={{ width: "70px", height: "100%" }} // Apply width, height, and opacity styles
                >
                  <Typography
                    variant="h1" // Set variant to h1
                    style={{
                      fontSize: "24px", // Set font size
                      fontWeight: 700, // Set font weight
                      lineHeight: "28.8px", // Set line height
                      textAlign: "left", // Set text align to left
                      color:
                        colorStyles[index]?.textColor ||
                        colorStyles[colorStyles.length - 1].textColor, // Set background color
                    }}
                  >
                    {item.points}
                  </Typography>
                </Grid>
              </Grid>
            )
        )}
      </Grid>

      <Grid
        container
        sx={{
          position: "absolute",
          width: "111px",
          height: "40px", // Fills available height
          gap: "22px",
          top: "550px",
          right: "36px",
        }}
      >
        <Button
          variant="contained"
          style={{
            backgroundColor: "red",
            color: "white",
            fontSize: "20px",
            fontWeight: 500,
            lineHeight: "24px",
            textAlign: "center",
            width: "111px",
            height: "40px",
            padding: "8px 16px",
            gap: "8px",
            borderRadius: "12px",
          }}
        >
          <Typography variant="h5">Next</Typography>
        </Button>
      </Grid>
    </>
  );
};
export default PlayerScoreboardCard;

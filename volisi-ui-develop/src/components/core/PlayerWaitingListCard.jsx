import React, { useMemo, useState } from "react";
import { Grid, Typography, IconButton, Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import Person2Icon from "@mui/icons-material/Person2";
import LockIcon from "@mui/icons-material/Lock";
import { Box } from "@mui/system";

const PlayerWaitingListCard = () => {
  const names = [
    "John",
    "Jane",
    "Doe",
    "Alice",
    "Bob",
    "Alice",
    "Doe",
    "Alice",
    "Williams",
    "John",
    "Jane",
    "Doe",
    "Alice",
    "Bob",
    "John",
    "Jane",
    "Doe",
    "Alice",
    "Bob",
    "John",
    "Williams",
    "Doe",
    "Alice",
    "Williams",
    "John",
    "Jane",
    "Doe",
    "Alice",
    "Bob",
    "Doe",
  ];
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const baseWidth = 547;
  const additionalWidth = Math.floor(names.length / 10) * 200;
  const totalWidth = baseWidth + additionalWidth;

  return (
    <>
      <Grid
        container
        position={"absolute"}
        justifyContent="center"
        alignItems="center"
        style={{
          overflowY: "auto",
          scrollbarWidth: "none",
          height: "420px",
          gap: "15px",
          maxWidth: `676px`,
          margin: "auto",
          // backgroundColor:"red",
          padding: "30px 0",
        }}>
        {names.slice(0, names.length).map((name, index) => (
          <Grid
            container
            justifyContent="center"
            alignItems="center"
            key={index}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
            style={{
              width: "auto",
              height: "40px",
              padding: "0px 20px 0px 0px",
              gap: "20px",
              borderRadius: "4px",
              background:
                hoveredIndex === index
                  ? "rgba(254, 243, 231, 1)"
                  : "rgba(255, 255, 255, 1)",
              marginBottom: "10px",
              cursor: "pointer",
            }}>
            <Grid
              container
              justifyContent="center"
              alignItems="center"
              style={{
                width: "40px",
                height: "40px",
                gap: "10px",
                borderRadius: "4px",
                background: "rgba(254, 243, 231, 1)",
                boxShadow:
                  hoveredIndex === index
                    ? "none"
                    : "1px 0px 4px 0px rgba(0, 0, 0, 0.25)",
              }}>
              {hoveredIndex === index ? (
                <IconButton>
                  <DeleteIcon style={{ color: "rgba(233, 62, 58, 1)" }} />
                </IconButton>
              ) : (
                <Grid
                  container
                  justifyContent="center"
                  alignItems="center"
                  style={{
                    width: "18px",
                    height: "29px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}>
                  <Typography
                    variant="h1"
                    align="center"
                    sx={{
                      fontSize: "24px",
                      fontWeight: 700,
                      lineHeight: "28.8px",
                      color: "rgba(233, 62, 58, 1)",
                    }}>
                    {name.charAt(0)}
                  </Typography>
                </Grid>
              )}
            </Grid>
            <Grid
              container
              style={{
                width: "auto",
                height: "29px",
                gap: "0px",
              }}>
              <Typography
                variant="h1"
                align="center"
                style={{
                  fontSize: "24px",
                  fontWeight: 700,
                  lineHeight: "28.8px",
                  textAlign: "center",
                  color: "rgba(233, 62, 58, 1)",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}>
                {name}
              </Typography>
            </Grid>
          </Grid>
        ))}
      </Grid>
      <Box
        position="fixed"
        bottom={20}
        right={20}
        display="flex"
        gap={2}
        alignItems="center"
        bgcolor="transparent"
        zIndex={"1"}
        sx={{ pointerEvents: "auto" }}>
        <Button
          variant="contained"
          sx={{
            width: "76px",
            height: "40px",
            padding: "8px",
            borderRadius: "12px",
            bgcolor: "rgba(254, 243, 231, 0.06)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}>
          <Person2Icon sx={{ color: "rgba(255, 255, 255, 1)", mr: 1 }} />
          <Typography
            variant="h6"
            sx={{
              fontSize: "24px",
              fontWeight: 700,
              color: "white",
            }}>
            {names.length}
          </Typography>
        </Button>

        <Button
          variant="contained"
          sx={{
            width: "56px",
            height: "40px",
            padding: "8px",
            borderRadius: "12px",
            bgcolor: "rgba(254, 243, 231, 0.1)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}>
          <LockIcon sx={{ color: "white" }} />
        </Button>

        <Button
          variant="contained"
          sx={{
            width: "111px",
            height: "40px",
            padding: "8px 16px",
            borderRadius: "12px",
            bgcolor: "red",
            color: "white",
            fontSize: "20px",
            fontWeight: 500,
          }}>
          <Typography variant="h5">Start</Typography>
        </Button>
      </Box>
    </>
  );
};

export default PlayerWaitingListCard;

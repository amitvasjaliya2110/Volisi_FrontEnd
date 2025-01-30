import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import React from "react";

const useStyles = makeStyles(() => ({
  heading: {
    fontWeight: 700,
    textAlign: "center",
  },
  image: {
    width: "325px",
    objectFit: "cover",
    margin: "auto",
    padding: "32px 65px 40px",
    borderRadius: "15px",
  },
}));

const CardComponent = ({ image, title, description }) => {
  const classes = useStyles();
  return (
    <>
      <Grid padding={"16px"}>
        <Card
          sx={{ width: 350, height: 395 }}
          style={{ alignContent: "center", borderRadius: "20px" }}
        >
          <CardActionArea>
            <CardMedia
              component="img"
              image={image}
              alt="Create Quiz"
              className={classes.image}
            />
            <CardContent sx={{ padding: 0, margin: "0 24px 32px" }}>
              <Typography
                gutterBottom
                variant="h5"
                component="div"
                sx={{
                  fontSize: "24px",
                  fontWeight: "700",
                  textAlign: "center",
                  lineHeight: "28.8px",
                }}
              >
                {title}
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{
                  fontSize: "14px",
                  fontWeight: "400",
                  textAlign: "center",
                  padding: "6px",
                  lineHeight: "20px",
                }}
              >
                {description}
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </Grid>
    </>
  );
};

export default CardComponent;

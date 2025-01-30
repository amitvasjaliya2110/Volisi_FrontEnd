import React, { useState, useEffect } from "react";
import { Container, Grid, IconButton, Typography } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import QuizDetail from "../../assets/images/QuizDetail.svg";
import Button from "../../components/core/Button";
import { API_ENDPOINT } from "../../constants/constants";
import useAxios from "../../app/hooks/useAxios";
import { useNavigate, useParams } from "react-router-dom";
import EditIcon from "../../assets/icons/EditIcon.svg";
import DeleteIcon from "../../assets/icons/DeleteIcon.svg";

const QuizDetailsScreen = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const { get } = useAxios();
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      await get(`${API_ENDPOINT.QUIZDETAIL}/${id}`, null, true)
        .then((response) => {
          const data = response.data;
          setName(data.name);
          setDescription(data.description);
        })
        .catch((error) => {
          console.log(error);
        });
    };
    fetchData();
  }, [id, get]);

  return (
    <Grid
      Container
      component="main"
      className="w-[1000px] h-[70%] left-[288px] p-[24px] gap-[20px]"
    >
      <Grid item xs={15} className="w-[1104px] h-[40px]">
        <IconButton
          className="w-[25px] h-[25px] mt-[7.38px]"
          onClick={() => navigate("/library")}
        >
          <ArrowBackIcon style={{ width: "30px", height: "30px" }} />
        </IconButton>
      </Grid>

      <Grid container spacing={2} className="w-[1104px] h-[877px]" gap={"36px"}>
        <Grid item xs={4} className="img-fluid rounded ">
          <img
            src={QuizDetail}
            alt="Quiz Detail"
            style={{ borderRadius: "15px" }}
          />
        </Grid>

        <Grid item xs={6} className="w-[588px] h-[877px]" marginTop={"15px"}>
          <Grid height={"232px"} gap={"30px"}>
            <Grid height={"72px"}>
              <Typography
                variant="h4"
                gutterBottom
                sx={{ fontSize: "28px", fontWeight: "600" }}
              >
                {name}
              </Typography>
            </Grid>

            <Grid
              container
              spacing={2}
              sx={{ marginTop: "-30px", flexDirection: "end" }}
              direction="row"
              width={"118%"}
            >
              <Grid item xs={6}>
                <Typography
                  variant="body1"
                  sx={{
                    color: "#52525B",
                    fontSize: "22px",
                    fontWeight: "500",
                  }}
                >
                  0 Play | 0 Players
                </Typography>
              </Grid>

              <Grid
                item
                xs={6}
                marginLeft={"0px"}
                width={"100%"}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "flex-end",
                  gap: "10px",
                }}
              >
                <img
                  src={EditIcon}
                  alt="Edit"
                  style={{
                    width: "25px",
                    height: "26px",
                    cursor: "pointer",
                  }}
                />
                <img
                  src={DeleteIcon}
                  alt="Delete"
                  style={{
                    width: "29px",
                    height: "30px",
                    cursor: "pointer",
                  }}
                />
              </Grid>
            </Grid>
            <Grid height={"48px"}>
              <Grid
                container
                spacing={2}
                sx={{ marginBottom: "20px", marginTop: "0.5rem" }}
              >
                <Grid item xs={6}>
                  <Button
                    variant="outlined"
                    width="250px"
                    sx={{
                      height: "48px",
                      borderColor: "#E93E3A",
                      mr: 2,
                    }}
                    backgroundColor="#FFFFFF"
                    fontColor="#E93E3A"
                    name="share code"
                  >
                    Share Code
                  </Button>
                </Grid>
                <Grid item xs={6}>
                  <Button
                    variant="contained"
                    width="250px"
                    sx={{
                      height: "48px",
                      bgcolor: "#000",
                      color: "#FFFFFF",
                      ml: 6,
                    }}
                    name="play solo"
                  >
                    Play Solo
                  </Button>
                </Grid>
              </Grid>
            </Grid>

            <Grid container spacing={2} sx={{ marginTop: "35px" }}>
              <Grid item xs={6}>
                <Typography
                  variant="h6"
                  gutterBottom
                  sx={{
                    fontSize: "20px",
                    fontWeight: "600",
                    lineHeight: "29px",
                    color: "#18181B",
                    marginBottom: 0,
                  }}
                >
                  Total Question:
                </Typography>
                <Typography
                  variant="body1"
                  sx={{
                    fontSize: "20px",
                    color: "#71717A",
                    fontWeight: "500",
                    marginTop: 0,
                  }}
                >
                  10 Question
                </Typography>
              </Grid>
              <Grid item xs={4}>
                <Typography
                  variant="h6"
                  gutterBottom
                  sx={{
                    fontSize: "20px",
                    fontWeight: "600",
                    lineHeight: "29px",
                    color: "#18181B",
                    marginBottom: "0",
                  }}
                >
                  Question type:
                </Typography>
                <Typography
                  variant="body1"
                  sx={{
                    fontSize: "20px",
                    fontWeight: "300",
                    whiteSpace: "nowrap",
                    color: "#71717A",
                    marginTop: 0,
                  }}
                >
                  5 MCQ | 5 True & False | 1 Slide
                </Typography>
              </Grid>
            </Grid>

            <Grid height={"62px"} gap={"8px"} sx={{ marginTop: "20px" }}>
              <Grid item xs={15}>
                <Typography
                  variant="h6"
                  gutterBottomsx
                  sx={{
                    fontSize: "20px",
                    fontWeight: "600",
                    lineHeight: "29px",
                    color: "#18181B",
                    marginBottom: 0,
                  }}
                >
                  Total Time:
                </Typography>
                <Typography
                  variant="body1"
                  sx={{
                    fontSize: "20px",
                    color: "#71717A",
                    fontWeight: "500",
                    marginTop: 0,
                  }}
                >
                  00:90 Seconds
                </Typography>
              </Grid>
            </Grid>

            <Grid height={"409px"} gap={"4px"} sx={{ marginTop: "20px" }}>
              <Grid item xs={10}>
                <Typography
                  variant="h6"
                  gutterBottom
                  sx={{
                    fontSize: "20px",
                    fontWeight: "600",
                    lineHeight: "29px",
                    color: "#18181B",
                    marginBottom: 0,
                  }}
                >
                  Description
                </Typography>
                <Typography
                  variant="body1"
                  sx={{
                    fontSize: "20px",
                    color: "#71717A",
                    fontWeight: "400",
                    marginTop: 0,
                  }}
                >
                  {description}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default QuizDetailsScreen;

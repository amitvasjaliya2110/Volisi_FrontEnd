/* eslint-disable no-unused-vars */
import { Typography, Grid, Paper } from "@mui/material";
import { useEffect, useState } from "react";
import useAxios from "../../app/hooks/useAxios";
import { API_ENDPOINT } from "../../constants/constants";

const id = 27;

const Details = () => {
  const titleStyle = { color: "#18181B" };
  const subtitleStyle = { color: "#71717A" };

  const [detailsData, setDetailsData] = useState([]);
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  const { get } = useAxios();

  const fetchData = async () => {
    try {
      const response = await get(
        `${API_ENDPOINT.PLAYER_QUIZ}/${id}`,
        null,
        true
      );
      const data = response.data;

      const details = [
        {
          label: "Start Time : ",
          value: new Date(data.startDateTime).toLocaleString(),
        },
        {
          label: "End Time : ",
          value: new Date(data.endDateTime).toLocaleString(),
        },
        {
          label: "Total Time : ",
          value: `${Math.floor(data.time / 60)} Minutes`,
        },
        {
          label: "Total Questions : ",
          value: `${data.totalQuestions} Questions`,
        },
        {
          label: "Question Type : ",
          value: `${data.playerQuizQuestionTypeCounts.length} Types`,
        },
        { label: "Number Of Players : ", value: data.players },
      ];
      setDetailsData(details);
      setDescription(data.quiz.description);
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (!detailsData) {
    setLoading(true);
  }

  return (
    <Grid
      container
      component={Paper}
      sx={{
        justifyContent: "space-between",
        width: "auto",
        margin: 2,
      }}
    >
      {detailsData?.map((item, index) => (
        <Grid
          key={index}
          item
          xs={12}
          sm={6}
          sx={{
            padding: "10px 10px 0px 10px",
          }}
        >
          <Typography variant="body2">
            <strong style={titleStyle}>{item.label}</strong>
            <span style={subtitleStyle}>{item.value}</span>
          </Typography>
        </Grid>
      ))}
      <Grid
        item
        xs={12}
        sx={{
          mt: 2,
          p: 2,
        }}
      >
        <Grid
          sx={{ borderTop: "1px dotted #D4D4D8", padding: "10px 0" }}
        ></Grid>
        <Typography variant="body2" fontSize="18px" color="#18181B">
          Description
        </Typography>
        <Typography variant="body2" color="#71717A">
          {description}
        </Typography>
      </Grid>
    </Grid>
  );
};

export default Details;

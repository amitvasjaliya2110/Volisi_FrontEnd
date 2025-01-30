/* eslint-disable no-unused-vars */
import {
  Box,
  Container,
  Grid,
  Typography,
  CircularProgress,
} from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import OnboardCard from "../library/OnboardCard.jsx";
import useAxios from "../../app/hooks/useAxios.js";
import { API_ENDPOINT } from "../../constants/constants.js";
import ReportQuiz from "../../pages/report/ReortQuiz.jsx";
function ReportQuizList() {
  const { post } = useAxios();
  const userId = localStorage.getItem("userId");
  const filterType = "report";

  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pageNo, setPageNo] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(4);

  const fetchQuizzes = async () => {
    setLoading(true);
    const payload = {
      page: pageNo,
      pageSize: rowsPerPage,
      name: "",
      userId,
      filterType,
    };
    await post(API_ENDPOINT.DASHBOARD_FILTER, payload, true)
      .then((response) => {
        setLoading(false);
        setQuizzes(response.data);
      })
      .catch((error) => {
        console.error("Error adding question:", error);
      });
  };

  useEffect(() => {
    fetchQuizzes();
  }, [pageNo, rowsPerPage, userId, filterType, post]);

  const groupedQuizzes = useMemo(() => {
    if (!Array.isArray(quizzes)) return {};

    const sortedQuizzes = [...quizzes].sort(
      (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
    );

    return sortedQuizzes.reduce((acc, quiz) => {
      const date = quiz.createdDate;
      if (!acc[date]) {
        acc[date] = [];
      }
      acc[date].push(quiz);
      return acc;
    }, {});
  }, [quizzes]);

  return (
    <Container
      maxWidth={false}
      style={{
        paddingLeft: 2,
        paddingRight: 20,
        height: "80vh",
        display: "flex",
        flexDirection: "column",
        marginTop: 10,
      }}
    >
      {loading ? (
        <Grid className="flex justify-center items-center h-full">
          <CircularProgress />
        </Grid>
      ) : Object.keys(groupedQuizzes).length > 0 ? (
        <>
          {Object.entries(groupedQuizzes).map(([date, quizzes]) => (
            <Grid key={date} style={{ marginBottom: 20 }}>
              <Typography
                className="text-2xl"
                sx={{ marginLeft: "12px", color: "#3F3F46" }}
              >
                {date}
              </Typography>
              <Box>
                {quizzes.map((quiz) => (
                  <ReportQuiz
                    key={quiz.id}
                    title={quiz.name}
                    plays={quiz.plays || 0}
                    id={quiz.id}
                  />
                ))}
              </Box>
            </Grid>
          ))}
        </>
      ) : (
        <Grid className="flex justify-center items-center h-full">
          <OnboardCard />
        </Grid>
      )}
    </Container>
  );
}

export default ReportQuizList;

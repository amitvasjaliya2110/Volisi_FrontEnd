import React, { useContext, useEffect, useState } from "react";
import { Container, Box, Grid, TablePagination, Stack } from "@mui/material";
import Quiz from "./Quiz";
import OnboardCard from "./OnboardCard";
import useAxios from "../../app/hooks/useAxios";
import { API_ENDPOINT } from "../../constants/constants";
import { CircularProgress } from "@mui/material";
import { useNavigate } from "react-router-dom";
import volisiContext from "../../app/contexts/VolisiContext";

const QuizList = () => {
  const [quiz, setQuiz] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pageNo, setPageNo] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(4);
  const [totalQuizzes, setTotalQuizzes] = useState(0);
  const { isMove, searchQuery } = useContext(volisiContext);
  const { post } = useAxios();
  const userId = localStorage.getItem("userId");
  const filterType = "quiz";
  const name = searchQuery;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchQuizzes = async () => {
      setLoading(true);
      const payload = {
        page: pageNo,
        pageSize: rowsPerPage,
        userId,
        filterType,
        name,
      };
      try {
        const response = await post(
          `${API_ENDPOINT.DASHBOARD_FILTER}`,
          payload,
          true
        );
        setQuiz(response.data);
        setTotalQuizzes(response.totalElements);
        setLoading(false);
        navigate("/library");
      } catch (error) {
        console.error("Error fetching quizzes:", error);
        setLoading(false);
      }
    };

    fetchQuizzes();
  }, [pageNo, rowsPerPage, userId, filterType, name, isMove]);

  useEffect(() => {
    setPageNo(0);
  }, [name]);

  const handlePageChange = (newPage) => {
    setPageNo(newPage);
  };

  const handleRowsPerPageChange = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPageNo(0);
  };

  if (loading) {
    return (
      <Container
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      >
        <CircularProgress color="inherit" />
      </Container>
    );
  }

  return (
    <Container
      maxWidth={false}
      style={{
        paddingLeft: 2,
        paddingRight: 20,
        height: "80vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        marginTop: 10,
      }}
    >
      {quiz.length > 0 ? (
        <>
          <Grid>
            {name !== "" && (
              <Box margin={"5px 0 0 20px"}>
                Showing Result For{" "}
                <span style={{ color: "#3B82F6" }}>{name}</span>
              </Box>
            )}
            <Box>
              {quiz.map((quiz, index) => (
                <Quiz
                  key={index}
                  title={quiz.name}
                  plays={quiz.plays || 0}
                  questions={quiz.questions || 0}
                  status={quiz.status}
                  id={quiz.id}
                  folderName={quiz.collection?.name}
                  coverImage={quiz.coverImage}
                />
              ))}
            </Box>
          </Grid>
          <Stack spacing={2}>
            <TablePagination
              component="div"
              count={totalQuizzes}
              page={pageNo}
              onPageChange={handlePageChange}
              rowsPerPage={rowsPerPage}
              onRowsPerPageChange={handleRowsPerPageChange}
              rowsPerPageOptions={[3, 4, 5]}
              sx={{
                marginTop: 2,
                padding: "25px",
                display: "flex",
                justifyContent: "center",
              }}
            />
          </Stack>
        </>
      ) : (
        <>
          {name !== "" && (
            <Box margin={"5px 0 0 20px"}>
              Showing Result For{" "}
              <span style={{ color: "#3B82F6" }}>{name}</span>
            </Box>
          )}
          <Grid className="flex justify-center items-center h-full">
            <OnboardCard />
          </Grid>
        </>
      )}
    </Container>
  );
};

export default QuizList;

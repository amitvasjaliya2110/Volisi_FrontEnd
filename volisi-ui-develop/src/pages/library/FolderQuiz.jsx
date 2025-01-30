/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import {
  Container,
  Box,
  Grid,
  TablePagination,
  Stack,
  IconButton,
  Typography,
} from "@mui/material";
import Quiz from "./Quiz";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import OnboardCard from "./OnboardCard";
import useAxios from "../../app/hooks/useAxios";
import { API_ENDPOINT } from "../../constants/constants";
import { CircularProgress } from "@mui/material";
import { useNavigate, useParams, useLocation } from "react-router-dom";

const FolderQuiz = () => {
  const { folderId } = useParams();
  const {
    state: { folderName },
  } = useLocation();
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pageNo, setPageNo] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(4);
  const [totalQuizzes, setTotalQuizzes] = useState(0);
  const { post } = useAxios();
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const payload = {
          collectionId: folderId,
          userId,
          pageNo,
          pageSize: rowsPerPage,
        };
        const response = await post(
          `${API_ENDPOINT.FOLDER_QUIZ}`,
          payload,
          true
        );
        if (response.data) {
          const { quizzes, totalQuizzes } = response.data;
          setQuizzes(quizzes);
          setTotalQuizzes(totalQuizzes);
        } else {
          console.error("No response data received.");
        }
      } catch (error) {
        console.error("Error fetching quizzes:", error);
        setQuizzes([]);
      } finally {
        setLoading(false);
      }
    };

    fetchQuizzes();
  }, [folderId, userId, pageNo, rowsPerPage, post]);

  const handlePageChange = (newPage) => {
    setPageNo(newPage);
  };

  const handleRowsPerPageChange = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPageNo(0);
  };

  const handleBack = () => {
    navigate("/folderlist");
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
    <>
      <Grid container sx={{ margin: 3 }}>
        <Grid item xs={12}>
          <Box display="flex" alignItems="center" sx={{ marginBottom: "30px" }}>
            <IconButton onClick={handleBack}>
              <ArrowBackIcon />
            </IconButton>
            <Typography variant="h6" sx={{ color: "#18181B", fontSize: 24 }}>
              {folderName}
            </Typography>
          </Box>
          <Container
            maxWidth={false}
            style={{
              paddingLeft: 2,
              paddingRight: 20,
              height: "70vh",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            {quizzes.length > 0 ? (
              <>
                <Box>
                  {quizzes.map((quiz, index) => (
                    <Quiz
                      key={index}
                      title={quiz.name}
                      plays={quiz.plays || 0}
                      questions={quiz.questions || 0}
                      status={quiz.status || "created"}
                      id={quiz.id}
                      coverImage={quiz.coverImage}
                    />
                  ))}
                </Box>
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
              <Grid className="flex justify-center items-center h-full">
                <OnboardCard />
              </Grid>
            )}
          </Container>
        </Grid>
      </Grid>
    </>
  );
};

export default FolderQuiz;

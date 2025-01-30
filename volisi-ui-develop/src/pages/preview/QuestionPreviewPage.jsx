import React, { useState, useEffect } from "react";
import backgroundImage from "../../assets/images/theme/theme1.svg";
import {
  Grid,
  Typography,
  Box,
  Checkbox,
  Radio,
  IconButton,
  TextField,
} from "@mui/material";
import TimerIcon from "../../assets/icons/TimerIcon.svg";
import useAxios from "../../app/hooks/useAxios";
import { API_ENDPOINT } from "../../constants/constants";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { useNavigate } from "react-router-dom";

const QuestionPreviewPage = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [questionData, setQuestionData] = useState([]);
  const { get } = useAxios();
  const navigate = useNavigate();
  const quizId = localStorage.getItem("quizId");

  useEffect(() => {
    setQuestionData([]);
    get(`${API_ENDPOINT.QUESTIONS_LIST}/${quizId}`, null, true)
      .then((response) => {
        const data = response.data;
        if (data && Array.isArray(data)) {
          setQuestionData(data);
        } else {
          console.error("Invalid response data structure:", response);
        }
        console.log(data.questionType.id)
      })
      .catch((error) => {
        console.error("Error fetching questions:", error);
      });
  }, [get]);

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questionData.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const currentQuestion = questionData[currentQuestionIndex];
  const optionLabels = ["A", "B", "C", "D"];
  const formatTime = (seconds) => {
    const mm = Math.floor(seconds / 60)
      .toString()
      .padStart(2, "0");
    const ss = (seconds % 60).toString().padStart(2, "0");
    return `${mm}:${ss}`;
  };

  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      className="h-screen bg-cover bg-center"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      {currentQuestion ? (
        <>
          <Grid
            item
            className="fixed left-1/2 top-0 transform -translate-x-1/2 bg-[#FEF3E7] rounded-b-[32px] flex items-center justify-evenly w-[202px] h-[88px] p-6"
          >
            <img src={TimerIcon} alt="Timer Icon" className="w-12 h-12" />
            <div className="font-visby font-semibold text-4xl leading-9 text-[#E93E3A] ml-4 text-left">
              {formatTime(currentQuestion.timeLimit)}
            </div>
          </Grid>
          <Grid
            container
            justifyContent="center"
            sx={{
              width: "1280px",
              position: "absolute",
              padding: "24px 0px 0px 0px",
              gap: "32px",
            }}
          >
            <Grid
              container
              spacing={0}
              justifyContent="space-between"
              sx={{
                width: "1232px",
                height: "100px",
                padding: "8px 16px",
                borderRadius: "8px",
                background: "rgba(254, 243, 231, 1)",
              }}
            >
              <Grid
                container
                justifyContent="center"
                alignItems="center"
                spacing={0}
                sx={{
                  width: "1200px",
                  height: "38px",
                }}
              >
                <Typography
                  variant="h4"
                  sx={{
                    fontSize: "32px",
                    fontWeight: 600,
                    lineHeight: "38.4px",
                    textAlign: "center",
                    color: "#E93E3A",
                    padding: "16px",
                  }}
                >
                  {currentQuestion.question}
                </Typography>
              </Grid>
            </Grid>
            {currentQuestion.questionType.id === 3 ? (
              <Grid
                container
                spacing={0}
                sx={{
                  width: "1232px",
                  height: "272px",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <Box
                  display="flex"
                  flexDirection="column"
                  height="212px"
                  borderRadius="8px"
                  bgcolor="#F4F4F5"
                  position="relative"
                >
                  <Box
                    margin="8px"
                    width="827px"
                    height="196px"
                    borderRadius="8px"
                  >
                    <TextField
                      multiline
                      maxRows={8}
                      variant="standard"
                      value={currentQuestion.questionAnswers[0].questionOption}
                      fullWidth
                      InputProps={{
                        disableUnderline: true,
                      }}
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          borderBottom: "none",
                          outline: "none",
                        },
                        "& .MuiOutlinedInput-notchedOutline": {
                          display: "none",
                          borderBottom: "none",
                        },
                        "& .MuiInputBase-input": {
                          fontSize: "22px",
                        },
                      }}
                      disabled
                    />
                  </Box>
                </Box>
              </Grid>
            ) : (
              <Grid
                container
                spacing={0}
                sx={{
                  width: "1232px",
                  height: "272px",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                {currentQuestion.questionAnswers &&
                  currentQuestion.questionAnswers.map((item, index) => (
                    <Grid
                      key={index}
                      container
                      sx={{
                        width: "100%",
                        height: "56px",
                        borderRadius: "8px",
                        backgroundColor: "#F4F4F5",
                        marginBottom:
                          index < currentQuestion.questionAnswers.length - 1
                            ? "16px"
                            : 0,
                      }}
                    >
                      <Grid
                        container
                        justifyContent="center"
                        alignItems="center"
                        direction="column"
                        sx={{
                          width: "36px",
                          height: "100%",
                          flexShrink: 0,
                        }}
                      >
                        <Box borderRight={2} borderColor="grey.500">
                          <Typography
                            variant="h5"
                            sx={{
                              fontSize: "24px",
                              fontWeight: 600,
                              lineHeight: "28.8px",
                              textAlign: "center",
                              color: "#3F3F46",
                              padding: "8px",
                            }}
                          >
                            {optionLabels[index]}
                          </Typography>
                        </Box>
                      </Grid>

                      <Grid
                        justifyContent="left"
                        alignItems="center"
                        container
                        sx={{
                          flex: 1,
                          height: "100%",
                          marginLeft: "16px",
                        }}
                      >
                        <Typography
                          variant="h6"
                          sx={{
                            fontSize: "20px",
                            fontWeight: 500,
                            lineHeight: "24px",
                            textAlign: "left",
                            color: "#52525B",
                            padding: "8px",
                          }}
                        >
                          {item.questionOption}
                        </Typography>
                      </Grid>

                      <Grid
                        container
                        justifyContent="center"
                        alignItems="center"
                        sx={{
                          width: "40px",
                          height: "100%",
                          flexShrink: 0,
                        }}
                      >
                        {currentQuestion?.questionType?.id === 1 &&
                        currentQuestion?.answerOption?.id === 2 ? (
                          <Checkbox
                            checked={item.correct}
                            disabled={true}
                            sx={{
                              width: "40px",
                              height: "40px",
                              color: item.correct ? "green" : "default",
                              "&.Mui-checked": {
                                color: "green",
                              },
                            }}
                          />
                        ) : (
                          <Radio
                            checked={item.correct}
                            disabled={true}
                            style={{
                              fontSize: "40px",
                              color: "#22C55E",
                            }}
                          />
                        )}
                      </Grid>
                    </Grid>
                  ))}
              </Grid>
            )}

            <Grid
              container
              className="fixed left-1/2 bottom-0 transform -translate-x-1/2 flex items-center justify-center"
              alignItems="center"
              justifyContent="center"
            >
              <div className="absolute bottom-8 flex items-center justify-center gap-0">
                <button
                  className="bg-[#71717A] text-white w-[142px] h-[48px] px-4 py-2 border-r border-[#FDE5D7] hover:bg-[#5e5e66] font-visby text-lg font-medium leading-6 text-center"
                  style={{ marginRight: "0" }}
                  onClick={() => navigate("/quiz")}
                >
                  Exit preview
                </button>
                <div className="flex items-center bg-[#71717A] h-[48px] px-4 gap-5">
                  <IconButton
                    onClick={handlePreviousQuestion}
                    disabled={currentQuestionIndex === 0}
                    className={`${
                      currentQuestionIndex === 0
                        ? "text-gray-400"
                        : "text-white"
                    } hover:bg-transparent`}
                    style={{ padding: "0" }}
                  >
                    <ArrowBackIosNewIcon className="text-[#FAFAFA]" />
                  </IconButton>
                  <div className="text-[#FAFAFA]">
                    {currentQuestionIndex + 1} of {questionData.length}
                  </div>
                  <IconButton
                    onClick={handleNextQuestion}
                    disabled={currentQuestionIndex === questionData.length - 1}
                    className={`${
                      currentQuestionIndex === questionData.length - 1
                        ? "text-gray-400"
                        : "text-white"
                    } hover:bg-transparent`}
                    style={{ padding: "0" }}
                  >
                    <ArrowForwardIosIcon className="text-[#FAFAFA]" />
                  </IconButton>
                </div>
              </div>
            </Grid>
          </Grid>
        </>
      ) : (
        <Typography
          variant="h4"
          sx={{
            fontSize: "32px",
            fontWeight: 600,
            lineHeight: "38.4px",
            textAlign: "center",
            color: "#E93E3A",
            padding: "16px",
          }}
        >
          Loading...
        </Typography>
      )}
    </Grid>
  );
};

export default QuestionPreviewPage;

import React, { useState, useEffect } from "react";
import { Box, Grid, TextField, Typography } from "@mui/material";
import QuizTextField from "../../components/core/QuizTextField";
import { API_ENDPOINT, CREATE_QUIZ } from "../../constants/constants";
import useAxios from "../../app/hooks/useAxios";

const QuizPage = ({
  imgUrl,
  questions,
  setQuestions,
  answerOption,
  selectedQuestionId,
}) => {
  const { put, post, get } = useAxios();
  const [currentQuestionText, setCurrentQuestionText] = useState("");
  const selectedQuestion = questions?.find(
    (q) => q.slideId === selectedQuestionId
  );

  useEffect(() => {
    if (selectedQuestion) {
      setCurrentQuestionText(selectedQuestion.question || "");
    }
  }, [selectedQuestionId]);

  const handleQuestionChange = (event) => {
    const newQuestionText = event.target.value;
    setCurrentQuestionText(newQuestionText);
    const updatedQuestions = questions.map((q) =>
      q.slideId === selectedQuestionId
        ? {
            ...q,
            question: newQuestionText,
            questionAnswers: q.questionAnswers,
          }
        : q
    );
    setQuestions(updatedQuestions);
  };

  const handleSaveQuestion = async () => {
    if (!selectedQuestionId) return;
    const quizId = localStorage.getItem("quizId");
    const payLoad = {
      question: currentQuestionText,
      quiz: { id: quizId },
    };
    if (selectedQuestion.id) {
      await put(
        API_ENDPOINT.QUESTION,
        { ...payLoad, id: selectedQuestion.id },
        true
      )
        .then((response) => {
          console.log(questions);
          setQuestions(
            ...questions,
            (questionAnswers = response.data.questionAnswers)
          );
        })
        .catch((error) => {
          console.error("Error adding question:", error);
        });
    } else {
      await post(API_ENDPOINT.QUESTION, selectedQuestion, true)
        .then((response) => {
          selectedQuestion.id = response.data.id;
          setQuestions((selectedQuestion) =>
            selectedQuestion.map((q,index) =>
              q.id === selectedQuestion.id
                ? {
                    ...q,
                    slideId: index + 1,
                    // id: response.data.id,
                    quiz: { id: quizId },
                  }
                : q
            )
          );
        })
        .catch((error) => {
          console.error("Error updating question", error);
        });
    }
  };

  const handleSave = (data) => {
    // console.log("Data stored in state:", data);
  };

  const getOptions = () => {
    if (selectedQuestion?.questionType?.name == "True & False") {
      return [
        {
          option: selectedQuestion?.questionAnswers[0]?.questionOption || "True",
          correct: selectedQuestion?.questionAnswers[0]?.correct || false,
        },
        {
          option: selectedQuestion?.questionAnswers[1]?.questionOption || "False",
          correct: selectedQuestion?.questionAnswers[1]?.correct || false,
        }
      ];
    } else if (selectedQuestion?.questionType?.name == "MCQ") {
      return selectedQuestion.questionAnswers.map((answer) => ({
        option: answer.questionOption,
        correct: answer.correct,
      }));
    } else if (selectedQuestion?.questionType?.name == "Slide") {
      return [
        {
          option: selectedQuestion?.questionAnswers[0]?.questionOption,
          correct: selectedQuestion?.questionAnswers[0]?.correct,
        },
      ];
    }
    return [];
  };
  return (
    <Grid
      container
      direction="column"
      alignItems="flex-start"
      justifyContent="center"
      position="relative">
      <Grid item position="relative" right="25px" bottom="6px">
        <Box
          component="img"
          src={imgUrl}
          alt="Quiz"
          style={{ objectFit: "cover" }}
          className="w-[200vh] h-[full]"
        />
        <Box
          position="absolute"
          top="0"
          left="0"
          right="60px"
          bottom="0"
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="flex-start"
          overflow="auto"
          marginTop="90px">
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            width="944px"
            height="auto"
            borderRadius="8px"
            p={2}
            boxShadow="0px 4px 16px rgba(0, 0, 0, 0.1)"
            mt="261px">
            <Box
              width="896px"
              height="70px"
              p="8px 16px"
              display="flex"
              alignItems="center"
              justifyContent="center"
              bgcolor="#FEF3E7"
              borderRadius="8px"
              mb={2}>
              <TextField
                variant="outlined"
                placeholder="Enter Your Question"
                fullWidth
                autoComplete="off"
                value={currentQuestionText}
                onFocus={(event) => {
                  event.target.select();
                }}
                onChange={handleQuestionChange}
                onBlur={handleSaveQuestion}
                sx={{
                  "& .MuiInputBase-input": {
                    color: "#C82A34",
                    fontWeight: 600,
                    fontSize: "22px",
                    textAlign: "center",
                  },
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      border: "none",
                    },
                  },
                  "& .MuiInputBase-root": {
                    border: "none",
                  },
                  "& .MuiInputBase-input::placeholder": {
                    color: "#C82A34",
                    fontWeight: 600,
                    fontSize: "24px",
                  },
                }}
              />
            </Box>

            {selectedQuestion && (
              <QuizTextField
                key={selectedQuestionId}
                type={
                  selectedQuestion?.questionType?.name === "MCQ"
                    ? selectedQuestion?.answerOption?.name ===
                      "Single Answer Select"
                      ? "single"
                      : "multi"
                    : selectedQuestion?.questionType?.name === "True & False"
                    ? "single"
                    : selectedQuestion?.questionType?.name === "Slide"
                    ? "Slide"
                    : ""
                }
                content={getOptions()}
                onSave={handleSave}
                question={currentQuestionText}
                selectedQuestion={selectedQuestion}
                setQuestions={setQuestions}
              />
            )}
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
};

export default QuizPage;

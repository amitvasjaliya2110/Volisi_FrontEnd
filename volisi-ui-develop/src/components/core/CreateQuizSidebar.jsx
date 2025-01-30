import { Box, Button, Typography, IconButton, Grid } from "@mui/material";
import { Delete, ControlPointDuplicate } from "@mui/icons-material";
import useAxios from "../../app/hooks/useAxios";
import { API_ENDPOINT } from "../../constants/constants";

const CreateQuizSidebar = ({
  questions,
  setQuestions,
  setSelectedQuestionId,
  selectedQuestionId,
  selectedTheme,
  setQuestionType,
  questionType,
}) => {
  const { post, del, get } = useAxios();

  const addQuestion = async () => {
    const quizId = localStorage.getItem("quizId");
    const newQuestion = {
      slideId: questions.length + 1,
      question: "",
      timeLimit: 5,
      questionType: { id: 1, name: "MCQ" },
      answerOption: { id: 1, name: "Single Answer Select" },
      quiz: { id: quizId },
      questionAnswers: [
        { questionOption: "Add Answer 1", correct: false },
        { questionOption: "Add Answer 2", correct: false },
        { questionOption: "Add Answer 3", correct: false },
        { questionOption: "Add Answer 4", correct: false },
      ],
      id: "",
    };
    setQuestions([...questions, newQuestion]);
    setSelectedQuestionId(newQuestion.slideId);
  };

  const duplicateQuestion = (id) => {
    const questionIndex = questions.findIndex((q) => q.slideId === id);
    if (questionIndex !== -1) {
      const questionToDuplicate = questions[questionIndex];
      const duplicatedQuestion = {
        ...questionToDuplicate,
        slideId: questionToDuplicate.slideId + 1,
        id : "",
      };
      const updatedQuestions = [
        ...questions.slice(0, questionIndex + 1),
        duplicatedQuestion,
        ...questions.slice(questionIndex + 1).map((q, index) => ({
          ...q,
          slideId: questionToDuplicate.slideId + 2 + index,
        })),
      ];
      setQuestions(updatedQuestions);
      setSelectedQuestionId(duplicatedQuestion.slideId);
    }
  };

  const deleteQuestion = async (id) => {
    const selectedQuestion = questions?.find(
      (q) => q.slideId === selectedQuestionId
    );
    const updatedQuestions = questions
      .filter((q) => q.slideId !== id)
      .map((q, index) => ({
        ...q,
        slideId: index + 1,
      }));
    setQuestions(updatedQuestions);
    setSelectedQuestionId(
      updatedQuestions.length > 0
        ? updatedQuestions[updatedQuestions.length - 1].slideId
        : null
    );

    await del(`${API_ENDPOINT.QUESTION}/${selectedQuestion.id}`, null, true)
      .then()
      .catch((error) => {
        console.error("Error deleting question:", error);
      });
  };

  const handleQuestionClick = (id) => {
    setSelectedQuestionId(id);
    const selectedQuestion = questions.find((q) => q.slideId === id);
    if (selectedQuestion) {
      setQuestionType(selectedQuestion?.questionType?.name);
    }
  };

  return (
    <Box className="flex flex-col h-full overflow-y-auto">
      <Box className="flex flex-row border-b border-gray-300"></Box>
      <Box className="flex flex-col flex-1 w-[230px] border-r border-gray-300 p-0">
        {questions.map((question) => (
          <Box
            key={question.slideId}
            className={`w-[230px] h-[180.33px] cursor-pointer ${
              selectedQuestionId === question.slideId ? "bg-[#FEF3E7]" : ""
            }`}
            onClick={() => handleQuestionClick(question.slideId)}>
            <Box className="p-3 pt-1 pb-0">
              <Grid className="flex justify-between items-center" container>
                <Typography variant="body">
                  {question.slideId} {question?.questionType?.name}
                </Typography>
                <Box>
                  <IconButton
                    sx={{ padding: "0px" }}
                    onClick={(e) => {
                      e.stopPropagation();
                      duplicateQuestion(question.slideId);
                    }}>
                    <ControlPointDuplicate />
                  </IconButton>
                  <IconButton
                    sx={{ padding: "0 0 0 8px" }}
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteQuestion(question.slideId);
                    }}>
                    <Delete />
                  </IconButton>
                </Box>
              </Grid>
            </Box>
            <Box className="p-3 pt-1">
              <Box
                component="img"
                className={`h-[137px] w-[206px] rounded-lg object-cover ${
                  selectedQuestionId === question.id
                    ? "border-4 border-[#F89E88]"
                    : "border-4 border-[#A1A1AA]"
                }`}
                src={selectedTheme}
                alt={question.name}
              />
            </Box>
          </Box>
        ))}
        <Button
          variant="contained"
          className="h-[48px] w-[206px] rounded-lg"
          color="primary"
          sx={{ mt: "10px", mx: "auto", backgroundColor: "#E93E3A" }}
          onClick={addQuestion}>
          Add Question
        </Button>
      </Box>
    </Box>
  );
};

export default CreateQuizSidebar;

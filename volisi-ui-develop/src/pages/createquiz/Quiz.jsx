import React, { useState, useEffect } from "react";
import { Grid } from "@mui/material";
import Header from "../../components/core/Header";
import CreateQuizSidebar from "../../components/core/CreateQuizSidebar";
import QuestionSettingSidebar from "../../components/core/QuestionSettingSidebar";
import QuizPage from "./QuizPage";
import imgUrl from "../../assets/images/theme/theme1.svg";
import useAxios from "../../app/hooks/useAxios"; // Custom hook for Axios
import { API_ENDPOINT } from "../../constants/constants";

const Quiz = () => {
  const quizId = localStorage.getItem("quizId");
  const [answerOption, setAnswerOption] = useState("Single Answer Select");
  const [selectedTheme, setSelectedTheme] = useState(imgUrl);
  const [questions, setQuestions] = useState([]);
  const [selectedQuestionId, setSelectedQuestionId] = useState();
  const [questionType, setQuestionType] = useState("MCQ");
  const { get } = useAxios();
  useEffect(() => {
    getData();
  }, [quizId, get,]);

  const getData = () => {
    get(`${API_ENDPOINT.QUESTIONS_LIST}/${quizId}`, null, true)
      .then((response) => {
        const data = response.data;
        if (data.length > 0) {
          const indexedQuestions = data.map((question, index) => ({
            ...question,
            slideId: index + 1,
            id: question.id,
            quiz: { id: quizId },
          }));
          setQuestions(indexedQuestions);
          setSelectedQuestionId(indexedQuestions[0].slideId ); 
        }
        else{
          const newQuestion = {
            slideId: 1,
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
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleThemeChange = (theme) => {
    setSelectedTheme(theme);
  };

  const handleAnswerOptionChange = (newAnswerOption) => {
    setAnswerOption(newAnswerOption);
  };

  return (
    <Grid className="h-screen overflow-hidden">
      <Grid container direction="column" className="h-full">
        <Grid item>
          <Header createQuizHeader={true} />
        </Grid>
        <Grid container item className="flex-1 overflow-hidden">
          <Grid item xs={2} className="h-full">
            <CreateQuizSidebar
              questions={questions}
              setQuestions={setQuestions}
              setSelectedQuestionId={setSelectedQuestionId}
              selectedQuestionId={selectedQuestionId}
              selectedTheme={selectedTheme}
              setQuestionType={setQuestionType}
              questionType={questionType}
            />
          </Grid>
          <Grid item xs={10} className="flex h-full">
            <QuizPage
              imgUrl={selectedTheme}
              questions={questions}
              setQuestions={setQuestions}
              answerOption={answerOption}
              selectedQuestionId={selectedQuestionId}
              setSelectedQuestionId={setSelectedQuestionId}
              questionType={questionType}
            />
            <Grid item xs={2} className="h-full">
              <QuestionSettingSidebar
                selectedQuestionId={selectedQuestionId}
                questions={questions}
                setQuestions={setQuestions}
                handleThemeChange={handleThemeChange}
                onChangeAnswerOption={handleAnswerOptionChange}
                setQuestionType={setQuestionType}
                questionType={questionType}
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Quiz;

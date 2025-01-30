import { useState, useEffect } from "react";
import { Box, Button, Typography } from "@mui/material";
import ColorLensIcon from "@mui/icons-material/ColorLens";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import Dropdown from "./Dropdown";
import BackgroundImagePicker from "./BackgroundImagePicker";
import { answerOptionItems, timeDurationItems } from "../../util/jsonData";
import useAxios from "../../app/hooks/useAxios";
import { useLocation, useNavigate } from "react-router-dom";
import { API_ENDPOINT } from "../../constants/constants";

const QuestionSettingSidebar = ({
  selectedQuestionId,
  questions,
  setQuestions,
  onChangeAnswerOption,
  handleThemeChange,
  setQuestionType,
  questionType,
}) => {
  const selectedQuestion = questions.find(
    (q) => q.slideId === selectedQuestionId
  );
  const [questionTypeItems, setQuestionTypeItems] = useState([
    selectedQuestion?.questioType?.name || "MCQ",
  ]);
  const [timeLimit, setTimeLimits] = useState(timeDurationItems[0].label || 0);
  const [answerOption, setAnswerOption] = useState([
    selectedQuestion?.answerOption?.name || answerOptionItems[0].label,
  ]);
  const [isImagePickerOpen, setIsImagePickerOpen] = useState(false);
  const { get, put } = useAxios();

  const navigate = useNavigate();

  useEffect(() => {
    handleTypeSelect();
  }, [selectedQuestionId]);

  const handleTypeSelect = async () => {
    await get(API_ENDPOINT.QUESTION_TYPE, null, true)
      .then((response) => {
        const data = response.data;
        if (data && Array.isArray(data)) {
          const mappedQuestionTypes = data.map((questioType, index) => ({
            label: questioType.name,
            value: index + 1,
          }));
          setQuestionTypeItems(mappedQuestionTypes);
          if (selectedQuestion) {
            const currentQuestionType = mappedQuestionTypes.find(
              (item) => item.label === selectedQuestion.questionType.name
            );
            setQuestionType(currentQuestionType.label);
          }
        } else {
          console.error("Invalid response data structure:", response);
        }
      })
      .catch((error) => {
        console.error("Error fetching question types:", error);
      });
    if (selectedQuestion) {
      setTimeLimits(selectedQuestion?.timeLimit);
      setAnswerOption(selectedQuestion?.answerOption?.name);
    }
  };

  const handleQuestionTypeChange = async (event) => {
    const selectedValue = event.target.value;
    const selectedType = questionTypeItems.find(
      (item) => item.value === parseInt(selectedValue)
    ).label;
    const updatedQuestions = questions.map((q) =>
      q.slideId === selectedQuestionId
        ? {
            ...q,
            questionType: { id: selectedValue, name: selectedType },
          }
        : q
    );

    setQuestions(updatedQuestions);

    if (selectedQuestion) {
      const payLoad = {
        ...selectedQuestion,
        questionType: { id: selectedValue, name: selectedType },
      };

      if (selectedQuestion.id) {
        await put(
          API_ENDPOINT.QUESTION,
          { ...payLoad, id: selectedQuestion.id },
          true
        )
          .then((response) => {
            setQuestionType(response.data.questionType.name);
          })
          .catch((error) => {
            console.error("Error updating options:", error);
          });
      } else {
        setQuestionType(selectedType);
      }
    }
  };

  const handleTimeDurationChange = async (event) => {
    const selectedValue = event.target.value;

    const updatedQuestions = questions.map((q) =>
      q.slideId === selectedQuestionId ? { ...q, timeLimit: selectedValue } : q
    );
    setQuestions(updatedQuestions);

    if (selectedQuestion) {
      const payLoad = {
        ...selectedQuestion,
        timeLimit: selectedValue,
      };
      if (selectedQuestion.id) {
        await put(
          API_ENDPOINT.QUESTION,
          { ...payLoad, id: selectedQuestion.id },
          true
        )
          .then((response) => {
            setTimeLimits(response.data.timeLimit);
          })
          .catch((error) => {
            console.error("Error updating time duration:", error);
          });
      } else {
        setTimeLimits(selectedValue);
      }
    }
  };

  const handleAnswerOptionChange = async (event) => {
    const selectedValue = event.target.value;
    const selectedType = answerOptionItems.find(
      (item) => item.value === parseInt(selectedValue)
    ).label;

    const updatedQuestions = questions.map((q) =>
      q.slideId === selectedQuestionId
        ? { ...q, answerOption: { id: selectedValue, name: selectedType } }
        : q
    );

    onChangeAnswerOption(selectedType);
    setQuestions(updatedQuestions);

    if (selectedQuestion) {
      const payLoad = {
        ...selectedQuestion,
        answerOption: { id: selectedValue, name: selectedType },
      };
      if (selectedQuestion.id) {
        await put(
          API_ENDPOINT.QUESTION,
          { ...payLoad, id: selectedQuestion.id },
          true
        )
          .then((response) => {
            setAnswerOption(response.data.answerOption.name);
          })
          .catch((error) => {
            console.error("Error updating answer option:", error);
          });
      } else {
        setAnswerOption(selectedType);
      }
    }
  };

  const Title = ({ text }) => (
    <Typography
      sx={{
        width: "234px",
        height: "19px",
        fontSize: "16px",
        fontWeight: 500,
        lineHeight: "19.2px",
        textAlign: "left",
        color: "#18181B",
        marginBottom: "8px",
      }}>
      {text}
    </Typography>
  );
  return (
    <>
      <Box
        sx={{
          width: "266px",
          height: "954px",
          top: "66px",
          right: "0px",
          position: "fixed",
          padding: "16px 0px 0px 0px",
          backgroundColor: "#FFFFFF",
          border: "2px solid #D4D4D8",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          alignItems: "center",
          gap: "16px",
        }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "16px",
          }}>
          <Button
            startIcon={<ColorLensIcon style={{ fontSize: 24 }} />}
            style={{
              fontSize: "20px",
              fontWeight: 600,
              lineHeight: "24px",
              textAlign: "center",
              backgroundColor: "#FDE5D7",
              color: "#E93E3A",
              width: "234px",
              height: "48px",
              padding: "8px 16px",
              borderRadius: "8px",
            }}
            onClick={() => setIsImagePickerOpen(true)}>
            Themes
          </Button>
          <Box sx={{ width: "234px" }}>
            <Title text="Question Type" />
            <Dropdown
              label="QuestionType"
              items={questionTypeItems}
              selectedValue={
                questionTypeItems.find((item) => item.label === questionType)
                  ?.value || ""
              }
              onChange={handleQuestionTypeChange}
            />
          </Box>
          <Box sx={{ width: "234px" }}>
            <Title text="Time Duration" />
            <Dropdown
              label="TimeDuration"
              items={timeDurationItems}
              selectedValue={timeLimit}
              onChange={handleTimeDurationChange}
            />
          </Box>
          {questionType == "MCQ" && (
            <Box sx={{ width: "234px" }}>
              <Title text="Answer Option" />
              <Dropdown
                label="AnswerOption"
                items={answerOptionItems}
                selectedValue={
                  answerOptionItems.find((item) => item.label === answerOption)
                    ?.value || ""
                }
                onChange={handleAnswerOptionChange}
              />
            </Box>
          )}
          <Button
            startIcon={<RemoveRedEyeIcon style={{ fontSize: 24 }} />}
            style={{
              position:"fixed",
              fontSize: "20px",
              fontWeight: 600,
              lineHeight: "24px",
              textAlign: "center",
              color: "#E93E3A",
              width: "234px",
              height: "48px",
              padding: "8px 16px",
              borderRadius: "8px",
              border: "1px solid #E93E3A",
              bottom:"20px"
            }}
            onClick={() => {
              navigate("preview");
            }}>
            Preview
          </Button>
        </Box>
      </Box>
      <BackgroundImagePicker
        open={isImagePickerOpen}
        handleThemeChange={handleThemeChange}
        handleClose={() => setIsImagePickerOpen(false)}
      />
    </>
  );
};
export default QuestionSettingSidebar;

import React, { useState, useEffect } from "react";
import { Box, Typography, IconButton, TextField, Button } from "@mui/material";
import {
  RadioButtonUnchecked,
  CheckBoxOutlineBlank,
  CheckBox,
  RadioButtonChecked,
} from "@mui/icons-material";
import useAxios from "../../app/hooks/useAxios";
import { API_ENDPOINT } from "../../constants/constants";

const QuizTextField = (props) => {
  const {
    type = "single",
    content: preContent = [],
    descriptionContent = "",
    onSave,
    selectedQuestion,
    question,
    setQuestions,
  } = props;

  const { put, post, get } = useAxios();
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [description, setDescription] = useState(descriptionContent);
  const [content, setContent] = useState(
    preContent.map((option) => option.option)
  );

  useEffect(() => {
    const initialSelectedOptions = preContent
      .map((option, index) => (option.correct ? index : null))
      .filter((index) => index !== null);
    setSelectedOptions(initialSelectedOptions);
  }, [preContent]);

  const handleSelect = async (index) => {
    let updatedSelectedOptions;
    if (type === "single") {
      updatedSelectedOptions = [index];
      setSelectedOptions([index]);
    } else {
      updatedSelectedOptions = selectedOptions.includes(index)
        ? selectedOptions.filter((i) => i !== index)
        : [...selectedOptions, index];
    }
    setSelectedOptions(updatedSelectedOptions);

    const updatedOptions = content.map((option, idx) => ({
      questionOption: option,
      correct: updatedSelectedOptions.includes(idx),
    }));

    await handleSaveOptions(updatedOptions);
  };

  const handleOptionChange = (index, value) => {
    const newContent = [...content];
    newContent[index] = value;
    setContent(newContent);

    const updatedOptions = newContent.map((option, idx) => ({
      questionOption: option,
      correct: selectedOptions.includes(idx),
    }));

    onSave(updatedOptions);
    // console.log(updatedOptions);
  };

  const handleSaveOptions = async (updatedOptions) => {
    if (!selectedQuestion) return;
    const quizId = localStorage.getItem("quizId");
    const payLoad = {
      question: selectedQuestion.question,
      timeLimit: selectedQuestion.timeLimit,
      quiz: { id: quizId },
      questionAnswers: updatedOptions,
    };
    if (selectedQuestion.id) {
      await put(
        API_ENDPOINT.QUESTION,
        { ...payLoad, id: selectedQuestion.id },
        true
      )
        .then((response) => {
          onSave(updatedOptions);
          const data = response.data;
            setQuestions((prevQuestions) =>
              prevQuestions.map((q) =>
                q.id === selectedQuestion.id
                  ? { ...q, questionAnswers: data.questionAnswers,}
                  : q
              )
            );
        })
        .catch((error) => {
          console.error("Error adding question:", error);
        });
    }
  };
  useEffect(() => {
    onSave({ content });
  }, [content]);

  return (
    <>
      {type === "Slide" ? (
        <Box
          display="flex"
          flexDirection="column"
          width="896px"
          height="212px"
          borderRadius="8px"
          bgcolor="#F4F4F5"
          position="relative">
          <Box margin="8px" width="827px" height="196px" borderRadius="8px">
            <TextField
              multiline
              maxRows={8}
              variant="standard"
              defaultValue="Add Description Here"
              value={description || content[0]}
              onFocus={(event) => {
                event.target.select();
              }}
              onBlur={() => {
                handleSaveOptions([
                  { questionOption: description, correct: false },
                  { questionOption: "Add Answer 2", correct: false },
                  { questionOption: "Add Answer 3", correct: false },
                  { questionOption: "Add Answer 4", correct: false },
                ]);
              }}
              onChange={(e) => setDescription(e.target.value)}
              fullWidth
              InputProps={{
                disableUnderline: true,
                sx: {
                  padding: 0,
                  margin: 0,
                  "& .MuiInputBase-input": {
                    padding: 0.5,
                    margin: 0,
                    border: "none",
                    boxShadow: "none",
                    backgroundColor: "transparent",
                  },
                },
              }}
            />
          </Box>
          <Typography
            variant="body2"
            color="#3F3F46"
            position="absolute"
            top="16px"
            right="16px">
            {description.length}
          </Typography>
        </Box>
      ) : (
        <Box display="flex" flexDirection="column" gap={2}>
          {content.map((option, index) => (
            <Box
              key={index}
              display="flex"
              flex={1}
              alignItems="center"
              justifyContent="space-between"
              borderRadius="8px"
              bgcolor="#F4F4F5"
              width="896px"
              height="56px"
              sx={{ cursor: "pointer" }}>
              <Box display="flex" alignItems="center" flex="1">
                <Typography
                  variant="h6"
                  fontWeight={600}
                  fontSize="24px"
                  color="#3F3F46"
                  textAlign="center"
                  className="p-2">
                  {String.fromCharCode(65 + index)}
                </Typography>
                <Box
                  sx={{
                    height: "auto",
                    minHeight: "40px",
                    marginTop: "8px",
                    marginBottom: "8px",
                  }}
                  width="2px"
                  bgcolor="#A1A1AA"
                  alignSelf={"stretch"}
                />
                <TextField
                  sx={{
                    width: "auto",
                    flex: 1,
                    borderRadius: "4px",
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": {
                        border: "none",
                      },
                    },
                    "& .MuiInputBase-root": {
                      border: "none",
                    },
                  }}
                  onFocus={(event) => {
                    event.target.select();
                  }}
                  variant="outlined"
                  value={option}
                  onChange={(e) => handleOptionChange(index, e.target.value)}
                  onBlur={() => {
                    const updatedOptions = content.map((option, idx) => ({
                      questionOption: option,
                      correct: selectedOptions.includes(idx),
                    }));
                    handleSaveOptions(updatedOptions);
                  }}
                />
              </Box>
              <IconButton
                onClick={() => handleSelect(index)}
                sx={{ padding: "0px", margin: "8px", color: "#22C55E" }}>
                {type === "single" ? (
                  selectedOptions.includes(index) ? (
                    <RadioButtonChecked
                      style={{ color: "#22C55E", fontSize: "40px" }}
                    />
                  ) : (
                    <RadioButtonUnchecked
                      style={{ color: "#22C55E", fontSize: "40px" }}
                    />
                  )
                ) : selectedOptions.includes(index) ? (
                  <CheckBox style={{ color: "#22C55E", fontSize: "40px" }} />
                ) : (
                  <CheckBoxOutlineBlank style={{ fontSize: "40px" }} />
                )}
              </IconButton>
            </Box>
          ))}
        </Box>
      )}
    </>
  );
};

export default QuizTextField;

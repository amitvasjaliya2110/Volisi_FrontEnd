/* eslint-disable react/prop-types */
import { useState } from "react";
import { Box, Typography, IconButton, TextField } from "@mui/material";
import {
  RadioButtonUnchecked,
  CheckBoxOutlineBlank,
  CheckBox,
  RadioButtonChecked,
} from "@mui/icons-material";

const PlayerQuestionAnswer = (props) => {
  const {
    type = "single",
    content: initialContent = [],
    descriptionContent = "",
  } = props;

  const [selectedOptions, setSelectedOptions] = useState([]);
  const [description, setDescription] = useState(descriptionContent);
  const [content, setContent] = useState(initialContent);

  const handleSelect = (index) => {
    if (type === "single") {
      setSelectedOptions([index]);
    } else {
      setSelectedOptions((prevSelected) => {
        if (prevSelected.includes(index)) {
          return prevSelected.filter((i) => i !== index);
        } else {
          return [...prevSelected, index];
        }
      });
    }
  };

  const handleOptionChange = (index, value) => {
    const newContent = [...content];
    newContent[index] = value;
    setContent(newContent);
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      width="100%"
      flexDirection="column"
      padding={"16px"}
    >
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        width="100%"
        maxWidth="896px"
        height="70px"
        borderRadius="8px"
        bgcolor="#FEF3E7"
        position="relative"
        mb={2}
      >
        <TextField
          variant="outlined"
          placeholder="Enter Your Question"
          autoComplete="off"
          inputProps={{ readOnly: true }}
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
      {type === "description" ? (
        <Box
          display="flex"
          flexDirection="column"
          width="100%"
          maxWidth="896px"
          height="212px"
          borderRadius="8px"
          bgcolor="#F4F4F5"
          position="relative"
        >
          <Box
            margin="8px"
            sx={{ width: "100%", height: "196px" }}
            borderRadius="8px"
          >
            <TextField
              multiline
              disabled
              maxRows={8}
              variant="standard"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              fullWidth
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderBottom: "none",
                  outline: "none",
                },
                "& .MuiOutlinedInput-notchedOutline": {
                  display: "none",
                  borderBottom: "none",
                },
              }}
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
        </Box>
      ) : (
        <Box
          display="flex"
          flexDirection="column"
          gap={2}
          width="100%"
          maxWidth="896px"
        >
          {content.map((option, index) => (
            <Box
              key={index}
              display="flex"
              flex={1}
              alignItems="center"
              justifyContent="space-between"
              borderRadius="8px"
              bgcolor="#F4F4F5"
              width="100%"
              height="56px"
              sx={{ cursor: "pointer" }}
            >
              <Box display="flex" alignItems="center" flex="1">
                <Typography
                  variant="h6"
                  fontWeight={600}
                  fontSize="24px"
                  color="#3F3F46"
                  textAlign="center"
                  className="p-2"
                >
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
                  inputProps={{ readOnly: true }}
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
                  variant="outlined"
                  value={option}
                  onChange={(e) => handleOptionChange(index, e.target.value)}
                />
              </Box>
              <IconButton
                onClick={() => handleSelect(index)}
                sx={{ padding: "0px", margin: "8px", color: "#22C55E" }}
              >
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
    </Box>
  );
};

export default PlayerQuestionAnswer;

import { useState, useContext, useEffect } from "react";
import {
  Box,
  Select,
  MenuItem,
  FormControl,
  Typography,
  Modal,
  Grid,
  FormHelperText,
} from "@mui/material";
import Button from "../../components/core/Button";
import { Folder } from "@mui/icons-material";
import { API_ENDPOINT, MESSAGES } from "../../constants/constants";
import useAxios from "../../app/hooks/useAxios";
import { notification } from "antd";
import volisiContext from "../../app/contexts/VolisiContext";

const MoveQuizModel = ({ isOpen, setIsOpen }) => {
  const { put, get } = useAxios();
  const [folder, setFolder] = useState("");
  const [folderError, setFolderError] = useState("");
  const { folders, setIsMove, isMove } = useContext(volisiContext);
  const userId = localStorage.getItem("userId");
  const quizId = localStorage.getItem("quizId");
  const [quizName, setQuizName] = useState("");

  useEffect(() => {
    const fetchQuizDetails = async () => {
      if (quizId) {
        await get(`${API_ENDPOINT.QUIZDETAIL}/${quizId}`, {}, true)
          .then((response) => {
            const quizData = response.data;
            setQuizName(quizData.name);
            setFolder(quizData.collection);
          })
          .catch(() => {
            notification.error({
              message: "Error",
              description: "Failed to fetch quiz details.",
            });
          });
      }
    };

    fetchQuizDetails();
  }, [quizId]);

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleSave = async (event) => {
    event.preventDefault();
    if (!folder) {
      setFolderError(MESSAGES.FOLDER_REQUIRED);
      return;
    }
    setFolderError(null);
    if (!folderError && folder) {
      await put(
        API_ENDPOINT.QUIZDETAIL,
        {
          id: quizId,
          name: quizName,
          collection: {
            id: folder.id,
          },
          user: {
            id: userId,
          },
        },
        true
      )
        .then(() => {
          notification.success({
            message: "Success",
            description: MESSAGES.QUIZ_MOVE_SUCCESS,
          });
          setIsMove(!isMove);
          handleClose();
        })
        .catch(() => {
          notification.error({
            message: "Error",
            description: MESSAGES.QUIZ_SAVE_ERROR,
          });
        });
    }
  };

  return (
    <Modal open={isOpen} onClose={handleClose}>
      <Box
        flexDirection="column"
        alignItems="center"
        justifyContent="space-between"
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          bgcolor: "#FFFFFF",
          height: 489,
          p: 2,
          width: 493,
          transform: "translate(-50%, -50%)",
          borderRadius: "20px",
          display: "flex",
        }}
      >
        <Grid>
          <Grid textAlign="center">
            <Typography
              sx={{ fontSize: "24px", fontWeight: 700, color: "#71717A" }}
            >
              Select the folder to <br />
              move your quiz
            </Typography>
          </Grid>
          <Typography
            sx={{
              marginTop: 2.5,
              fontSize: "16px",
              fontWeight: 500,
              color: "#18181B",
            }}
          >
            Move to
          </Typography>
          <FormControl sx={{ width: 413 }}>
            <Select
              value={folder}
              onChange={(e) => {
                setFolder(e.target.value);
                setFolderError("");
              }}
              renderValue={(selected) => (
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Folder />
                  <Typography sx={{ ml: 1 }}>{selected.name}</Typography>
                </Box>
              )}
              sx={{
                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#A1A1AA",
                },
              }}
              MenuProps={{
                PaperProps: {
                  style: {
                    maxHeight: 224,
                  },
                },
              }}
            >
              {folders?.length > 0 ? (
                folders.map((f) => (
                  <MenuItem key={f.id} value={f}>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <Folder />
                      <Typography sx={{ ml: 1 }}>{f.name}</Typography>
                    </Box>
                  </MenuItem>
                ))
              ) : (
                <Typography>No folders available</Typography>
              )}
            </Select>
            {folderError && (
              <FormHelperText
                sx={{
                  fontSize: "14px",
                  fontWeight: "400",
                  color: "#EF4444",
                  padding: "0px 4px",
                  margin: 0,
                }}
              >
                {folderError}
              </FormHelperText>
            )}
          </FormControl>
        </Grid>
        <Grid
          container
          display="flex"
          justifyContent="center"
          width="100%"
          //   mt={18}
          gap={2}
        >
          <Button
            variant="outlined"
            sx={{
              height: "48px",
              borderColor: "#E93E3A",
            }}
            backgroundColor="#FFFFFF"
            fontColor="#E93E3A"
            name="Cancel"
            width="196px"
            onClick={handleClose}
          />
          <Button name="Move" width="196px" onClick={handleSave} />
        </Grid>
      </Box>
    </Modal>
  );
};

export default MoveQuizModel;

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
  TextField,
  Menu,
} from "@mui/material";
import Button from "../../components/core/Button";
import TextFields from "../../components/core/TextField";
import { Folder } from "@mui/icons-material";
import CreateNewFolderIcon from "@mui/icons-material/CreateNewFolder";
import { API_ENDPOINT, MESSAGES } from "../../constants/constants";
import useAxios from "../../app/hooks/useAxios";
import { notification } from "antd";
import { useNavigate } from "react-router-dom";
import volisiContext from "../../app/contexts/VolisiContext";

const imageList = [
  "/src/assets/images/theme/theme1.svg",
  "/src/assets/images/theme/theme2.svg",
  "/src/assets/images/theme/theme3.svg",
  "/src/assets/images/theme/theme4.svg",
];

const PopupModel = ({ isOpen, setOpen }) => {
  const { put, get, post } = useAxios();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [folder, setFolder] = useState("");
  const [selectedImage, setSelectedImage] = useState(imageList[0]);
  const [titleError, setTitleError] = useState("");
  const [folderError, setFolderError] = useState("");
  const { folders, fetchFolders } = useContext(volisiContext);
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");
  const quizId = localStorage.getItem("quizId");
  const [showAddNewFolder, setShowAddNewFolder] = useState(false);
  const [newFolderName, setNewFolderName] = useState("");

  useEffect(() => {
    const fetchQuizDetails = async () => {
      if (quizId) {
        await get(`${API_ENDPOINT.QUIZDETAIL}/${quizId}`, {}, true)
          .then((response) => {
            const quizData = response.data;
            setTitle(quizData.name);
            setDescription(quizData.description);
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
  }, [get, quizId]);

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
    setTitleError("");
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleAddFolder = () => {
    setShowAddNewFolder(true);
  };

  const handleCancelAddFolder = () => {
    setNewFolderName("");
    setShowAddNewFolder(false);
  };

  const handleAddNewFolder = () => {
    if (newFolderName.trim()) {
      post(
        API_ENDPOINT.COLLECTION,
        {
          name: newFolderName.trim(),
          user: { id: userId },
        },
        true
      )
        .then(() => {
          fetchFolders();
          notification.success({
            message: "Success",
            description: MESSAGES.FOLDER_ADD_SUCCESS,
          });
        })
        .catch((error) => {
          console.error("Error adding new folder:", error);
          notification.error({
            message: "Error",
            description: MESSAGES.FOLDER_ADD_ERROR,
          });
        })
        .finally(() => {
          setNewFolderName("");
          setShowAddNewFolder(false);
        });
    }
  };

  const handleSave = async (event) => {
    event.preventDefault();
    if (!title) setTitleError(MESSAGES.TITLE_REQUIRED);
    if (!folder) setFolderError(MESSAGES.FOLDER_REQUIRED);
    if (!titleError && !folderError && title && folder) {
      await put(
        API_ENDPOINT.QUIZDETAIL,
        {
          id: quizId,
          name: title,
          description: description,
          coverImage: selectedImage,
          status: "CREATED",
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
          navigate("/library");
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
          left: "48%",
          bgcolor: "#FFFFFF",
          height: 703,
          p: 2,
          width: 921,
          transform: "translate(-50%, -50%)",
          borderRadius: "20px",
          display: "flex",
        }}
      >
        <Box display="flex" width="100%">
          <Box width="50%" p={2} display="flex" flexDirection="column">
            <TextFields
              label="Title"
              variant="outlined"
              placeholder="Enter Title..."
              value={title}
              onChange={handleTitleChange}
              inputProps={{ maxLength: 20 }}
              fullWidth
              showError={!!titleError}
              errorMessage={titleError}
            />
            <TextFields
              label="Description (Optional)"
              variant="outlined"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              inputProps={{ maxLength: 200 }}
              multiline
              rows={4}
              sx={{
                "& .MuiOutlinedInput-root": {
                  height: "130px",
                },
              }}
              fullWidth
            />
            <Typography>Save to</Typography>
            <FormControl fullWidth>
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
                {folders.length === 0 ? (
                  <>
                    <MenuItem>
                      <Typography
                        sx={{
                          color: "#E93E3A",
                          display: "flex",
                          alignItems: "center",
                          fontSize: "16px",
                          gap: 1,
                        }}
                        onClick={handleAddFolder}
                      >
                        <CreateNewFolderIcon />
                        Add new folder
                      </Typography>
                    </MenuItem>
                    <MenuItem>
                      {showAddNewFolder && (
                        <TextField
                          style={{
                            width: "100%",
                          }}
                          value={newFolderName}
                          onChange={(e) => setNewFolderName(e.target.value)}
                          onBlur={handleCancelAddFolder}
                          onKeyDown={(e) => {
                            if (e.key === "Enter") {
                              handleAddNewFolder();
                            } else if (e.key === "Escape") {
                              handleCancelAddFolder();
                            }
                          }}
                          autoFocus
                          size="small"
                          placeholder="Folder name"
                        />
                      )}
                    </MenuItem>
                  </>
                ) : (
                  folders.map((f) => (
                    <MenuItem key={f.id} value={f}>
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        <Folder />
                        <Typography sx={{ ml: 1 }}>{f.name}</Typography>
                      </Box>
                    </MenuItem>
                  ))
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
          </Box>
          <Box
            width="50%"
            display="flex"
            flexDirection="column"
            alignItems="center"
          >
            <Typography marginTop={3} fontSize="16px" alignItems="left">
              Cover Image
            </Typography>
            <Box
              borderRadius={2}
              component="img"
              src={selectedImage}
              alt="Selected Cover"
              width="400px"
              height="320px"
              mb={2}
              sx={{
                objectFit: "cover",
                objectPosition: "center",
              }}
            />
            <Box display="flex" justifyContent="center" gap={1}>
              {imageList.map((image, index) => (
                <Box
                  key={index}
                  borderRadius={2}
                  component="img"
                  src={image}
                  alt={`Thumbnail ${index + 1}`}
                  width="94px"
                  height="94px"
                  onClick={() => setSelectedImage(image)}
                  sx={{
                    cursor: "pointer",
                    border:
                      selectedImage === image
                        ? "2px solid #E93E3A"
                        : "2px solid transparent",
                  }}
                />
              ))}
            </Box>
          </Box>
        </Box>
        <Grid
          container
          display="flex"
          justifyContent="center"
          width="100%"
          mt={18}
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
          <Button name="Save" width="196px" onClick={handleSave} />
        </Grid>
      </Box>
    </Modal>
  );
};

export default PopupModel;

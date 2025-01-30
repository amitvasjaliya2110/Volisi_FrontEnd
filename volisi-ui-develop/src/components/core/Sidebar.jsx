import { useState,useContext } from "react";
import Button from "./Button";
import { Folder, Add, ExpandMore, ExpandLess } from "@mui/icons-material";
import { API_ENDPOINT, MESSAGES } from "../../constants/constants";
import {
  Collapse,
  List,
  ListItem,
  ListItemText,
  TextField,
  IconButton,
  Typography,
  Box,
  Paper,
  Grid,
} from "@mui/material";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import ReportIcon from "@mui/icons-material/Report";
import { useNavigate } from "react-router-dom";
import useAxios from "../../app/hooks/useAxios";
import { notification } from "antd";
import volisiContext from "../../app/contexts/VolisiContext";

const Sidebar = () => {
  const { post } = useAxios();
  const [selectedTab, setSelectedTab] = useState("library");
  const [open, setOpen] = useState(true);
  const { folders, fetchFolders } = useContext(volisiContext);
  const [newFolderName, setNewFolderName] = useState("");
  const [addingFolder, setAddingFolder] = useState(false);
  const [showFolders, setShowFolders] = useState(true);
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");

  const handleTabClick = (tab) => {
    setSelectedTab(tab);
    if (tab === "library") {
      setOpen(true);
      setShowFolders(true);
      navigate("/library");
    } else if (tab === "report") {
      setOpen(false);
      setShowFolders(false);
      navigate("/reportlist");
    }
  };

  const handleAddFolder = () => {
    setAddingFolder(true);
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
          setAddingFolder(false);
        });
      setTimeout(() => {
        window.location.reload(false);
      }, 1000);
    }
  };

  const handleCancelAddFolder = () => {
    setNewFolderName("");
    setAddingFolder(false);
  };

  const toggleFolders = () => {
    setShowFolders(!showFolders);
  };

  const handleFolderClick = (folderName, folderId) => {
    navigate(`/folders/${folderId}`, { state: { folderName } });
  };

  const handleMyFolderClick = (e) => {
    e.stopPropagation();
    navigate("/folderlist");
  };

  return (
    <Box className="flex flex-col h-screen">
      <Box className="flex flex-row flex-1">
        <Paper
          className="w-60 p-4 bg-white border-r border-gray-200 flex flex-col h-full"
          sx={{ borderRadius: 0 }}
        >
          <Button
            className="mb-2 h-12"
            name={
              <Box display="flex" justifyContent="flex-start">
                <LibraryBooksIcon className="mr-2" />
                <Typography className="text-base ml-2">Library</Typography>
              </Box>
            }
            backgroundColor={selectedTab === "library" ? "#71717A" : "#FFFFFF"}
            fontColor={selectedTab === "library" ? "#FFFFFF" : "#000000"}
            onClick={() => handleTabClick("library")}
            padding="8px 16px"
            sx={{
              borderRadius: "4px",
              display: "flex",
              justifyContent: "flex-start",
              padding: "0px 16px",
            }}
          />
          <Typography style={{ marginBottom: "4px" }}></Typography>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <List
              component="div"
              disablePadding
              className="bg-[#FEF3E7] p-2 rounded"
            >
              <ListItem className="flex items-center h-12" sx={{padding: "0 0 0 16px"}}>
                <ListItemText
                  primary={
                    <Grid
                      className="flex flex-col items-center"
                      justifyContent={"space-between"}
                    >
                      <Grid className="flex flex-col">
                        {showFolders ? (
                          <ExpandLess
                            onClick={toggleFolders}
                            style={{ marginRight: "8px", fill: "#E93E3A", cursor:"pointer" }}
                          />
                        ) : (
                          <ExpandMore
                            onClick={toggleFolders}
                            style={{ marginRight: "8px", fill: "#E93E3A", cursor:"pointer" }}
                          />
                        )}
                        <Typography
                          className="text-base"
                          sx={{cursor:"pointer"}}
                          onClick={handleMyFolderClick}
                        >
                          My Folder
                        </Typography>
                      </Grid>
                      <Grid>
                        <IconButton onClick={handleAddFolder}>
                          <Add
                            style={{ fill: "#E93E3A" }}
                          />
                        </IconButton>
                      </Grid>
                    </Grid>
                  }
                />
              </ListItem>

              <Collapse in={showFolders} timeout="auto" unmountOnExit>
                {folders.map((folder, index) => (
                  <ListItem
                  sx={{cursor:"pointer"}}
                    key={index}
                    className="h-12"
                    style={{
                      backgroundColor: "#FFFFFF",
                      display: "flex",
                      justifyContent: "flex-start",
                    }}
                    onClick={() => handleFolderClick(folder.name, folder.id)}
                  >
                    <Folder className="mr-4" />
                    <ListItemText
                      primary={
                        <Box className="flex justify-start">
                          <Typography className="text-base truncate">
                            {folder.name}
                          </Typography>
                        </Box>
                      }
                    />
                  </ListItem>
                ))}
              </Collapse>
            </List>
            {addingFolder && (
              <ListItem className="pl-3 pr-3 pb-1 h-12">
                <TextField
                  style={{
                    flex: 1,
                    height: "10%",
                    position: "absolute",
                    top: 6,
                    left: 0,
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
              </ListItem>
            )}
          </Collapse>
          <Button
            className="mt-2 h-12"
            name={
              <Box
                display="flex"
                alignItems="center"
                justifyContent="flex-start"
              >
                <ReportIcon className="mr-2" />
                <Typography className="text-base ml-2">Report</Typography>
              </Box>
            }
            backgroundColor={selectedTab === "report" ? "#71717A" : "#FFFFFF"}
            fontColor={selectedTab === "report" ? "#FFFFFF" : "#000000"}
            onClick={() => handleTabClick("report")}
            padding="8px 16px"
            sx={{
              borderRadius: "4px",
              display: "flex",
              justifyContent: "flex-start",
              padding: "0px 16px",
            }}
          />
        </Paper>
      </Box>
    </Box>
  );
};

export default Sidebar;

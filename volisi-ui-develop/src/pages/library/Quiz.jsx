import React, { useState } from "react";
import { Card, Typography, Grid, Box, IconButton } from "@mui/material";
import ShareIcon from "@mui/icons-material/Share";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Button from "../../components/core/Button";
import ActionItems from "../../components/core/ActionItems";
import EditIcon from "@mui/icons-material/Edit";
import DriveFileMoveIcon from "@mui/icons-material/DriveFileMove";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import CardImage from "../../assets/images/cardImg.jpg";
import useAxios from "../../app/hooks/useAxios";
import { API_ENDPOINT } from "../../constants/constants";
import { notification } from "antd";
import { useNavigate } from "react-router-dom";
import { Folder } from "@mui/icons-material";
import MoveQuizModel from "./MoveQuizModel";

const Quiz = ({ title, plays, questions, status, id, folderName, coverImage }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [visible, setVisible] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const { del } = useAxios();
  const navigate = useNavigate();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMove = () => {
    localStorage.setItem("quizId", id);
    setIsOpen(true);
    handleClose();
  };

  const handleDelete = async ({ id }) => {
    await del(`${API_ENDPOINT.DELETE_QUIZ}/${id}`, true)
      .then(() => {
        notification.success({
          message: "Success",
          description: "Delete successfully",
        });
        setVisible(false);
      })
      .catch(() => {
        notification.error({
          message: "Error",
          description: "Something went wrong",
        });
      });
  };

  const menuItems = [
    {
      name: "Edit",
      icon: EditIcon,
      iconClass: "text-[#18181B]",
      textClass: "",
      onClick: () => {
        localStorage.setItem("quizId", id);
        navigate(`/quiz`);
      },
    },
    {
      name: "Move",
      icon: DriveFileMoveIcon,
      iconClass: "text-[#18181B]",
      textClass: "",
      onClick: () => {
        handleMove();
      },
    },
    {
      name: "Delete",
      icon: DeleteForeverIcon,
      iconClass: "text-[#EF4444]",
      textClass: "text-[#E93E3A]",
      onClick: () => {
        handleDelete({ id });
        handleClose();
      },
    },
  ];

  const filteredMenuItems =
    status === "DRAFT"
      ? menuItems.filter(
          (item) => item.name === "Edit" || item.name === "Delete"
        )
      : menuItems;

  return (
    visible && (
      <Card
        className="p-2 m-[12px] shadow-[1px_1px_1px_1px_rgba(0,0,0,0.11)]"
        onDoubleClick={() => navigate(`/quiz/${id}`)}
      >
        <Grid container justifyContent={"space-between"}>
          <Grid item display={"flex"} flexDirection={"row"}>
            <Grid marginRight={"16px"}>
              <Box
                component="img"
                className="h-[66px] w-[103px] rounded-[9%] object-cover"
                alt={title}
                src={coverImage}
              />
            </Grid>
            <Grid>
              <Typography variant="h6" sx={{ marginBottom: 1.6 }}>
                {title}
                {status === "DRAFT" && (
                  <Grid
                    component="span"
                    sx={{
                      marginLeft: 2,
                      fontSize: "13px",
                      fontColor: "#3F3F46",
                      border: "1px solid #FEF3E7",
                      backgroundColor: "#FEF3E7",
                      borderRadius: "5px",
                      padding: "2.5px 7px 2.5px 7px",
                    }}
                  >
                    {status}
                  </Grid>
                )}
              </Typography>
              <Typography variant="body2">
                {plays || "0"} Plays | {questions || "0"} Questions |{" "}
                {folderName && <Folder sx={{ marginBottom: "4px" }} />}{" "}
                {folderName}
              </Typography>
            </Grid>
          </Grid>
          <Grid item className="flex justify-end items-center">
            {status === "CREATED" && (
              <>
                <Button
                  name="Play"
                  backgroundColor="#FEF3E7"
                  fontColor="#E93E3A"
                  width="99px"
                />
              </>
            )}
            <IconButton aria-label="settings" onClick={handleClick}>
              <MoreVertIcon />
            </IconButton>
          </Grid>
        </Grid>
        <ActionItems
          anchorEl={anchorEl}
          handleClose={handleClose}
          menuItems={filteredMenuItems}
        />
        {isOpen && <MoveQuizModel isOpen={isOpen} setIsOpen={setIsOpen} />}
      </Card>
    )
  );
};

export default Quiz;

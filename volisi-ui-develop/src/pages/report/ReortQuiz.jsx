/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useState } from "react";
import { Card, Grid, Box, IconButton, Typography } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ActionItems from "../../components/core/ActionItems";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import CardImage from "../../assets/images/cardImg.jpg";
import DownloadIcon from "@mui/icons-material/Download";
import ReplayCircleFilledIcon from "@mui/icons-material/ReplayCircleFilled";
import CustomizableModal from "../../components/core/CustomizableModal.jsx";
import useAxios from "../../app/hooks/useAxios.js";
import { API_ENDPOINT } from "../../constants/constants.js";

const ReortQuiz = ({ title, plays, id }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const { del, get } = useAxios();

  const deleteQuizReport = async () => {
    try {
      const response = await del(`${API_ENDPOINT.PLAYER_QUIZ}/${id}`, true);
    } catch (error) {
      console.error("Error fetching quizzes:", error);
    }
    setTimeout(() => {
      window.location.reload(false);
    }, 1000);
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDeleteClick = () => {
    setShowDeleteModal(true);
    handleClose();
  };

  const handleDeleteConfirm = () => {
    deleteQuizReport();
    setShowDeleteModal(false);
  };

  const handleDeleteCancel = () => {
    setShowDeleteModal(false);
  };

  const menuItems = [
    {
      name: "Play Again",
      icon: ReplayCircleFilledIcon,
      iconClass: "text-[#18181B]",
      textClass: "",
      onClick: () => {
        handleClose();
      },
    },
    {
      name: "Download",
      icon: DownloadIcon,
      iconClass: "text-[#18181B]",
      textClass: "",
      onClick: () => {
        handleClose();
      },
    },
    {
      name: "Delete",
      icon: DeleteForeverIcon,
      iconClass: "text-[#EF4444]",
      textClass: "text-[#7F1D1D]",
      onClick: handleDeleteClick,
    },
  ];

  return (
    <>
      <Card className="p-2 m-[12px] shadow-[1px_1px_1px_1px_rgba(0,0,0,0.11)]">
        <Grid container justifyContent={"space-between"}>
          <Grid item display={"flex"} flexDirection={"row"}>
            <Grid marginRight={"16px"}>
              <Box
                component="img"
                className="h-[66px] w-[103px] rounded-[9%] object-cover"
                alt={title}
                src={CardImage}
              />
            </Grid>
            <Grid>
              <Typography variant="h6" sx={{ marginBottom: 1.6 }}>
                {title}
              </Typography>
              <Typography variant="body2">
                Numbers Of Players: {plays || "0"} Plays
              </Typography>
            </Grid>
          </Grid>
          <IconButton aria-label="settings" onClick={handleClick}>
            <MoreVertIcon />
          </IconButton>
        </Grid>
        <ActionItems
          anchorEl={anchorEl}
          handleClose={handleClose}
          menuItems={menuItems}
        />
      </Card>

      <CustomizableModal
        open={showDeleteModal}
        handleClose={handleDeleteCancel}
        handleConfirm={handleDeleteConfirm}
        modalText="Are you sure you want to delete this Report?"
        additionalText={title}
        button1Text="Cancel"
        button1Action={handleDeleteCancel}
        button2Text="Delete"
        button2Action={handleDeleteConfirm}
      />
    </>
  );
};

export default ReortQuiz;

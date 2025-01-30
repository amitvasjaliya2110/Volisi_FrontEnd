import React from "react";
import { Box, Modal } from "@mui/material";
import theme1 from "../../assets/images/theme/theme1.svg";
import theme2 from "../../assets/images/theme/theme2.svg";
import theme3 from "../../assets/images/theme/theme3.svg";
import theme4 from "../../assets/images/theme/theme4.svg";

const modalStyle = {
  position: "absolute",
  top: 159,
  left: 968,
  width: 456,
  height: 456,
  bgcolor: "#FFFFFF",
  borderRadius: "8px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

const gridContainerStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(2, 1fr)",
  gridTemplateRows: "repeat(2, 1fr)",
  gap: "16px",
};

const squareStyle = {
  width: "200px",
  height: "200px",
};

const imgStyle = {
  width: "100%",
  height: "100%",
  borderRadius: "12px",
  cursor: "pointer",
};

const BackgroundImagePicker = ({ open, handleClose, handleThemeChange }) => {
  const themes = [theme1, theme2, theme3, theme4];

  const selectTheme = (themeUrl) => {
    handleThemeChange(themeUrl);
    handleClose();
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="background-image-picker-title"
      aria-describedby="background-image-picker-description"
    >
      <Box sx={modalStyle}>
        <Box sx={gridContainerStyle}>
          {themes.map((theme, index) => (
            <Box
              key={index}
              sx={squareStyle}
              onClick={() => selectTheme(theme)}
            >
              <img src={theme} alt={`theme ${index + 1}`} style={imgStyle} />
            </Box>
          ))}
        </Box>
      </Box>
    </Modal>
  );
};

export default BackgroundImagePicker;

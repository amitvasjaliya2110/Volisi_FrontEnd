/* eslint-disable react/prop-types */
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Grid from "@mui/material/Grid";
import Button from "./Button";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 392,
  height: 190,
  borderRadius: "20px",
  bgcolor: "#FAFAFA",
  p: 4,
};

const textStyle = {
  fontSize: "24px",
  fontWeight: 700,
  lineHeight: "28.8px",
  textAlign: "center",
  color: "#71717A",
};

const textBoxStyle = {
  width: 312,
  height: 58,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};
const additionalTextStyle = {
  fontSize: "16px",
  alignItems: "center",
  display: "flex",
  justifyContent: "center",
};

const CustomizableModal = ({
  open,
  handleClose,
  handleConfirm,
  modalText,
  additionalText,
  button1Text,
  button1Action,
  button2Text,
  button2Action,
}) => {
  const handleAction = async () => {
    if (button2Action) {
      await button2Action();
    }
    handleClose();
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Grid container spacing={2} direction="column">
          <Grid item>
            <Box sx={textBoxStyle}>
              <Typography id="modal-modal-description" sx={textStyle}>
                {modalText}
              </Typography>
            </Box>
            <Box sx={additionalTextStyle}>
              <Typography sx={{ color: "#71717A" }}>
                {additionalText}
              </Typography>
            </Box>
          </Grid>
          <Grid item>
            <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
              <Button
                variant="outlined"
                onClick={handleClose}
                sx={{
                  width: "150px",
                  height: "48px",
                  borderColor: "#71717A",
                  marginRight: "12px",
                }}
                backgroundColor="#FFFFFF"
                fontColor="#000000"
                name={button1Text}
              />
              <Button
                name={button2Text}
                onClick={handleAction}
                backgroundColor="#D32F2F"
                fontColor="#FFFFFF"
                sx={{
                  width: "150px",
                  height: "48px",
                }}
              />
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Modal>
  );
};

export default CustomizableModal;

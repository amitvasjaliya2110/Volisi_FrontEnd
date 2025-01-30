import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Grid from "@mui/material/Grid";
import Button from "./Button";
import { API_ENDPOINT, MESSAGES } from "../../constants/constants";
import useAxios from "../../app/hooks/useAxios";
import { message } from "antd";
import { useNavigate } from "react-router-dom";

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

const ConfirmationModal = ({ open, handleClose, handleConfirm }) => {
  const navigate = useNavigate();
  const { post } = useAxios();
  const handleLogout = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No valid token found.");
      }
      await post(API_ENDPOINT.LOGOUT, null, true);
      localStorage.clear();
      handleConfirm();
    } catch (error) {
      // message.error(MESSAGES.LOGOUT_ERROR);
      localStorage.clear();

      navigate("/login");
      handleClose();
    }
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
                Are you sure
                <br />
                you want to log out?
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
                name="Cancel"
              />
              <Button
                name="Logout"
                onClick={() => handleLogout()}
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

export default ConfirmationModal;

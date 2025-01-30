import { useState } from "react";
import { Grid } from "@mui/material";
import Button from "../../components/core/Button";
import { useNavigate } from "react-router-dom";
import PopupModel from "./CreateQuizModel";

const CreateQuizHeader = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const handleSave = () => {
    setOpen(true);
  };
  return (
    <Grid container spacing={2} alignItems="center" justifyContent="flex-end">
      <Grid item>
        <Button
          sx={{
            height: "48px",
            padding: "8px 16px 8px 16px",
            borderRadius: "12px",
            border: "1px solid #E93E3A",
          }}
          name="cancel"
          backgroundColor="#FFFFFF"
          fontColor="#E93E3A"
          width="147px"
          onClick={() => navigate("/library")}
        />
      </Grid>
      <Grid item>
        <Button
          sx={{
            height: "48px",
            padding: "8px 16px",
          }}
          name="Save"
          width="147px"
          onClick={() => {
            handleSave();
          }}
        />
      </Grid>
      {open && <PopupModel isOpen={open} setOpen={setOpen} />}
    </Grid>
  );
};

export default CreateQuizHeader;

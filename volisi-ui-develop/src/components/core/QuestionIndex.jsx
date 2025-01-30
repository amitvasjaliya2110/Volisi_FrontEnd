import { Typography } from "@mui/material";
import Box from "@mui/material/Box";

let currentQuestion = 2;
let totalQuestion = 10;
const QuestionIndex = () => {
  return (
    <Box
      sx={{
        width: "164px",
        height: "32px",
        padding: "8px 16px",
        borderRadius: "12px",
        backgroundColor: "rgba(254, 243, 231, 0.06)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "absolute",
        backdropFilter: "blur(206px)",
      }}
    >
      <Typography
        sx={{
          fontWeight: 400,
          fontSize: "16px",
          align: "center",
          color: "#FFFFFF",
        }}
      >
        Questions: {currentQuestion}/{totalQuestion}
      </Typography>
    </Box>
  );
};

export default QuestionIndex;

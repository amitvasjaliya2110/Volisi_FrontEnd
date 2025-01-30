import QuizImg from "../../assets/images/QuizImg.png";
import { Card, CardContent, CardMedia, Grid, Typography } from "@mui/material";
import Button from "../../components/core/Button";
import { API_ENDPOINT } from "../../constants/constants";
import { useNavigate } from "react-router-dom";
import useAxios from "../../app/hooks/useAxios";
import { notification } from "antd";
function OnboardCard() {
  const navigate = useNavigate();
  const { post } = useAxios();
  const handleCreateQuiz = () => {
    const userId = localStorage.getItem("userId");
    if (!userId) {
      console.error("User ID not found in local storage");
      return;
    }

    const quizData = {
      name: "Volisi Quiz " + Math.floor(Math.random() * 1000),
      description: "This is Volisi quiz",
      coverImage: "https://example.com/sample_cover_image.jpg",
      status: "DRAFT",
      user: {
        id: userId,
      },
    };

    post(API_ENDPOINT.QUIZDETAIL, quizData, true)
      .then((response) => {
        const quizId = response.data.id;
        localStorage.setItem("quizId", quizId);
        navigate("/quiz");
      })
      .catch((error) => {
        console.error("Error creating quiz:", error);
        notification.error({
          message: "Quiz Creation Failed",
          description:
            "There was an error creating the quiz. Please try again later.",
        });
      });
  };
  return (
    <Grid className="flex justify-center text-center content-center m-20">
      <Card className="rounded-e-2xl w-10/12" elevation={0}>
        <Grid display={"flex"} justifyContent={"center"}>
          <CardMedia
            component="img"
            aligncontent="center"
            image={QuizImg}
            alt="Create Quiz"
            sx={{
              width: "268px",
              height: "236px",
            }}
          />
        </Grid>
        <CardContent>
          <Typography variant="h5" component="div">
            Create custom quizzes
          </Typography>
          <Typography
            variant="body2"
            sx={{
              margin: "8px 8px 40px 8px",
              maxWidth: "500px",
            }}
          >
            Ready to test your knowledge? Dive into our interactive quizzes!
            Create custom quizzes on topics you love.
          </Typography>
          <Grid textAlign={"center"} padding={1}>
            <Button
              name="Create Quiz"
              width="auto"
              sx={{ padding: "8px 32px" }}
              onClick={handleCreateQuiz}
            />
          </Grid>
        </CardContent>
      </Card>
    </Grid>
  );
}

export default OnboardCard;

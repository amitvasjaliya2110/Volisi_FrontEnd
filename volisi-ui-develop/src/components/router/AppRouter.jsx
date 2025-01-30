import { Navigate, useRoutes } from "react-router-dom";
import Register from "../../pages/user/registration/Register";
import Login from "../../pages/user/login/Login";
import MainLayout from "../core/MainLayout";
import ForgotPassword from "./../../pages/user/forgotpassword/ForgotPassword";
import OtpVerification from "./../../pages/user/forgotpassword/OtpVerification";
import CreateNewPassword from "./../../pages/user/forgotpassword/CreateNewPassword";
import OnBoardScreen from "./../../pages/onboardscreen/OnBoardScreen";
import ChangePassword from "../../pages/user/profile/ChangePassword";
import AdminLayout from "../core/AdminLayout";
import QuizDetailsScreen from "../../pages/library/QuizDetailsScreen";
import FolderList from "../core/FolderList";
import ShareOtp from "../core/ShareOtp.jsx";
import PlayQuizCard from "../core/PlayQuizCard.jsx";
import GameCard from "../core/GameCard.jsx";
import QuestionPreviewPage from "../../pages/preview/QuestionPreviewPage.jsx";
import GamePinCard from "../core/GamePinCard.jsx";
import WaitingPlayerCard from "../core/WaitingPlayerCard.jsx";

import FolderQuiz from "../../pages/library/FolderQuiz.jsx";
import CreateQuizSidebar from "../core/CreateQuizSidebar.jsx";
import Quiz from "../../pages/createquiz/Quiz";
import NotFound from "../../pages/NotFound.jsx";
import PlayerWaitingListCard from "../core/PlayerWaitingListCard.jsx";
import ReportDetails from "../../pages/reports/ReportDetails.jsx";
import PlayerQuestionAnswer from "../../pages/player/PlayerQuestionAnswer.jsx";
import PlayerQuizLayout from "../../pages/player/PlayerQuizLayout.jsx";
import EnterPIN from "../../pages/Players/EnterPIN.jsx";
import EnterName from "../../pages/Players/EnterName.jsx";
import QuestionList from "../core/QuestionList.jsx";
import PlayerLayout from "../core/PlayerLayout.jsx";
import IncorrectAnswerScreen from "../core/IncorrectAnswerScreen.jsx";
import TimesUpAnswerScreen from "../core/TimesUpAnswerScreen.jsx";
import QuestionIndex from "../core/QuestionIndex.jsx";
import PlayerViewLayout from "../../pages/Players/PlayerViewLayout.jsx";
import CorrectAnswerScreen from "../core/CorrectAnswerScreen.jsx";
import ReportQuizList from "../../pages/report/ReportQuizList.jsx";
import RankCard from "../core/RankCard.jsx";
import PlayerRankLabelCard from "../core/PlayerRankLableCard.jsx";
import PlayerFinalScoreCard from "../core/PlayerFinalScoreCard.jsx";
import ScoreboardLabelCard from "../core/ScoreboardLabelCard.jsx";
import PlayerScoreboardCard from "../core/PlayerScoreboardCard.jsx";
import WinnerRankCard from "../core/WinnerRankCard.jsx";
export default function AppRouter() {
  const token = localStorage.getItem("token");
  const tokenExpiryTime = localStorage.getItem("tokenExpiryTime");

  const isAuthenticated =
    token && tokenExpiryTime && new Date(tokenExpiryTime) > new Date();

  const protectedRoutes = [
    "/change-password",
    "/library",
    "/folderlist",
    "/quiz",
    "/folders/:folderId",
  ];
  const pathname = window.location.pathname;
  const isProtectedRoute = protectedRoutes.includes(pathname);

  if (isProtectedRoute && !isAuthenticated) {
    localStorage.clear();
  }

  const AppRoutes = [
    {
      path: "/",
      element: <OnBoardScreen onBoardHeader={true} />,
    },
    {
      path: "/register",
      element: <MainLayout PageComponent={<Register />} />,
    },
    {
      path: "/login",
      element: <MainLayout PageComponent={<Login />} />,
    },
    {
      path: "/OtpVerification",
      element: <MainLayout PageComponent={<OtpVerification />} />,
    },
    {
      path: "/create-new-password",
      element: <MainLayout PageComponent={<CreateNewPassword />} />,
    },
    {
      path: "/forgot-password",
      element: <MainLayout PageComponent={<ForgotPassword />} />,
    },
    {
      path: "/change-password",
      element: isAuthenticated ? (
        <AdminLayout PageComponent={<ChangePassword />} />
      ) : (
        <Navigate to="/login" />
      ),
    },
    {
      path: "/library",
      element: isAuthenticated ? <AdminLayout /> : <Navigate to="/login" />,
    },
    {
      path: "/folderlist",
      element: isAuthenticated ? (
        <AdminLayout PageComponent={<FolderList />} />
      ) : (
        <Navigate to="/login" />
      ),
    },
    {
      path: "/quiz-header",
      element: isAuthenticated ? (
        <CreateQuizSidebar />
      ) : (
        <Navigate to="/login" />
      ),
    },
    {
      path: "/quiz",
      element: isAuthenticated ? <Quiz /> : <Navigate to="/login" />,
    },
    {
      path: "/share-otp",
      element: (
        <ShareOtp
          FirstComponent={<PlayQuizCard />}
          SecondComponent={<GameCard />}
        />
      ),
    },
    {
      path: "/folders/:folderId",
      element: isAuthenticated ? (
        <AdminLayout PageComponent={<FolderQuiz />} />
      ) : (
        <Navigate to="/login" />
      ),
    },
    {
      path: "/quiz/:id",
      element: <AdminLayout PageComponent={<QuizDetailsScreen />} />,
    },
    {
      path: "/quizdetails",
      element: <AdminLayout PageComponent={<ReportDetails />} />,
    },
    {
      path: "/quiz/preview",
      element: <QuestionPreviewPage />,
    },
    {
      path: "/player-question-answer",
      element: (
        <PlayerQuizLayout
          PageComponent={
            <PlayerQuestionAnswer
              type="description"
              content={["Option 1", "Option 2", "Option 3", "Option 4"]}
            />
          }
        />
      ),
    },
    {
      path: "/enterpin",
      element: <PlayerViewLayout PageComponent={<EnterPIN />} />,
    },
    {
      path: "/entername",
      element: <PlayerViewLayout PageComponent={<EnterName />} />,
    },
    {
      path: "/questionList",
      element: <AdminLayout PageComponent={<QuestionList />} />,
    },
    {
      path: "/reportlist",
      element: <AdminLayout PageComponent={<ReportQuizList />} />,
    },
    {
      path: "/correctAnswer",
      element: (
        <PlayerLayout
          PlayerPageComponent={<CorrectAnswerScreen />}
          QuestionIndexComponent={<QuestionIndex />}
        />
      ),
    },
    {
      path: "/incorrectAnswer",
      element: (
        <PlayerLayout
          PlayerPageComponent={<IncorrectAnswerScreen />}
          QuestionIndexComponent={<QuestionIndex />}
        />
      ),
    },
    {
      path: "/timesUpAnswer",
      element: (
        <PlayerLayout
          PlayerPageComponent={<TimesUpAnswerScreen />}
          QuestionIndexComponent={<QuestionIndex />}
        />
      ),
    },
    {
      path: "/playerRank",
      element: (
        <RankCard
          FirstComponent={<PlayerRankLabelCard />}
          SecondComponent={<PlayerFinalScoreCard />}
        />
      ),
    },
    {
      path: "*",
      element: <NotFound />,
    },
    {
      path: "/scoreboard",
      element: (
        <ShareOtp
          FirstComponent={<ScoreboardLabelCard />}
          SecondComponent={<PlayerScoreboardCard />}
        />
      ),
    },
    {
      path: "/player-waiting-list",
      element: (
        <ShareOtp
          FirstComponent={<GamePinCard />}
          SecondComponent={<PlayerWaitingListCard />}
        />
      ),
    },
    {
      path: "/winner-rank",
      element: (
        <RankCard
          FirstComponent={<PlayerRankLabelCard showButtons={true} />}
          SecondComponent={<WinnerRankCard />}
        />
      ),
    },
    {
      path: "/player-waiting",
      element: (
        <ShareOtp
          FirstComponent={<GamePinCard />}
          SecondComponent={<WaitingPlayerCard />}
        />
      ),
    },
  ];

  const router = useRoutes(AppRoutes);
  return <>{router}</>;
}

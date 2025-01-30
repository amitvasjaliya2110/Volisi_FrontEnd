export const API_ENDPOINT = {
  LOGIN: "/auth/login",
  COLLECTION: "/collection",
  USERS: "/user",
  REGISTER: "/user",
  VERIFY_OTP: "/auth/otp/verify",
  FORGOT_PASSWORD: "/user/username",
  OTP_GENERATE: "/auth/otp/generate",
  LOGOUT: "/auth/logout",
  DASHBOARD_FILTER: "/dashboard/filter",
  QUIZ_BY_STATUS: "/quiz/user",
  DELETE_QUIZ: "/quiz",
  QUESTION_TYPE: "/question/types",
  QUESTION: "/questions",
  QUESTIONS_LIST: "/questions/quiz",
  FOLDER_QUIZ: "/quiz/getQuizByCollectionAndUser",
  QUIZDETAIL: "/quiz",
  PLAYER_QUIZ: "/player/quiz",
  PIN_VERIFY: "/player/quiz/pin/verify",
  PLAYER_QUIZ: "/player/quiz",
};
export const AXIOS_CLIENT = {
  CONTENT_TYPE: "application/json",
};

export const SEARCH_DROPDOWN = {
  QUIZ: "Quiz",
  FOLDER: "Folders",
};

export const ONBOARD_SCREEN_TITLE = {
  quizTitle: "Create Your Own Quiz",
  codeTitle: "Share Code to Player",
  reportTitle: "View Report Briefly",
  title: "Create custom quizzes, engage audiences!",
};

export const ONBOARD_SCREEN_DESCRIPTION = {
  quizDescription:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer condimentum consectetur adipiscing elit.",
  codeDescription:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer condimentum consectetur adipiscing elit.",
  reportDescription:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer condimentum consectetur adipiscing elit.",
  description:
    "Ready to test your knowledge? Dive into our interactive quizzes! Create custom quizzes on topics you love -geography, history, pop culture, and more.",
};

export const DATA_KEY = "text/plain";
export const REGEX = {
  OTP: /^[0-9]*$/,
  EMAIL: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
  PASSWORD: /^(?=.*[0-9])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,}$/,
};
export const MESSAGES = {
  EMAIL: "Invalid email address",
  EMAIL_REQUIRED: "Email is required",
  PASSWORD: "Your password must be as per the instructions",
  PASSWORD_REQUIRED: "Password is required",
  LOGIN_ERROR: "User not found. please register yourself",
  LOGIN_SUCCESS: "User Login Successfully",
  CONFIRM_PASSWORD: "Both password didn't match",
  REGISTER_ERROR: "User already exists, please Login",
  REGISTER_SUCCESS: "User Register Successfully",
  OTP_ERROR: "Invalid OTP Please try again",
  OTP_SUCCESS: "OTP verified successfully!",
  PASSWORD_SUCCESS: "Password changed successfully!",
  USERNAME_NOT_FOUND_LOCALSTORAGE: "No username found in localStorage",
  USERNAME_NOT_FOUND: "Username not found. Please log in again",
  EMAIL_NOT_EXIST: "Email does not match the logged-in user",
  OTP_VERIFICATION_FAILED: "Failed to generate OTP. Please try again",
  OTP_GENERATE: "OTP Generated Successfully",
  LOGOUT_ERROR: "Logout unsuccessful",
  GENEARATE_OTP_ERROR: "Error generating OTP. Please try again",
  ERROR_VERIFY_USER: "We couldn't find an account with that email",
  FOLDER_ADD_SUCCESS: "Folder added successfully",
  FOLDER_ADD_ERROR: "Error adding new folder",
  FOLDER_UPDATE_SUCCESS: "Folder updated successfully",
  FOLDER_DELETE_SUCCESS: "Folder deleted successfully",
  FOLDER_ERROR: "Error occurs",
  FOLDER_CAN_NOT_DELETE:
    "Folder cannot be deleted due to existing dependency in Quiz.",
  TITLE_REQUIRED: "Title is required",
  FOLDER_REQUIRED: "Please select any Folder",
  INVALID_PIN: "We didn't find that game PIN.",
  VALID_PIN: "PIN verified successfully!",
  QUIZ_SAVE_ERROR: "Quiz is not save",
  QUIZ_MOVE_SUCCESS: "Quiz Move successfully.",
};
export const COLORS = {
  primary: "#E93E3A",
  secondary: "#71717A",
  error: "#FF0000",
  warning: "#ffa726",
};

export const CREATE_QUIZ = {
  QUESTION: "Enter Your Question",
  OPTION_CONTENT: [
    "Add Answer 1",
    "Add Answer 2",
    "Add Answer 2",
    "Add Answer 4",
  ],
  OPTIONS: ["A", "B", "C", "D"],
};

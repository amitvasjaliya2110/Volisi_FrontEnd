export const timeDurationItems = [
  { value: 5, label: "5 Seconds" },
  { value: 10, label: "10 Seconds" },
  { value: 15, label: "15 Seconds" },
  { value: 30, label: "30 Seconds" },
  { value: 45, label: "45 Seconds" },
  { value: 60, label: "60 Seconds" },
  { value: 75, label: "75 Seconds" },
  { value: 90, label: "90 Seconds" },
];

export const answerOptionItems = [
  { value: 1, label: "Single Answer Select" },
  { value: 2, label: "Multiple Answer Select" },
];

export const QuestionListData = [
  {
    id: 1,
    question: "Who is the national Animal 1 Multiple choice?",
    timeLimit: 90,
    points: 1000,
    questionType: {
      id: 1,
      name: "MCQ",
    },
    answerOption: {
      id: 2,
      name: "Multiple Answer Select",
    },
    questionAnswers: [
      { questionOption: "lion", correct: true, is_selected: false },
      { questionOption: "tiger", correct: false, is_selected: false },
      { questionOption: "dog", correct: true, is_selected: true },
      { questionOption: "cat", correct: false, is_selected: false },
    ],
  },
  {
    id: 2,
    question: "Who is the national Animal? SC",
    timeLimit: 90,
    points: 1000,
    questionType: {
      id: 1,
      name: "MCQ",
    },
    answerOption: {
      id: 1,
      name: "Single Answer Select",
    },
    questionAnswers: [
      { questionOption: "lion1", correct: true, is_selected: true },
      { questionOption: "tiger1", correct: false, is_selected: false },
      { questionOption: "dog1", correct: false, is_selected: false },
      { questionOption: "cat2", correct: false, is_selected: false },
    ],
  },
  {
    id: 3,
    question: "True & False? Single Choice",
    timeLimit: 10,
    points: 1000,
    questionType: {
      id: 2,
      name: "True & False",
    },
    answerOption: {
      id: 1,
      name: "Single Answer Select",
    },
    questionAnswers: [
      { questionOption: "True", correct: true, is_selected: false },
      { questionOption: "False", correct: false, is_selected: true },
    ],
  },
  {
    id: 4,
    question: "Slide",
    timeLimit: 10,
    points: 1000,
    questionType: {
      id: 3,
      name: "Slide",
    },
    answerOption: {
      id: 1,
      name: "Single Answer Select",
    },
    questionAnswers: [
      {
        questionOption: " This is a discription for question.",
        correct: false,
        is_selected: false,
      },
    ],
  },
  {
    id: 5,
    question: "Who is the national Animal? Single Choice",
    timeLimit: 90,
    points: 1000,
    questionType: {
      id: 1,
      name: "MCQ",
    },
    answerOption: {
      id: 1,
      name: "Single Answer Select",
    },
    questionAnswers: [
      { questionOption: "lion1", correct: true, is_selected: false },
      { questionOption: "tiger1", correct: false, is_selected: false },
      { questionOption: "dog1", correct: false, is_selected: true },
      { questionOption: "cat2", correct: false, is_selected: false },
    ],
  },
  {
    id: 6,
    question: "Who is the national Animal 1 Multiple choice?",
    timeLimit: 90,
    points: 1000,
    questionType: {
      id: 1,
      name: "MCQ",
    },
    answerOption: {
      id: 2,
      name: "Multiple Answer Select",
    },
    questionAnswers: [
      { questionOption: "lion", correct: true, is_selected: false },
      { questionOption: "tiger", correct: false, is_selected: false },
      { questionOption: "dog", correct: true, is_selected: true },
      { questionOption: "cat", correct: false, is_selected: false },
    ],
  },
  {
    id: 7,
    question: "Who is the national Animal? Single Choice",
    timeLimit: 90,
    points: 1000,
    questionType: {
      id: 1,
      name: "MCQ",
    },
    answerOption: {
      id: 1,
      name: "Single Answer Select",
    },
    questionAnswers: [
      { questionOption: "lion1", correct: true, is_selected: true },
      { questionOption: "tiger1", correct: false, is_selected: false },
      { questionOption: "dog1", correct: false, is_selected: false },
      { questionOption: "cat2", correct: false, is_selected: false },
    ],
  },
];

export const scoreboardData = [
  { rank: 1, name: "John", points: 2000 },
  { rank: 2, name: "Bob", points: 1850 },
  { rank: 3, name: "Alice", points: 1500 },
  { rank: 4, name: "Williams", points: 1250 },
  { rank: 5, name: "Sarah", points: 1100 },
  { rank: 6, name: "Doe", points: 950 },
  { rank: 7, name: "Jane", points: 850 },
  { rank: 8, name: "Charlie", points: 700 },
  { rank: 9, name: "Eve", points: 650 },
  { rank: 10, name: "Alex", points: 500 },
  { rank: 11, name: "Mike", points: 400 },
  { rank: 12, name: "Olivia", points: 350 },
  { rank: 13, name: "Lucas", points: 300 },
  { rank: 14, name: "Emma", points: 200 },
  { rank: 15, name: "Liam", points: 150 },
];

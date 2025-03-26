import { QuestionnaireAnswers } from "../types";

export interface Question {
  key: string;
  question: string;
  options: string[];
}

export const questions: Question[] = [
  {
    key: "gender",
    question: "What gender do you identify as?",
    options: [
      "Male",
      "Female",
      "Transgender Male",
      "Transgender Non-Binary",
      "Non-Binary",
      "Gender Queer",
      "Two-Spirit",
    ],
  },
  {
    key: "therapist",
    question: "What about your therapist?",
    options: ["Same gender as me", "Different gender", "Doesn't matter"],
  },
]; 
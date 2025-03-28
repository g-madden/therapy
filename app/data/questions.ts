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
        "Transgender Female",
        "Non-Binary",
        "Gender Queer",
        "Two-Spirit",
        "Prefer not to say",
        "Other"
      ],
    },
    {
      key: "therapist_gender_preference",
      question: "Do you have a preference for your therapist’s gender?",
      options: ["Same gender as me", "Different gender", "No preference"],
    },
    {
      key: "therapy_goals",
      question: "What are your main goals for therapy?",
      options: [
        "Managing anxiety",
        "Coping with depression",
        "Processing trauma",
        "Improving relationships",
        "Grief and loss support",
        "Building self-esteem",
        "Managing stress",
        "Career or life transitions",
        "Other"
      ],
    },
    {
      key: "previous_therapy_experience",
      question: "Have you attended therapy before?",
      options: ["Yes", "No"],
    },
    {
      key: "therapy_approach_preference",
      question: "Do you have a preferred therapy approach?",
      options: [
        "Cognitive Behavioral Therapy (CBT)",
        "Psychodynamic Therapy",
        "Mindfulness-Based Therapy",
        "Solution-Focused Therapy",
        "Eye Movement Desensitization and Reprocessing (EMDR)",
        "No preference",
        "Not sure"
      ],
    },
    {
      key: "session_format",
      question: "What type of therapy sessions do you prefer?",
      options: [
        "In-person",
        "Virtual (video calls)",
        "Phone sessions",
        "No preference"
      ],
    },
    {
      key: "frequency",
      question: "How often would you like to have therapy sessions?",
      options: [
        "Weekly",
        "Biweekly",
        "Monthly",
        "As needed",
        "Not sure"
      ],
    },
    {
      key: "communication_style",
      question: "What style of communication do you prefer from your therapist?",
      options: [
        "Direct and to the point",
        "Warm and empathetic",
        "Analytical and logical",
        "A mix of different styles",
        "Not sure"
      ],
    },
    {
      key: "life_areas",
      question: "What areas of your life do you feel need the most support?",
      options: [
        "Work and career",
        "Family relationships",
        "Romantic relationships",
        "Self-esteem and confidence",
        "Emotional regulation",
        "Social connections",
        "Life transitions",
        "Physical health and well-being",
        "Other"
      ],
    },
    {
      key: "cultural_sensitivity",
      question: "Would you prefer a therapist who shares your cultural background or specific lived experiences?",
      options: ["Yes", "No", "No preference"],
    },
    {
      key: "insurance_or_payment",
      question: "How do you plan to pay for therapy?",
      options: [
        "Health insurance",
        "Out-of-pocket",
        "Sliding scale based on income",
        "Not sure"
      ],
    },
    {
      key: "additional_notes",
      question: "Is there anything else you would like your therapist to know before your first session?",
      options: ["Open-ended text response"],
    }
];
  
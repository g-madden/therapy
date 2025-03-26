export interface Practitioner {
  id: string;
  name: string;
  image: any;
  tags: string[];
}

export interface Profile {
  id: string;
  name: string;
  image: any;
  tags: string[];
}

export interface QuestionnaireAnswers {
  gender: string;
  therapist: string;
}

export interface QuestionnaireData {
  completed: boolean;
  answers: QuestionnaireAnswers;
} 
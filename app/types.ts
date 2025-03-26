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
  age: string;
  gender: string;
  issues: string[];
  preferences: string[];
  therapistGender: string;
}

export interface QuestionnaireData {
  completed: boolean;
  answers: QuestionnaireAnswers;
} 
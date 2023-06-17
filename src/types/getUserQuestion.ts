export interface QuestionDataType {
  answers: QuestionContentType[];
  content: string;
  id: number;
  imageUrl: string;
  number: number;
}

export interface QuestionContentType {
  id: number;
  content: string;
  number: number;
}
export interface GetUserQuestionType {
  data: {
    test: {
      id: number;
      version: number;
      questions: {
        id: number;
        content: string;
        imageUrl: string;
        answers: QuestionContentType[];
      }[];
    };
  };
}

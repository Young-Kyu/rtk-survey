
export interface SurveyResponseDTO {
  formId: number;
  title: string;
  items: Array<SurveyStepDTO>;
}

export interface SurveyStepDTO {
  itemId: number;
  title: string;
  formType: 'checkbox' | 'select';
  options: Array<SelectableOptionDTO>;
}

export interface SelectableOptionDTO {
  id: number;
  text: string;
}

export interface PostUserAnswersRequestDTO {
  formId: number;
  items: Array<{ id: number; answer: string }>;
}
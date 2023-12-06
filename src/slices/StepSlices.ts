import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SurveyResponseDTO, SurveyStepDTO } from "../types/SurveyResponse.type";

interface StepSliceData {
  maxStep: number;
  currentStep: number;
  stepItem: Array<SurveyStepDTO>;
  surveyDefaultInfomation: Omit<SurveyResponseDTO, 'items'>;
  userSelectStepItem: number[][];
  isSubmitted: boolean;
}

const sliceState: StepSliceData = {
  maxStep: 0,
  currentStep: 0,
  stepItem: [],
  surveyDefaultInfomation: { formId: 0, title: '' },
  userSelectStepItem: [],
  isSubmitted: false,
};

export const stepSlice = createSlice({
  name: 'step',
  initialState: sliceState,
  reducers: {
    cleanUp: (state: StepSliceData) => {
      state.maxStep = 0;
      state.currentStep = 0;
      state.stepItem = [];
      state.surveyDefaultInfomation = { formId: 0, title: '' }
      state.userSelectStepItem = [];
      state.isSubmitted = false;
    },
    setStepInfo: (state: StepSliceData, { payload }: PayloadAction<SurveyResponseDTO>) => {
      state.maxStep = payload.items.length;
      state.stepItem = payload.items;
      state.surveyDefaultInfomation = { formId: payload.formId, title: payload.title }
    },
    stepCleanUp: (state: StepSliceData) => {
      state.maxStep = 0;
      state.currentStep = 0;
      state.stepItem = [];
    },
    setSelectedVoteItem: (state: StepSliceData, { payload }: PayloadAction<{ stepId: number, items: number[] }>) => {
      state.userSelectStepItem[payload.stepId] = payload.items;
    },
    setCurrentStep: (state: StepSliceData, { payload }: PayloadAction<number>) => {
      state.currentStep = payload;
    },
    setIsSubmitted: (state: StepSliceData, { payload }: PayloadAction<boolean>) => {
      state.isSubmitted = payload;
    }
  }
});

export const { actions, reducer } = stepSlice;

export const {
  setStepInfo,
  stepCleanUp,
  setSelectedVoteItem,
  setCurrentStep,
  cleanUp,
  setIsSubmitted
} = actions;

export default reducer;
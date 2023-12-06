import { SurveyResponseDTO } from "../types/SurveyResponse.type";
import { baseApi } from "./api";
import { apiType } from "./model/ApiTypes.type";

const defaultConfig = {
  keepUnusedDataFor: 1, // n초 후에 캐시에서 데이터를 삭제, default : 60초
}

export const innerApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getInitialData: builder.query<SurveyResponseDTO, apiType>({
      query: (type) => ({
        url: `/survey/items`,
        method: 'GET'
      }),
      ...defaultConfig,
    }),
  }),
});

export const {
  useGetInitialDataQuery
} = innerApi
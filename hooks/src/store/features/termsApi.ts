import { fetchBaseQuery } from '@reduxjs/toolkit/query';
import { createApi } from '@reduxjs/toolkit/query/react';
import type {
  FetchAllDataResponse,
  PokemonDetailType,
  TermListType,
} from '../../types/types';

const BASE_URL = 'https://pokeapi.co/api/v2/pokemon';
const LIMIT_NUM = 10;

export const termsApi = createApi({
  reducerPath: 'terms',
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
  }),
  refetchOnReconnect: true,
  tagTypes: ['Items'],
  endpoints: (builder) => ({
    getAllTerms: builder.query<FetchAllDataResponse, number>({
      query: (page) => `/?limit=${LIMIT_NUM}&offset=${page * 10}`,
      providesTags: ['Items'],
      transformResponse: (response: {
        results: TermListType[];
        count: number;
      }) => ({
        results: response.results,
        pagesTotal: Math.floor(response.count / LIMIT_NUM),
      }),
      keepUnusedDataFor: 600,
    }),
    getTermByName: builder.query<TermListType, string>({
      query: (name) => `/${name}`,
      transformResponse: (response: {
        name: string;
        location_area_encounters: string;
      }) => ({
        name: response.name,
        url: response.location_area_encounters,
      }),
      keepUnusedDataFor: 3600,
    }),
    getTermById: builder.query<PokemonDetailType, string>({
      query: (id) => `/${id}`,
      transformResponse: (response: {
        name: string;
        sprites: { front_shiny: string };
        weight: number;
      }) => ({
        name: response.name,
        imgSrc: response.sprites.front_shiny,
        weight: response.weight,
      }),
      keepUnusedDataFor: 3600,
    }),
  }),
});
export const {
  useGetTermByNameQuery,
  useGetAllTermsQuery,
  useGetTermByIdQuery,
} = termsApi;

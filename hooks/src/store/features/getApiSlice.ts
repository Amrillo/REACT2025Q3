import { createSlice } from "@reduxjs/toolkit";
import { fetchBaseQuery } from "@reduxjs/toolkit/query";
import type { FetchAllDataResponse } from "../../api/fetchApi";
import type { TermListType } from "../../types/types";

const BASE_URL = 'https://pokeapi.co/api/v2/pokemon';
const LIMIT_NUM = 10;

const getApiSlice = createSlice({
    reducerPath: "getApi",
     baseQuery : fetchBaseQuery({
        baseUrl: BASE_URL, 
    }),
    endpoints: (builder) => ({
        getAllPokemons: builder.query<FetchAllDataResponse , number>({
            query: (page) => `/?limit=${LIMIT_NUM}&offset=${(page * 10)}`,
            transformResponse: (response: { results: TermListType[]; count: number }) => ({
                results: response.results,
                pagesTotal: Math.ceil(response.count / LIMIT_NUM),
            }),
        })
    }),
})
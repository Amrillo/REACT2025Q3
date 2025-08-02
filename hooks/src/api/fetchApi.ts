import type { PokemonDetailType, TermListType } from '../types/types';

const BASE_URL = 'https://pokeapi.co/api/v2/pokemon';
const LIMIT_NUM = 10;
export interface FetchAllDataResponse {
  results: TermListType[];
  pagesTotal: number;
}

export const fetchAllData = async (
  page: number
): Promise<FetchAllDataResponse | undefined> => {
  try {
    const response = await fetch(
      `${BASE_URL}/?limit=${LIMIT_NUM}&offset=${page * 10}`
    );
    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    }
    const data = await response.json();
    const pagesTotal: number = Math.floor(data.count / LIMIT_NUM);
    return { results: data.results, pagesTotal };
  } catch (error) {
    console.error('fetchAllData: Error', error);
    throw error;
  }
};

export const fetchData = async (
  name: string
): Promise<TermListType | undefined> => {
  try {
    const response = await fetch(`${BASE_URL}/${name}`);
    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    }
    const data = await response.json();
    const obj: TermListType = {
      name: data.name,
      url: data.location_area_encounters,
    };
    return obj;
  } catch (error) {
    console.error('fetchData: Error fetching', name, error);
    throw error;
  }
};

export const fetchItem = async (
  id: number
): Promise<PokemonDetailType | undefined> => {
  try {
    const response = await fetch(`${BASE_URL}/${id}`);
    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    }
    const pokemonData = await response.json();
    const obj = {
      name: pokemonData.name,
      imgSrc: pokemonData.sprites.front_shiny,
      weight: pokemonData.weight,
    };
    return obj;
  } catch (error) {
    console.error('fetchData: Error fetching', error);
    throw error;
  }
};

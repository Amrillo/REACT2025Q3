import type { TermListType } from '../types/types';

const BASE_URL = 'https://pokeapi.co/api/v2/pokemon';

export const fetchAllData = async (): Promise<TermListType[] | undefined> => {
  try {
    const response = await fetch(`${BASE_URL}`);
    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    }
    const data = await response.json();
    return data.results;
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

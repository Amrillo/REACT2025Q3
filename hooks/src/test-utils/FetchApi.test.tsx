import {
  describe,
  it,
  expect,
  vi,
  beforeEach,
  afterEach,
  type Mock,
} from 'vitest';
import {
  fetchAllData,
  fetchData,
  type FetchAllDataResponse,
} from '../api/fetchApi';
import type { TermListType } from '../types/types';

describe('fetchApi mock', () => {
  beforeEach(() => {
    vi.spyOn(globalThis, 'fetch');
  });
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('fetches all data successfully with correct pagination', async () => {
    const mockResponse: FetchAllDataResponse = {
      results: [
        { name: 'pikachu', url: 'https://pokeapi.co/api/v2/pokemon/25/' },
        { name: 'bulbasaur', url: 'https://pokeapi.co/api/v2/pokemon/1/' },
      ],
      pagesTotal: 100,
    };

    (fetch as Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        results: mockResponse.results,
        count: 1000, // Simulates 1000 total items, with LIMIT_NUM = 10 → 100 pages
      }),
    });

    const data = await fetchAllData(1); // Test with page 1 (offset = 10)
    expect(fetch).toHaveBeenCalledWith(
      'https://pokeapi.co/api/v2/pokemon/?limit=10&offset=10'
    );
    expect(data).toEqual(mockResponse);
    expect(data?.results).toHaveLength(2);
    expect(data?.results[0].name).toBe('pikachu');
    expect(data?.results[1].name).toBe('bulbasaur');
    expect(data?.pagesTotal).toBe(100);
  });

  it('fetches single pokemon data correctly', async () => {
    const mockResponse: TermListType = {
      name: 'pikachu',
      url: '/encounters/pikachu',
    };

    (fetch as Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        name: 'pikachu',
        location_area_encounters: '/encounters/pikachu',
      }),
    });

    const data = await fetchData('pikachu');
    expect(fetch).toHaveBeenCalledWith(
      'https://pokeapi.co/api/v2/pokemon/pikachu'
    );
    expect(data).toEqual(mockResponse);
    expect(data?.name).toBe('pikachu');
    expect(data?.url).toBe('/encounters/pikachu');
  });
  it('handles fetchAllData error gracefully', async () => {
    (fetch as Mock).mockResolvedValueOnce({
      ok: false,
      status: 404,
      statusText: 'Not Found',
    });

    await expect(fetchAllData(0)).rejects.toThrow('Error 404: Not Found');
    expect(fetch).toHaveBeenCalledWith(
      'https://pokeapi.co/api/v2/pokemon/?limit=10&offset=0'
    );
  });

  it('handles fetchData error gracefully', async () => {
    (fetch as Mock).mockResolvedValueOnce({
      ok: false,
      status: 500,
      statusText: 'Server Error',
    });

    await expect(fetchData('pikachu')).rejects.toThrow(
      'Error 500: Server Error'
    );
    expect(fetch).toHaveBeenCalledWith(
      'https://pokeapi.co/api/v2/pokemon/pikachu'
    );
  });
});

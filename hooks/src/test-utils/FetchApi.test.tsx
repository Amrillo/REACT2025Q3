import {
  describe,
  it,
  expect,
  vi,
  beforeEach,
  afterEach,
  type Mock,
} from 'vitest';
import { fetchAllData, fetchData } from '../api/fetchApi';

describe('fetchApi mock', () => {
  beforeEach(() => {
    vi.spyOn(globalThis, 'fetch');
  });
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('mocks fetchAlldata successfully', async () => {
    (fetch as Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        results: [
          { name: 'pikachu', url: 'https://pokeapi.co/api/v2/pokemon/pikachu' },
          {
            name: 'bulbasaur',
            url: 'https://pokeapi.co/api/v2/pokemon/bulbasaur',
          },
        ],
      }),
    });
    const data = await fetchAllData();
    expect(data).toHaveLength(2);
    expect(data?.[0].name).toBe('pikachu');
    expect(data?.[1].name).toBe('bulbasaur');
  });

  it('mock fetchData correctly', async () => {
    (fetch as Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        name: 'pikachu',
        location_area_encounters: '/encounters/pikachu',
      }),
    });
    const data = await fetchData('pikachu');
    expect(data?.name).toBe('pikachu');
    expect(data?.url).toBe('/encounters/pikachu');
  });
});

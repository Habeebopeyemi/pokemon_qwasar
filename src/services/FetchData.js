// import axios from "axios";

// export const getAPI = async url => {
//   const res = await axios.get(`https://pokeapi.co/api/v2/${url}`);
//   return res;
// };

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const pokemonApi = createApi({
  reducerPath: "pokemonApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://pokeapi.co/api/v2/" }),
  endpoints: builder => ({
    getAllData: builder.query({
      query: () => "pokemon",
    }),
    getPokemon: builder.query({
      query: id => `pokemon/${id}`,
    }),
    getSpecies: builder.query({
      query: id => `pokemon-species/${id}`,
    }),
    getGender: builder.query({
      query: id => `gender/${id}`,
    }),
  }),
});

export const { useGetPokemonQuery, useGetAllDataQuery, useGetSpeciesQuery, useGetGenderQuery } =
  pokemonApi;

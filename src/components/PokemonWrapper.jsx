import React, { lazy, Suspense, useState } from "react";
import { useGetAllDataQuery } from "../services/FetchData";
import { Spin } from "antd";
// import PokemonCard from "./PokemonCard";
const PokemonCard = lazy(() => import("./PokemonCard"));

const PokemonWrapper = () => {
  const { data, error, isLoading } = useGetAllDataQuery();
  const [pokemon, setPokemon] = useState(data);
  // console.log(data?.results);

  const searchHandler = e => {
    let searchValues =
      data &&
      data.results &&
      data.results.filter(result => {
        return result.name.includes(e.target.value);
      });
    setPokemon(searchValues);
    // console.log(pokemon);
  };
  if (isLoading) {
    return <p>Loading...</p>;
  }
  if (error) {
    return <div>Error: something went wrong</div>;
  }
  if (!data) {
    return <p>Loading data...</p>;
  }
  return (
    <div className="w-full flex flex-wrap gap-3">
      <Suspense
        fallback={
          <div className="w-[20%] mx-auto mt-[25rem]">
            <Spin size="large" />
          </div>
        }>
        <div className="w-full">
          <input
            type="text"
            placeholder="enter a pokemon name"
            className="p-2 border-[1px] w-full rounded-xl focus:outline-0 focus:border-blue-500"
            onChange={searchHandler}
          />
        </div>
        {/* {data &&
          data.results &&
          data.results.map((el, index) => {
            return <PokemonCard url={el.url} key={index} />;
          })} */}
        {pokemon?.length > 0
          ? pokemon.map((el, index) => {
              return <PokemonCard url={el.url} key={index} />;
            })
          : data &&
            data.results &&
            data.results.map((el, index) => {
              return <PokemonCard url={el.url} key={index} />;
            })}
      </Suspense>
    </div>
  );
};

export default PokemonWrapper;

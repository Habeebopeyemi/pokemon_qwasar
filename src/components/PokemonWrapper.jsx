import React, { lazy, Suspense } from "react";
import { useGetAllDataQuery } from "../services/FetchData";
import { Spin } from "antd";
// import PokemonCard from "./components/PokemonCard";
const PokemonCard = lazy(() => import("./PokemonCard"));

const PokemonWrapper = () => {
  const { data, error, isLoading } = useGetAllDataQuery();
  console.log(data?.results);
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
        {data &&
          data.results &&
          data.results.map((el, index) => {
            return <PokemonCard url={el.url} key={index} />;
          })}
      </Suspense>
    </div>
  );
};

export default PokemonWrapper;

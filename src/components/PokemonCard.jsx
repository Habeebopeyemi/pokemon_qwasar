import React, { lazy, Suspense } from "react";
import { Spin } from "antd";
import { useGetPokemonQuery } from "../services/FetchData";
import { Link } from "react-router-dom";
const Image = lazy(() => import("./Image"));

const PokemonCard = ({ url }) => {
  // console.log( url.split("pokemon/")[1]);
  const styles = [
    "basis-[48%] p-2 rounded-md border-2 bg-red-700 text-white",
    "basis-[48%] p-2 rounded-md border-2 bg-orange-700 text-white",
    "basis-[48%] p-2 rounded-md border-2 bg-amber-700 text-white",
    "basis-[48%] p-2 rounded-md border-2 bg-yellow-700 text-white",
    "basis-[48%] p-2 rounded-md border-2 bg-lime-700 text-white",
    "basis-[48%] p-2 rounded-md border-2 bg-green-700 text-white",
    "basis-[48%] p-2 rounded-md border-2 bg-teal-700 text-white",
    "basis-[48%] p-2 rounded-md border-2 bg-cyan-700 text-white",
  ];
  const { data, error, isLoading } = useGetPokemonQuery(
    url.split("pokemon/")[1]
  );
  const generateColor = () => {
    return styles[Math.floor(Math.random() * styles.length)];
  };

  if (isLoading) {
    return (
      <>
        <div className="w-[20%] mx-auto my-[40vh]">
          <Spin size="large" />;
        </div>
      </>
    );
  }
  if (error) {
    return <p>Error: {error.message}</p>;
  }
  return (
    <div className={generateColor()}>
      <Link to={`/pokemon/${data.id}`}>
        <h2 className="font-bold">{data.species.name}</h2>
        <div className="flex justify-between">
          <div>
            {data.abilities.map((el, index) => {
              return (
                <p className="text-sm" key={index}>
                  {el.ability.name}
                </p>
              );
            })}
          </div>
          <div className="w-[70px] h-[70px]">
            <Suspense fallback={<Spin size="small" />}>
              <Image src={data.sprites.front_default} />
            </Suspense>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default PokemonCard;

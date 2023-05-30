import React, { Suspense } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Spin, Tabs } from "antd";
import { useGetPokemonQuery } from "../services/FetchData";
import { BsArrowLeft } from "react-icons/bs";
import { FcLike } from "react-icons/fc";
import About from "./About";
import Stats from "./Stats";
// import Evolution from "./Evolution";
import Moves from "./Moves";
// const Image = lazy(() => import("./Image"));

const PokemonDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data, error, isLoading } = useGetPokemonQuery(`${id}`);
  const label = ["About", "Base Stats", "Moves", "Evolution"];

  const styles = [
    "w-full max-w-[500px] mx-auto rounded-xl border-[2px] bg-red-700 text-white",
    "w-full max-w-[500px] mx-auto rounded-xl border-[2px] bg-orange-700 text-white",
    "w-full max-w-[500px] mx-auto rounded-xl border-[2px] bg-amber-700 text-white",
    "w-full max-w-[500px] mx-auto rounded-xl border-[2px] bg-yellow-700 text-white",
    "w-full max-w-[500px] mx-auto rounded-xl border-[2px] bg-lime-700 text-white",
    "w-full max-w-[500px] mx-auto rounded-xl border-[2px] bg-green-700 text-white",
    "w-full max-w-[500px] mx-auto rounded-xl border-[2px] bg-teal-700 text-white",
    "w-full max-w-[500px] mx-auto rounded-xl border-[2px] bg-cyan-700 text-white",
  ];
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
      <div className="w-full p-4">
        <p className="w-full flex justify-between">
          <BsArrowLeft onClick={() => navigate(-1)} />
          <FcLike />
        </p>
        <div>
          <h1 className="text-[30px] font-bold">{data.name}</h1>
          <div className="w-full flex justify-between">
            <p className="text-[20px] font-bold">
              {data.abilities.map((el, index) => {
                return (
                  <span
                    className="mr-2 p-[3px] text-[0.7rem] text-black bg-slate-100 rounded-lg"
                    key={index}>
                    {el.ability.name}
                  </span>
                );
              })}
            </p>
            <span className="font-bold">#00{data.id}</span>
          </div>
          <div className="w-[200px] h-[200px] mx-auto">
            <Suspense fallback={<Spin size="small" />}>
              <img src={data.sprites.front_default} alt="alt" className="w-full" />
            </Suspense>
          </div>
        </div>
      </div>
      <div className="w-full p-4 bg-white rounded-t-[2rem]">
        <Tabs
          centered
          defaultActiveKey={"1"}
          items={new Array(3).fill(null).map((_, i) => {
            const tabId = String(i + 1);
            let child = undefined;
            if (label[i] === "About") {
              child = <About details={data} id={id} />;
            }
            if (label[i] === "Base Stats") {
              child = <Stats details={data} />;
            }
            // if (label[i] === "Evolution") {
            //   child = <Evolution />;
            // }
            if (label[i] === "Moves") {
              child = <Moves details={data} />;
            }
            return {
              label: label[i],
              key: tabId,
              children: child,
            };
          })}
        />
      </div>
    </div>
  );
};

export default PokemonDetails;

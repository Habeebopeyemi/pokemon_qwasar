import React from "react";
import { Progress } from "antd";

const Stats = ({ details }) => {
  // console.log(details)
  const { stats } = details;
  return (
    <div>
      {stats.map((el, index) => {
        return (
          <div className="w-full flex" key={index}>
            <p className="basis-[15%]">{el.stat.name}</p>
            <p className="basis-[15%]">{el.base_stat}</p>
            <div className="basis-[60%]">
              <Progress
                percent={el.base_stat}
                status={el.base_stat >= 50 ? "" : "exception"}
                showInfo={false}
              />
            </div>
          </div>
        );
      })}
      <div className="my-2">
        <h6 className="font-bold">Type defenses</h6>
        <p>The effectiveness of each type on {details.species.name }</p>
      </div>
    </div>
  );
};

export default Stats;

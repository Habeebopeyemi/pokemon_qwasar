import React from "react";

const Moves = ({ details }) => {
  const { moves } = details;
  // console.log(moves);
  return (
    <div className="w-[50%]">
      {moves.map((el, index) => {
        if (index >= 0 && index <= 10) {
          return (
            <div className="flex justify-between" key={index}>
              <p>{el.move.name}</p>
              <p className="font-bold">
                {el.version_group_details[0].move_learn_method.name}
              </p>
            </div>
          );
        }
        // default return for those that doesn't meet the if condition
        return null;
      })}
    </div>
  );
};

export default Moves;

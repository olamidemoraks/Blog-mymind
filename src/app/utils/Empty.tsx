/* eslint-disable @next/next/no-img-element */
import React from "react";

type EmptyProps = {};

const Empty: React.FC<EmptyProps> = () => {
  return (
    <div className="md:w-[400px] md:h-[400px] w-[300px] h-[300px] flex-1">
      <img
        src={"/Problem solving-amico.svg"}
        alt=""
        className="w-full h-full "
      />
    </div>
  );
};
export default Empty;

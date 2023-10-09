import React from "react";

type SingleBlogLoaderProps = {};

const SingleBlogLoader: React.FC<SingleBlogLoaderProps> = () => {
  return (
    <div className="flex flex-col gap-6 w-full">
      <div className="w-[60%] h-[1rem]  bg-gray-200  rounded-full animate-pulse " />
      <div className="flex gap-2 items-center">
        <div className="h-[2rem] w-[2rem] bg-gray-200 rounded-full animate-pulse" />
        <div className="w-full flex flex-col gap-1">
          <div className=" w-[45%] h-[.6rem] bg-gray-200 animate-pulse rounded-full" />
          <div className=" w-[37%] h-[.6rem] bg-gray-200 animate-pulse rounded-full" />
        </div>
      </div>
      <div className="w-full md:h-[300px] h-[200px] bg-gray-200 animate-pulse rounded-lg" />
      <div className="w-full flex flex-col  gap-1">
        <div className=" w-full h-[.6rem] bg-gray-200 animate-pulse rounded-full" />
        <div className=" w-[98%] h-[.6rem] bg-gray-200 animate-pulse rounded-full" />
        <div className=" w-full h-[.6rem] bg-gray-200 animate-pulse rounded-full" />
        <div className=" w-[90%] h-[.6rem] bg-gray-200 animate-pulse rounded-full" />
        <div className=" w-full h-[.6rem] bg-gray-200 animate-pulse rounded-full" />
        <div className=" w-[98%] h-[.6rem] bg-gray-200 animate-pulse rounded-full" />
        <div className=" w-full h-[.6rem] bg-gray-200 animate-pulse rounded-full" />
        <div className=" w-[96%] h-[.6rem] bg-gray-200 animate-pulse rounded-full" />
        <div className=" w-full h-[.6rem] bg-gray-200 animate-pulse rounded-full" />
        <div className=" w-[96%] h-[.6rem] bg-gray-200 animate-pulse rounded-full" />
        <div className=" w-[98%] h-[.6rem] bg-gray-200 animate-pulse rounded-full" />
        <div className=" w-full h-[.6rem] bg-gray-200 animate-pulse rounded-full" />
      </div>
    </div>
  );
};
export default SingleBlogLoader;

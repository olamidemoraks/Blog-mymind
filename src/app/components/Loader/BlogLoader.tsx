import React from "react";

type BlogLoaderProps = {};

const BlogLoader: React.FC<BlogLoaderProps> = () => {
  return (
    <div className="flex flex-col gap-[2.6rem]">
      {Array(7)
        .fill(1)
        .map((_, idx) => (
          <div key={idx} className="w-full grid grid-cols-5 gap-8 ">
            <div className="flex flex-col gap-[0.34rem] col-span-4  w-full">
              <div className="flex gap-2 items-center">
                <div className="h-[2rem] w-[2rem] bg-gray-200 rounded-full animate-pulse" />
                <div className=" w-[65%] h-[.6rem] bg-gray-200 animate-pulse rounded-full" />
              </div>
              <div className="flex flex-col gap-[0.2rem]">
                <div className=" w-[65%] h-[.6rem] bg-gray-200 animate-pulse rounded-full" />
                <div className=" w-[55%] h-[.6rem] bg-gray-200 animate-pulse rounded-full" />
                <div className=" w-[40%] h-[.6rem] bg-gray-200 animate-pulse rounded-full" />
              </div>
            </div>
            <div className="h-full w-full bg-gray-200 animate-pulse col-span-1 rounded" />
          </div>
        ))}
    </div>
  );
};
export default BlogLoader;

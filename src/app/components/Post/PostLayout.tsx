import React, { useState } from "react";
import PostList from "./PostList";
import { useRouter, useSearchParams } from "next/navigation";
import BlogLoader from "../Loader/BlogLoader";

type PostLayoutProps = {
  posts: Post[] | undefined;
  isLoading: boolean;
};

export const categories = [
  "Programming",
  "Data Science",
  "Technology",
  "Self Improvement",
  "Productivity",
  "Writing",
  "Relationship",
  "Machine Learning",
  "Politics",
  "Science",
  "Nature",
  "Comedy",
  "UI/UX",
  "Music",
  "Photography",
  "Career Advice",
  "Paranting",
  "AI",
];

const PostLayout: React.FC<PostLayoutProps> = ({ posts, isLoading }) => {
  const [more, setMore] = useState(false);
  const params = useSearchParams();
  const router = useRouter();
  const { search, category: categoryQuery } = Object.fromEntries(params);

  const categoryNavigation = (category: string) => {
    if (search) {
      if (category === categoryQuery) {
        router.push(`/blogs/?search=${search}`);
      } else {
        router.push(`/blogs/?category=${category}&search=${search}`);
      }
    } else {
      if (category === categoryQuery) {
        router.push(`/blogs`);
      } else {
        router.push(`/blogs/?category=${category}`);
      }
    }
  };

  let content: any;
  if (isLoading) {
    content = <BlogLoader />;
  } else {
    content = <PostList posts={posts} />;
  }
  return (
    <div className="w-full max-md:gap-[4rem] gap-[2rem]  min-h-[60vh] flex flex-col-reverse lg:flex-row mb-[2rem] ">
      <div className=" flex-[1.2] border-r-gray-100 lg:border-r lg:pr-[3rem]">
        {content}
      </div>
      <div className="flex flex-col gap-4 flex-[.6] lg:pl-[3rem] ">
        <p className=" font-medium">Discover more of what matters to you</p>
        <div className=" flex gap-3 flex-wrap">
          {categories.slice(0, more ? categories.length : 8).map((category) => (
            <div
              onClick={() => categoryNavigation(category)}
              key={category}
              className={`p-1 px-3 rounded-full bg-gray-100 ${
                categoryQuery === category
                  ? "bg-theme-primary text-white hover:bg-theme-tertiary "
                  : "hover:bg-gray-200"
              }  text-sm cursor-pointer`}
            >
              {category}
            </div>
          ))}
        </div>
        <p
          className="pl-2 text-theme-tertiary text-sm cursor-pointer "
          onClick={() => setMore(!more)}
        >
          See more topic
        </p>
      </div>
    </div>
  );
};
export default PostLayout;

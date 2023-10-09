"use client";
import React from "react";
import Layout from "../components/Layout/Layout";
import PostLayout from "../components/Post/PostLayout";
import { useQuery } from "react-query";
import { getOwnerPost } from "../api/post";
import { AiOutlineSearch } from "react-icons/ai";

type OwnerProps = {};

const Owner: React.FC<OwnerProps> = () => {
  const { isLoading, data } = useQuery({
    queryFn: getOwnerPost,
    queryKey: ["Posts"],
  });

  const posts: Post[] = data?.posts;
  return (
    <Layout>
      <div className="mt-[6rem]  md:w-[80%] w-[90%]  mx-auto">
        <PostLayout isLoading={isLoading} posts={posts} isEdit={true} />
      </div>
    </Layout>
  );
};
export default Owner;

"use client";
import { getPost } from "@/app/api/post";
import Layout from "@/app/components/Layout/Layout";
import SingleBlogLoader from "@/app/components/Loader/SingleBlogLoader";
import SinglePost from "@/app/components/Post/SinglePost";
import React, { useEffect } from "react";
import { useQuery } from "react-query";

type BlogItemProps = {};

const BlogItem: React.FC<BlogItemProps> = ({ params }: any) => {
  const id = params.id;
  const { data, isLoading, refetch } = useQuery({
    queryKey: "Post",
    queryFn: async () => {
      return await getPost(id);
    },
    enabled: !!id,
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    if (id) {
      refetch();
    }
  }, [id, refetch]);

  const post: Post = data?.post;

  let content: any;
  if (isLoading) {
    content = (
      <div className="mt-[6rem] lg:w-[45%] md:w-[75%] w-[90%] mx-auto  ">
        <SingleBlogLoader />
      </div>
    );
  } else {
    content = (
      <div className="mt-[6rem]  lg:w-[45%] md:w-[75%] w-[90%] mx-auto  ">
        <SinglePost post={post} />
      </div>
    );
  }
  return <Layout>{content}</Layout>;
};
export default BlogItem;

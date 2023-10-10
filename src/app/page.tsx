"use client";
import Heading from "./utils/Heading";
import Header from "./utils/Header/Header1";
import { Toaster } from "react-hot-toast";
import { useQuery } from "react-query";
import Hero from "./utils/Hero";
import PostLayout from "./components/Post/PostLayout";
import { getAllPost } from "./api/post";

export default function Home() {
  const { isLoading, data } = useQuery({
    queryFn: async () => getAllPost({}),
    queryKey: "Posts",
    refetchOnWindowFocus: false,

  });

  const posts: Post[] = data?.posts;

  return (
    <>
      <Toaster position="top-center" />
      <main>
        <Heading
          title="MyMind"
          description="Discover stories, thinking, and expertise from writers on any topic."
          keywords="blog,stories,topic,technology,interest"
        />
        <Header />
        <Hero />
        <div className="mt-[3rem] lg:w-[80%] w-[90%] mx-auto">
          <PostLayout posts={posts} isLoading={isLoading} />
        </div>
      </main>
    </>
  );
}

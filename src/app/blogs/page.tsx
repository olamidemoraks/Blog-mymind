"use client";
import { useEffect, useState } from "react";
import Layout from "../components/Layout/Layout";
import PostLayout from "../components/Post/PostLayout";
import { useQuery } from "react-query";
import { getAllPost } from "../api/post";
import { AiOutlineSearch } from "react-icons/ai";
import { useRouter, useSearchParams } from "next/navigation";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

type pageProps = {};

const Blogs: React.FC<pageProps> = () => {
  const router = useRouter();
  //Keeps track of the params search and category
  const params = useSearchParams();

  // {search, category}
  const paramsObj: any = Object.fromEntries(params);
  const [search, setSearch] = useState(paramsObj.search || "");
  const [page, setPage] = useState(paramsObj.page || 1);
  console.log(page);

  const { isLoading, data, refetch } = useQuery({
    queryFn: async () => {
      return await getAllPost({ ...Object.fromEntries(params) });
    },
    queryKey: ["Posts"],
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    refetch();
  }, [params, refetch]);

  const handleBlogSearch = (e: React.FormEvent<HTMLFormElement>) => {
    const { category } = paramsObj;
    e.preventDefault();
    if (category) {
      router.push(`/blogs/?search=${search}&category=${category}`);
    } else {
      router.push(`/blogs/?search=${search}`);
    }
  };

  const handlePagination = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value);
    const { category, search } = paramsObj;
    if (category) {
      router.push(`/blogs/?page=${value}&category=${category}`);
    } else if (search) {
      router.push(`/blogs/?search=${search}&page=${value}`);
    } else if (category && search) {
      router.push(
        `/blogs/?search=${search}&category=${category}&page=${value}`
      );
    } else {
      router.push(`/blogs/?page=${value}`);
    }
  };

  const posts: Post[] = data?.posts;
  const pageNumber: number = data?.numOfPage;
  return (
    <Layout>
      <div className="mt-[6rem]  md:w-[80%] w-[90%]  mx-auto">
        <form
          onSubmit={handleBlogSearch}
          className=" flex items-center gap-1 sm:w-fit w-full my-[2rem] relative"
        >
          <input
            type="text"
            placeholder="Search my mind"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className=" border placeholder:text-neutral-300 border-theme-secondary p-2 bg-theme-light/30 rounded outline-none w-full "
          />
          <button type="submit" className=" absolute right-2">
            <AiOutlineSearch className=" text-[1.3rem]" />
          </button>
        </form>
        <PostLayout isLoading={isLoading} posts={posts} />

        <div className="flex lg:w-[65%] w-full justify-center my-[3rem]">
          <Stack spacing={2}>
            <Pagination
              count={pageNumber}
              shape="rounded"
              onChange={handlePagination}
              page={page}
            />
          </Stack>
        </div>
      </div>
    </Layout>
  );
};
export default Blogs;

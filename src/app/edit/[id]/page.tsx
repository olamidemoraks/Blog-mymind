"use client";
import { getPost } from "@/app/api/post";
import React, { useEffect } from "react";
import { useQuery } from "react-query";
import EditPost from "../../components/Post/EditPost";
import Layout from "@/app/components/Layout/Layout";

type pageProps = {};

const Edit: React.FC<pageProps> = ({ params }: any) => {
  const id = params.id;
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["Post"],
    queryFn: async () => {
      return await getPost(id);
    },
    enabled: !!id,
  });

  useEffect(() => {
    if (id) {
      refetch();
    }
  }, [id, refetch]);

  const post: Post = data?.post;
  return (
    <Layout>
      <EditPost post={post} />
    </Layout>
  );
};
export default Edit;

import React from "react";
import PostCard from "./PostCard";
import { useProfile } from "@/app/states/profile";

type PostListProps = {
  posts: Post[] | undefined;
};

const PostList: React.FC<PostListProps> = ({ posts }) => {
  return (
    <div>
      <div className="flex flex-col gap-[2.6rem]">
        {posts?.map((post) => (
          <PostCard post={post} key={post._id} />
        ))}
      </div>
    </div>
  );
};
export default PostList;

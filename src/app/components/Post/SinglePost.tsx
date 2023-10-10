"use client";
import moment from "moment";
import Image from "next/image";
import { useState } from "react";
import { IoIosPerson } from "react-icons/io";
import { GoCommentDiscussion } from "react-icons/go";
import { PiHandsClappingLight, PiHandsClappingFill } from "react-icons/pi";
import { BiLoader, BiShareAlt } from "react-icons/bi";
import Quill from "react-quill";
import "react-quill/dist/quill.bubble.css";
import { useProfile } from "@/app/states/profile";
import { useMutation, useQueryClient } from "react-query";
import { likePost } from "@/app/api/post";
import { useAuthModal } from "@/app/states/authModal";
import CommentSection from "./Comment/CommentSection";
import { useIsMounted } from "@/app/hooks/useMounted";
import QuillViewer from "../Quill/QuillViewer";

type SinglePostProps = {
  post: Post;
};

const SinglePost: React.FC<SinglePostProps> = ({ post }) => {
  const isMounted = useIsMounted();
  const { id, isAuthenticated } = useProfile();
  const { setOpen } = useAuthModal();
  const [openComment, setOpenComment] = useState(false);

  const queryClient = useQueryClient();

  // like post api
  const { mutate, isLoading } = useMutation({
    mutationFn: likePost,
    onSuccess: (data: any) => {
      if (data.success) {
        queryClient.refetchQueries("Post");
      }
    },
  });
  const handleLikePost = (id: string) => {
    const postId = id;
    if (isAuthenticated) {
      mutate({ postId });
    } else {
      setOpen();
    }
  };
  return (
    <div className=" flex flex-col gap-6 w-full">
      <p className=" text-[34px] font-bold">{post?.title}</p>
      <div className="flex sm:items-center items-start justify-between sm:flex-row flex-col">
        <div className="flex items-center gap-3">
          <div className="bg-white border-neutral-300 border rounded-full">
            <IoIosPerson className=" text-gray-300 text-[2.3rem]" />
          </div>
          <div className=" leading-6">
            <p className=" text-neutral-700 capitalize text-[14px] font-medium">
              {post?.author?.username}
            </p>
            <p className=" text-neutral-600 capitalize text-[14px] -mt-1">
              {moment(post?.updatedAt).format("MMM DD")}
            </p>
          </div>
        </div>
        <div className="flex items-center justify-between py-3 px-3  ">
          <div className="flex gap-7 items-center ">
            <div
              className="text-[1.2rem] flex items-center text-neutral-500 hover:text-pink-500 cursor-pointer gap-1"
              onClick={() => handleLikePost(post?._id)}
            >
              {!!post?.likes.find((like) => like === id) ? (
                <PiHandsClappingFill className=" text-pink-500" />
              ) : (
                <PiHandsClappingLight />
              )}
              {isLoading ? (
                <BiLoader className=" animate-spin" />
              ) : (
                <span>{post?.likes?.length || 0}</span>
              )}
            </div>
            <div
              className="text-[1.1rem] flex items-center text-neutral-500 gap-1 hover:text-green-500 cursor-pointer"
              onClick={() => setOpenComment((prev) => !prev)}
            >
              <GoCommentDiscussion />
              <span>{post?.comments?.length || 0}</span>
            </div>
            <div className="text-[1.2rem]  text-neutral-500 hover:text-blue-500 cursor-pointer">
              <BiShareAlt />
            </div>
          </div>
        </div>
      </div>
      {post?.photo?.url && (
        <div className="flex items-start justify-center">
          <Image
            src={`${post.photo.url}`}
            height={500}
            width={700}
            alt=""
            className="rounded"
          />
        </div>
      )}

      {/* {isMounted() ? (
        <Quill
          readOnly={true}
          value={post.content}
          theme="bubble"
          className=" mb-4 border-none text-[1.3rem] ql-editor "
        />
      ) : null} */}

      <div className=" w-full">
        <QuillViewer content={post.content} />
      </div>

      <CommentSection
        openComment={openComment}
        setCloseComment={() => setOpenComment(false)}
        post={post}
      />
    </div>
  );
};
export default SinglePost;

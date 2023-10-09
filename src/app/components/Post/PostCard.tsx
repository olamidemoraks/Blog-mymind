/* eslint-disable @next/next/no-img-element */
import { IoIosPerson } from "react-icons/io";
import { GoDotFill } from "react-icons/go";
import moment from "moment";
import React from "react";
import { LiaEdit } from "react-icons/lia";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useProfile } from "@/app/states/profile";
import Image from "next/image";

type PostCardProps = {
  post: Post;
};

const PostCard: React.FC<PostCardProps> = ({ post }) => {
  const navigate = useRouter();
  const { id } = useProfile();

  const handleRouteToEdit = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    navigate.push(`/edit/${post?._id}`);
  };
  // const handleRouteToBlog = (e: React.MouseEvent<HTMLDivElement>) => {
  //   e.stopPropagation();
  //   navigate.push(`/blogs/${post?._id}`);
  // };
  return (
    <div className="w-full grid grid-cols-4 justify-between">
      <div className=" flex flex-col gap-[0.34rem] col-span-3  w-full ">
        <div className="flex gap-2 items-center">
          <div className="bg-white border-neutral-300 border rounded">
            <IoIosPerson className=" text-gray-300 text-[1.2rem]" />
          </div>
          <p className="text-xs text-neutral-700 font-medium tracking-wide capitalize">
            {post?.author?.username}
          </p>
        </div>
        <div className="flex flex-col gap-1">
          <Link
            href={`/blogs/${post._id}`}
            className=" md:text-[1.3rem] text-[1rem] truncate font-bold tracking-tight w-[70%] hover:underline"
          >
            {post?.title}
          </Link>
          <p className="  text-neutral-600 md:block hidden  w-[95%] ">
            {/* {post?.content.substring(0, 130)} ... */}
            {/* retrieving 130 characters from the description and removeing any <p> tags  */}
            {post?.content.substring(0, 130).split("<p>")?.[1]} ...
          </p>
        </div>
        <div className="flex sm:gap-2 gap-1 items-center">
          <p className=" text-xs text-neutral-600">
            {moment(post?.createdAt).format("MMM DD")}
          </p>
          <GoDotFill className=" text-gray-300 text-[.5rem]" />
          <p className="py-[4px] px-3 rounded-full bg-gray-100 text-neutral-600 hover:bg-gray-200 text-xs">
            {post?.category}
          </p>

          {id === post.author._id && (
            <div
              onClick={(e) => handleRouteToEdit(e)}
              className=" cursor-pointer hover:text-theme-tertiary"
            >
              <LiaEdit className="text-[1.2rem]" />
            </div>
          )}
        </div>
      </div>
      <div className=" col-span-1">
        {post?.photo ? (
          <Image
            src={post?.photo.url}
            alt=""
            height={500}
            width={350}
            placeholder="blur"
            className=" object-cover rounded"
          />
        ) : // <img
        //   src={`${post?.photo.url}`}
        //   alt=""
        //   className="object-cover rounded h-full w-full"
        // />
        null}
      </div>
    </div>
  );
};
export default PostCard;

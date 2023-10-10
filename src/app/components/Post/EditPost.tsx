/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useEffect, useRef, useState } from "react";
import "react-quill/dist/quill.snow.css";
import Quill from "react-quill";
import { categories } from "./PostLayout";
import { FcPicture } from "react-icons/fc";
import Button from "@/app/utils/Button";
import { toast } from "react-hot-toast";
import { useMutation } from "react-query";
import { deletePost, editPost } from "@/app/api/post";
import { useRouter } from "next/navigation";
import { useProfile } from "@/app/states/profile";
import { useAuthModal } from "@/app/states/authModal";
import { useIsMounted } from "@/app/hooks/useMounted";
import QuillEditor from "../Quill/QuillEditor";

type EditPostProps = {
  post: Post;
};

const EditPost: React.FC<EditPostProps> = ({ post }) => {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [photo, setPhoto] = useState("");
  const [category, setCategory] = useState("");
  const { isAuthenticated } = useProfile();
  const { setOpen } = useAuthModal();

  useEffect(() => {
    if (post) {
      setTitle(post.title);
      setContent(post.content);
      setPhoto(post.photo?.url || "");
      setCategory(post.category);
    }
  }, [post]);
  const { mutate, isLoading } = useMutation({
    mutationFn: editPost,
    onSuccess: (data: any) => {
      if (data.success) {
        toast.success("Blog Create Successfully");
      } else {
        toast("Error, Something went wrong");
      }
    },
  });

  const { mutate: deletMutation, isLoading: isDeleting } = useMutation({
    mutationFn: deletePost,
    onSuccess: (data: any) => {
      if (data.success) {
        toast.success("Blog Deleted Successfully");
        router.back();
      } else {
        toast("Error, Something went wrong");
      }
    },
  });

  const handleSelectImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e?.target?.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        if (reader.readyState === 2) {
          setPhoto(e.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmitPost = () => {
    if (!isAuthenticated) {
      setOpen();
      return;
    }
    if (!title || !content || !categories) {
      toast.error("Enter all fields, and select a Blog photo");
      return;
    }
    const data = {
      title,
      content,
      photo,
      category,
    };

    mutate({ id: post._id, data });
  };

  const handleDeletePost = () => {
    if (!isAuthenticated) {
      setOpen();
      return;
    }
    deletMutation({ id: post._id });
  };

  const hasValueChange = () => {
    const serverPost = {
      title: post?.title,
      content: post?.content,
      photo: post?.photo?.url,
      category: post?.category,
    };
    const clientPost = {
      title: title,
      content: content,
      photo: photo,
      category: category,
    };

    const serverString = JSON.stringify(serverPost);
    const clientString = JSON.stringify(clientPost);

    return serverString === clientString;
  };

  return (
    <div className="mt-[7rem] lg:w-[80%] w-[90%] mx-auto flex lg:flex-row gap-6 flex-col-reverse mb-6">
      <div className=" lg:w-[65%] w-full flex flex-col gap-4 ">
        <div className="flex flex-col gap-3">
          <textarea
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter Title"
            className=" placeholder:text-gray-300 text-3xl font-bold outline-none p-3 "
          ></textarea>

          <select
            className="py-2 px-3 outline-none bg-gray-100 text-sm w-fit rounded-full"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="" className="bg-white py-1">
              Select Blog Category
            </option>
            {categories.map((category) => (
              <option value={category} key={category} className="bg-white py-1">
                {category}
              </option>
            ))}
          </select>
        </div>

        {/* {isMounted() ? (
          <Quill
            modules={modules}
            onChange={setContent}
            value={content}
            theme="snow"
            formats={formats}
            className="md:min-h-[40vh] h-[400px] flex-1 mb-4 border-none"
            placeholder="What is on your mind"
          />
        ) : null} */}
        <QuillEditor setContent={setContent} content={content} />

        <div className="w-full  mb-3 mt-6 max-lg:flex hidden  gap-3 justify-between">
          <Button
            disabled={hasValueChange()}
            isLoading={isLoading}
            label="Edit Post"
            type="button"
            action={handleSubmitPost}
          />
          <Button
            isLoading={isDeleting}
            label="Remove Post"
            type="button"
            action={handleDeletePost}
            className="!bg-theme-tertiary !text-theme-light"
          />
        </div>
      </div>

      <div className="lg:w-[35%] w-full">
        <input
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleSelectImage}
          id="photo"
        />

        <label
          htmlFor="photo"
          className=" w-full h-[300px] bg-theme-light/40 rounded flex flex-col gap-2 items-center justify-center cursor-pointer hover:bg-theme-light"
        >
          {photo ? (
            <img
              src={`${photo}`}
              alt="preview"
              className="w-full h-full object-cover"
            />
          ) : (
            <>
              <FcPicture className=" text-[2rem]" />
              <p className=" text-theme-tertiary font-semibold">
                Upload Blog Banner
              </p>
            </>
          )}
        </label>

        <div className="w-full mt-6 max-lg:hidden flex gap-3 justify-between">
          <Button
            disabled={hasValueChange()}
            isLoading={isLoading}
            label="Edit Post"
            type="button"
            action={handleSubmitPost}
          />
          <Button
            isLoading={isDeleting}
            label="Remove Post"
            type="button"
            action={handleDeletePost}
            className="!bg-theme-tertiary !text-theme-light"
          />
        </div>
      </div>
    </div>
  );
};
export default EditPost;

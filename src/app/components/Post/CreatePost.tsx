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
import { createPost } from "@/app/api/post";
import { object } from "yup";
import { useProfile } from "@/app/states/profile";
import { useAuthModal } from "@/app/states/authModal";
import { useRouter } from "next/navigation";

// quill configuration
const modules = {
  toolbar: [
    [{ font: [] }],
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    ["bold", "italic", "underline", "strike"],
    [{ color: [] }, { background: [] }],
    [{ script: "sub" }, { script: "super" }],
    ["blockquote", "code-block"],
    [{ list: "ordered" }, { list: "bullet" }],
    [{ indent: "-1" }, { indent: "+1" }, { align: [] }],
    ["link"],
    ["clean"],
  ],
  clipboard: {
    // toggle to add extra line breaks when pasting HTML:
    matchVisual: true,
  },
};

const formats = [
  "header",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "indent",
  "link",
];

type CreatePostProps = {};

const CreatePost: React.FC<CreatePostProps> = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [photo, setPhoto] = useState("");
  const [category, setCategory] = useState("");
  const router = useRouter();
  const inputRef: React.MutableRefObject<null> = useRef(null);
  const { isAuthenticated } = useProfile();
  const { setOpen } = useAuthModal();

  const { mutate, isLoading } = useMutation({
    mutationFn: createPost,
    onSuccess: (data) => {
      if (data.success) {
        toast.success("Blog Create Successfully");
        router.push(`/blogs/${data.post._id}`);
      } else {
        toast("Error, Something went wrong");
      }
    },
  });

  // useEffect(() => {
  //   if (inputRef.current) {
  //     inputRef?.current?.focus();
  //   }
  // }, []);

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

    mutate(data);
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
            ref={inputRef}
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

        <Quill
          modules={modules}
          onChange={setContent}
          theme="snow"
          formats={formats}
          className="md:min-h-[40vh] h-[400px] flex-1 mb-4 border-none"
          placeholder="What is on your mind"
        />

        <div className="w-full mt-6 max-lg:block hidden mb-3">
          <Button
            isLoading={isLoading}
            label="Publish Post"
            type="button"
            action={handleSubmitPost}
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
              src={photo}
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

        <div className="w-full mt-6 max-lg:hidden">
          <Button
            isLoading={isLoading}
            label="Publish Post"
            type="button"
            action={handleSubmitPost}
          />
        </div>
      </div>
    </div>
  );
};
export default CreatePost;

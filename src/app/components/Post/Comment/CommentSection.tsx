import { commentOnPost } from "@/app/api/post";
import { useState, useEffect } from "react";
import { GoComment, GoX } from "react-icons/go";
import { useMutation, useQueryClient } from "react-query";
import CommentCard from "./CommentCard";
import { useProfile } from "@/app/states/profile";
import { useAuthModal } from "@/app/states/authModal";

type CommentSectionProps = {
  openComment: boolean;
  setCloseComment: () => void;
  post: Post;
};

const CommentSection: React.FC<CommentSectionProps> = ({
  openComment,
  setCloseComment,
  post,
}) => {
  const { isAuthenticated } = useProfile();
  const { setOpen } = useAuthModal();
  const [comment, setComment] = useState("");
  const queryClient = useQueryClient();
  const { mutate, isLoading } = useMutation({
    mutationFn: commentOnPost,
    onSuccess: (data: any) => {
      if (data.success) {
        queryClient.refetchQueries("Post");
      }
    },
  });

  useEffect(() => {
    const commentSection = document.querySelector(".commentSection");
    const closeIcon = document.querySelector(".z-50");
    const html = document.querySelector("html");
    const closeComment = () => {
      setCloseComment();
    };
    commentSection?.addEventListener("click", (e) => {
      e.stopPropagation();
    });
    html?.addEventListener("click", closeComment);
    closeIcon?.addEventListener("click", closeComment);

    return () => {
      html?.removeEventListener("click", closeComment);
      closeIcon?.removeEventListener("click", closeComment);
    };
  }, []);

  const handleComment = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isAuthenticated) {
      setOpen();
      return;
    }
    if (!comment) {
      return;
    }
    mutate({ comment, postId: post?._id });
    setComment("");
  };
  return (
    <div
      className={`${
        openComment
          ? "translate-y-0 opacity-100"
          : "-translate-y-[200%] opacity-0"
      } commentSection absolute top-0 right-0 transition-all duration-200 mt-[5rem] bg-white drop-shadow-xl sm:w-[450px] w-full h-full overflow-y-auto`}
    >
      <div
        className={` h-full sm:w-[450px] w-full border-l border-l-gray-200 `}
      >
        <div className="flex justify-between items-center p-3 cursor-pointer font-medium">
          <p>Comments ({post?.comments?.length})</p>
          <div
            className=" z-50"
            onClick={(e) => {
              e.stopPropagation();
              setCloseComment();
            }}
          >
            <GoX className="text-[1.4rem] text-right" />
          </div>
        </div>

        <div className="px-3">
          <form
            onSubmit={handleComment}
            className="w-full flex gap-3 items-center h-[3rem] border border-gray-300 rounded px-2 my-5 "
          >
            <input
              type="text"
              className=" w-full outline-none h-full "
              placeholder={isLoading ? "Commenting..." : "Enter your comment"}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
            <GoComment className=" text-[1.3rem] text-gray-300" />
          </form>
        </div>
        <hr />
        <div className=" px-4 flex flex-col-reverse">
          {post?.comments?.map((comment) => {
            return (
              <div
                key={comment._id}
                className="py-4 border-b border-b-gray-200 "
              >
                <CommentCard comment={comment} />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
export default CommentSection;

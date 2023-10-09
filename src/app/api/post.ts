import axios from "axios";

const url = `${process.env.NEXT_PUBLIC_SERVER_URI}`;
const auth: any =
  typeof window !== "undefined" &&
  JSON.parse(localStorage.getItem("auth_store") as string);

const token: string = auth?.state?.token;

console.log(token);
const headers = {
  "Content-Type": "application/json",
  Authorization: `Bearer ${token}`,
};

export const getAllPost = async ({
  search,
  category,
  page,
}: {
  search?: string;
  category?: string;
  page?: number;
}) => {
  try {
    console.log("get All", search, category);
    const res = await axios.get(
      `${url}/get-all-post/?search=${search || ""}&category=${
        category || ""
      }&page=${page || 1}`
    );
    return res.data;
  } catch (error: any) {
    return error?.response?.data;
  }
};

export const getOwnerPost = async () => {
  try {
    const res = await axios.get(`${url}/get-my-post`, { headers });
    return res.data;
  } catch (error: any) {
    return error?.response?.data;
  }
};

export const createPost = async (data: any) => {
  try {
    const res = await axios.post(
      `${url}/create-post`,
      { ...data },
      { headers }
    );
    return res.data;
  } catch (error: any) {
    return error?.response?.data;
  }
};
export const editPost = async ({ id, data }: { id: string; data: any }) => {
  try {
    const res = await axios.put(
      `${url}/edit-my-post/${id}`,
      { ...data },
      { headers }
    );
    return res.data;
  } catch (error: any) {
    return error?.response?.data;
  }
};
export const deletePost = async ({ id }: { id: string }) => {
  try {
    const res = await axios.delete(`${url}/delete-my-post/${id}`, { headers });
    return res.data;
  } catch (error: any) {
    return error?.response?.data;
  }
};

export const getPost = async (id: string) => {
  try {
    const res = await axios.get(`${url}/get-post/${id}`);
    return res.data;
  } catch (error: any) {
    return error?.response?.data;
  }
};
export const likePost = async ({ postId }: { postId: string }) => {
  try {
    const res = await axios.put(`${url}/like-post`, { postId }, { headers });
    return res.data;
  } catch (error: any) {
    return error?.response?.data;
  }
};

export const commentOnPost = async ({
  postId,
  comment,
}: {
  postId: string;
  comment: string;
}) => {
  try {
    const res = await axios.put(
      `${url}/comment-post`,
      { postId, comment },
      { headers }
    );
    return res.data;
  } catch (error: any) {
    return error?.response?.data;
  }
};

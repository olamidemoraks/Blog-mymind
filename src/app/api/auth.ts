import axios from "axios";

const url = `${process.env.NEXT_PUBLIC_SERVER_URI}`;

export const login = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  try {
    const res = await axios.post(`${url}/login`, {
      email,
      password,
    });
    return res.data;
  } catch (error: any) {
    return error?.response?.data;
  }
};

export const signup = async ({
  email,
  password,
  username,
}: {
  email: string;
  password: string;
  username: string;
}) => {
  try {
    const res = await axios.post(`${url}/signup`, {
      email,
      password,
      username,
    });
    return res.data;
  } catch (error: any) {
    return error?.response?.data;
  }
};

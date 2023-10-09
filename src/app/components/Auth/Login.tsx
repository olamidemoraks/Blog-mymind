"use client";
import { login } from "@/app/api/auth";
import { useFormik } from "formik";
import * as yup from "yup";
import React from "react";
import { useMutation } from "react-query";
import toast from "react-hot-toast";
import Button from "@/app/utils/Button";
import { useProfile } from "@/app/states/profile";

type LoginProps = {
  setType: (type: string) => void;
  setClose: () => void;
};

const schema = yup.object().shape({
  email: yup
    .string()
    .email("Invalid email!")
    .required("Please enter your email!"),
  password: yup.string().required("Please enter your password!").min(6),
});

const Login: React.FC<LoginProps> = ({ setType, setClose }) => {
  const { setProfile } = useProfile();
  const { mutate, isLoading } = useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      if (data.success) {
        toast.success("Login Successful");
        setProfile(data?.token, data?.id);
        setClose();
        if (typeof window !== "undefined") {
          window.location.reload();
        }
      } else {
        const msg = data.message || "Something went wrong";
        toast.error(msg);
      }
    },
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: schema,
    onSubmit: ({ email, password }) => {
      mutate({ email, password });
    },
  });
  const { errors, touched, handleSubmit, handleChange, values } = formik;

  return (
    <div className="mt-4">
      <h2 className="text-center text-xl font-bold text-theme-primary">
        Welcome Back
      </h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3 mt-3">
        <div className="flex flex-col gap-1">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            placeholder="me@gmail.com"
            name="email"
            className={`${
              errors.email && touched.email && "border-b-red-500"
            }  border-b-2 border-b-theme-primary p-2 outline-none bg-theme-secondary/10`}
            value={values.email}
            onChange={handleChange}
          />
          {errors.email && touched.email && (
            <span className=" text-red-500 pt-2 block">{errors.email}</span>
          )}
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            placeholder="password@#%!"
            name="password"
            value={values.password}
            onChange={handleChange}
            className={`${
              errors.password && touched.password && "border-b-red-500"
            }  border-b-2 border-b-theme-primary p-2 outline-none bg-theme-secondary/10`}
          />
          {errors.password && touched.password && (
            <span className=" text-red-500 pt-2 block">{errors.password}</span>
          )}
        </div>
        <p className=" mt-2">
          I don't have an account?.{" "}
          <span
            className=" font-semibold text-theme-primary hover:underline cursor-pointer"
            onClick={() => setType("signup")}
          >
            Sign up
          </span>
        </p>

        <Button isLoading={isLoading} label="Login" type="submit" />
      </form>
    </div>
  );
};
export default Login;

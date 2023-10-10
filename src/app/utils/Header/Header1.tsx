"use client";
import Auth from "@/app/components/modal/Auth";
import { useAuthModal } from "@/app/states/authModal";
import { useProfile } from "@/app/states/profile";
import React, { useState } from "react";
import { PiBrain } from "react-icons/pi";
import { IoIosPerson } from "react-icons/io";
import Link from "next/link";
import { Menu, MenuItem } from "@mui/material";
import { useRouter } from "next/navigation";

type Header1Props = {};

const Header1: React.FC<Header1Props> = () => {
  const { isOpen, setClose, setOpen } = useAuthModal();
  const { isAuthenticated, logoutUser } = useProfile();
  const [type, setType] = useState("signup");
  const router = useRouter();

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    logoutUser();
    handleClose();
  };

  return (
    <>
      <Auth open={isOpen} setClose={setClose} setType={setType} type={type} />
      <div className="w-full h-[80px] border flex items-center justify-center fixed top-0 left-0 right-0 z-40 bg-white overflow-x-hidden">
        <div className="lg:w-[80%]  w-[90%] flex items-center justify-between">
          <Link
            href={"/"}
            className="flex sm:flex-row flex-col gap-1 items-center sm:text-[1.4rem] text-[1.2rem] font-bold"
          >
            <PiBrain className="text-theme-tertiary sm:text-[1.6rem] text-[1.4rem] " />{" "}
            <span className="max-sm:-mt-2">
              My<span className=" text-theme-secondary">Mind</span>
            </span>
          </Link>
          <div>
            <ul className="flex items-center justify-evenly gap-5">
              <Link href={"/create"}>
                <li className=" hover:underline cursor-pointer  hidden md:block">
                  Write
                </li>
              </Link>
              {!isAuthenticated ? (
                <>
                  <li
                    className=" hover:underline cursor-pointer max-sm:hidden"
                    onClick={() => {
                      setOpen();
                      setType("login");
                    }}
                  >
                    Sign In
                  </li>
                  <li
                    className="p-2 px-3 bg-theme-primary text-theme-light rounded-full cursor-pointer"
                    onClick={setOpen}
                  >
                    Get Started
                  </li>
                </>
              ) : (
                <>
                  <li className=" hover:underline cursor-pointer hidden md:block">
                    <Link href={"/owner"}>My Blogs</Link>
                  </li>
                  <li>
                    <button
                      id="basic-button"
                      aria-controls={open ? "basic-menu" : undefined}
                      aria-haspopup="true"
                      aria-expanded={open ? "true" : undefined}
                      onClick={handleClick}
                      className="rounded-full bg-gray-300 flex items-center justify-center h-[2.4rem] w-[2.4rem] text-white  text-[1.2rem] cursor-pointer"
                    >
                      <IoIosPerson />
                    </button>
                  </li>
                </>
              )}
              <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                  "aria-labelledby": "basic-button",
                }}
                sx={{
                  "& .MuiPaper-root": {
                    mt: ".7rem",
                    padding: "3px",
                    width: "150px",
                  },
                }}
              >
                <MenuItem
                  onClick={() => {
                    handleClose();
                    router.push("/write");
                  }}
                  sx={{
                    ":hover": {
                      bgcolor: "#251a12",
                      color: "#dcd2c9",
                      borderRadius: "3px",
                    },
                  }}
                >
                  Write
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    handleClose();
                    router.push("/blogs");
                  }}
                  sx={{
                    ":hover": {
                      bgcolor: "#251a12",
                      color: "#dcd2c9",
                      borderRadius: "3px",
                    },
                  }}
                >
                  My Blogs
                </MenuItem>
                <MenuItem
                  onClick={handleLogout}
                  sx={{
                    ":hover": {
                      bgcolor: "#251a12",
                      color: "#dcd2c9",
                      borderRadius: "3px",
                    },
                  }}
                >
                  Logout
                </MenuItem>
              </Menu>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};
export default Header1;

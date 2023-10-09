import { Modal, Box } from "@mui/material";
import React from "react";
import Login from "../../components/Auth/Login";
import Signup from "../../components/Auth/Signup";

type AuthProps = {
  open: boolean;
  setClose: () => void;
  type?: string;
  setType: (type: string) => void;
};

const Auth: React.FC<AuthProps> = ({
  open,
  setClose,
  type = "signup",
  setType,
}) => {
  return (
    <Modal open={open} onClose={setClose}>
      <div className="max-h-[70vh] min-h-fit w-[400px] bg-white relative top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] outline-none rounded">
        <div className="p-4">
          {type === "login" ? (
            <Login setType={setType} setClose={setClose} />
          ) : (
            <Signup setType={setType} />
          )}
        </div>
      </div>
    </Modal>
  );
};
export default Auth;

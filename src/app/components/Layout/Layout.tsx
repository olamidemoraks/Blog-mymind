import Header1 from "@/app/utils/Header/Header1";
import Heading from "@/app/utils/Heading";
import React, { ReactNode } from "react";
import { Toaster } from "react-hot-toast";

type layoutProps = {
  children: ReactNode;
};

const Layout: React.FC<layoutProps> = ({ children }) => {
  return (
    <>
      <Toaster position="top-center" />
      <Heading
        title="MyMind"
        description="Discover stories, thinking, and expertise from writers on any topic."
        keywords="blog,stories,topic,technology,interest"
      />
      <Header1 />
      <div className="layout">{children}</div>
    </>
  );
};
export default Layout;

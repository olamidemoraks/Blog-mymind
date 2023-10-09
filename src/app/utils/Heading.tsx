import React from "react";

interface HeadingProps {
  title: string;
  description: string;
  keywords: string;
}

const Heading: React.FC<HeadingProps> = ({ description, keywords, title }) => {
  return (
    <>
      <title>{title}</title>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
    </>
  );
};
export default Heading;

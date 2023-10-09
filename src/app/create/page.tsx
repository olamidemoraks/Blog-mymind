import Layout from "../components/Layout/Layout";
import CreatePost from "../components/Post/CreatePost";

type pageProps = {};

const page: React.FC<pageProps> = () => {
  return (
    <Layout>
      <CreatePost />
    </Layout>
  );
};
export default page;

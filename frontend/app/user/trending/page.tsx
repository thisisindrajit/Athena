import CTrending from "@/components/user/CTrending";
import { APP_NAME } from "@/constants/common";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: `Trending - ${APP_NAME}`,
  description: `Trending courses and snippets on ${APP_NAME}`,
};

const Trending = () => {
  return <CTrending />;
};

export default Trending;

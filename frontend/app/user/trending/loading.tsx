import Loader from "@/components/common/Loader";

const Loading = () => {
  return (
    <Loader
      loadingText="Loading trending"
      className="h-[calc(100vh-22rem)] lg:h-auto"
    />
  );
};

export default Loading;

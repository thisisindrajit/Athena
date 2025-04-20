import Loader from "@/components/common/Loader";

const Loading = () => {
  return (
    <Loader
      loadingText="Loading saved"
      className="h-[calc(100dvh-22rem)] lg:h-auto"
    />
  );
};

export default Loading;

import Loader from "@/components/common/Loader";

const Loading = () => {
  // The pt-32 class is to handle the pb-32 class in the main content container div in layout.tsx
  // The pb-32 class is added so that the bottom bar does not hide the last part of the page
  return <Loader className="pt-32 lg:pt-0 lg:min-h-[calc(100dvh-9.5rem)]" />;
};

export default Loading;

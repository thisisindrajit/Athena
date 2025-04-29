import Loader from "@/components/common/Loader";

const Loading = () => {
  // The pt-16 class is to handle the pb-16 class in the main content container div in layout.tsx
  // The pb-16 class is added so that the bottom bar does not hide the footer
  return <Loader className="pt-16 lg:pt-0 lg:min-h-[calc(100dvh-9.5rem)]" />;
};

export default Loading;

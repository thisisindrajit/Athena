import SnippetCard from "@/components/common/SnippetCard";
import TitleHolder from "@/components/holders/TitleHolder";

const Trending = () => {
  return (
    <>
      <div className="flex flex-col gap-4">
        <TitleHolder
          boldText="Trending"
          lightText="Courses 📚"
          makeBoldTextUppercase
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3 gap-4">
          <SnippetCard />
          <SnippetCard />
          <SnippetCard />
          <SnippetCard />
        </div>
      </div>
      <div className="flex flex-col gap-4 mt-4">
        <TitleHolder
          boldText="Trending"
          lightText="Snippets 🚀"
          makeBoldTextUppercase
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3 gap-4">
          <SnippetCard />
          <SnippetCard />
          <SnippetCard />
        </div>
      </div>
    </>
  );
};

export default Trending;

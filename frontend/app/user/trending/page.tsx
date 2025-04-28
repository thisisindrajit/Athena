import CourseCard from "@/components/common/CourseCard";
import SnippetCard from "@/components/common/SnippetCard";
import TitleHolder from "@/components/holders/TitleHolder";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Trending = () => {
  return (
    <Tabs defaultValue="courses" className="gap-4">
      <TabsList className="w-full mt-1 select-none">
        <TabsTrigger value="courses">Courses</TabsTrigger>
        <TabsTrigger value="snippets">Snippets</TabsTrigger>
      </TabsList>
      <TabsContent value="courses">
        <div className="flex flex-col gap-4">
          <TitleHolder
            boldText="Trending"
            lightText="Courses 📚"
            makeBoldTextUppercase
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3 gap-4">
            <CourseCard />
            <CourseCard />
            <CourseCard />
            <CourseCard />
            <CourseCard />
          </div>
        </div>
      </TabsContent>
      <TabsContent value="snippets">
        <div className="flex flex-col gap-4">
          <TitleHolder
            boldText="Trending"
            lightText="Snippets 📈"
            makeBoldTextUppercase
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3 gap-4">
            <SnippetCard />
            <SnippetCard />
            <SnippetCard />
          </div>
        </div>
      </TabsContent>
    </Tabs>
  );
};

export default Trending;

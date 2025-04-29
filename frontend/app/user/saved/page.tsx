import { Metadata } from "next";
import { APP_NAME } from "@/constants/common";
import { auth } from "@/lib/auth";
import CourseCard from "@/components/common/CourseCard";
import SnippetCard from "@/components/common/SnippetCard";
import TitleHolder from "@/components/holders/TitleHolder";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { headers } from "next/headers";

export async function generateMetadata(): Promise<Metadata> {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  return {
    title: `${session?.user.name}'s saved items - ${APP_NAME}`,
    description: `${session?.user.name}'s saved items on ${APP_NAME}`,
  };
}

const Saved = () => {
  return (
    <Tabs defaultValue="courses" className="gap-4">
      <TabsList className="w-full mt-1 select-none">
        <TabsTrigger value="courses">Courses</TabsTrigger>
        <TabsTrigger value="snippets">Snippets</TabsTrigger>
      </TabsList>
      <TabsContent value="courses">
        <div className="flex flex-col gap-4">
          <TitleHolder
            boldText="Saved"
            lightText="Courses"
            makeBoldTextUppercase
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3 gap-4">
            <CourseCard showSaveAndShare />
            <CourseCard showSaveAndShare />
            <CourseCard showSaveAndShare />
          </div>
        </div>
      </TabsContent>
      <TabsContent value="snippets">
        <div className="flex flex-col gap-4">
          <TitleHolder
            boldText="Saved"
            lightText="Snippets"
            makeBoldTextUppercase
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3 gap-4">
            <SnippetCard showSaveAndShare />
            <SnippetCard showSaveAndShare />
            <SnippetCard showSaveAndShare />
          </div>
        </div>
      </TabsContent>
    </Tabs>
  );
};

export default Saved;

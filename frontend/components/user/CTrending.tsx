"use client";

import TitleHolder from "@/components/holders/TitleHolder";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CTrendingCourses from "../home/CTrendingCourses";
import CTrendingSnippets from "../home/CTrendingSnippets";

const CTrending = () => {
    return <Tabs defaultValue="courses" className="gap-4">
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
                <CTrendingCourses />
            </div>
        </TabsContent>
        <TabsContent value="snippets">
            <div className="flex flex-col gap-4">
                <TitleHolder
                    boldText="Trending"
                    lightText="Snippets 📈"
                    makeBoldTextUppercase
                />
                <CTrendingSnippets />
            </div>
        </TabsContent>
    </Tabs>;
}

export default CTrending;
"use client";

import TitleHolder from "@/components/holders/TitleHolder";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CTrendingCourses from "../common/CTrendingCourses";
import CTrendingModules from "../common/CTrendingModules";

const CTrending = () => {
    return <Tabs defaultValue="courses" className="gap-4">
        <TabsList className="w-full mt-1 select-none">
            <TabsTrigger value="courses">Courses</TabsTrigger>
            <TabsTrigger value="modules">Modules</TabsTrigger>
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
        <TabsContent value="modules">
            <div className="flex flex-col gap-4">
                <TitleHolder
                    boldText="Trending"
                    lightText="Modules 📈"
                    makeBoldTextUppercase
                />
                <CTrendingModules />
            </div>
        </TabsContent>
    </Tabs>;
}

export default CTrending;
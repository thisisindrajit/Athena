"use client";

import TitleHolder from "@/components/holders/TitleHolder";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const CSaved = () => {
    return <Tabs defaultValue="courses" className="gap-4">
        <TabsList className="w-full mt-1 select-none">
            <TabsTrigger value="courses">Courses</TabsTrigger>
            <TabsTrigger value="modules">Modules</TabsTrigger>
        </TabsList>
        <TabsContent value="courses">
            <div className="flex flex-col gap-4">
                <TitleHolder
                    boldText="Saved"
                    lightText="Courses"
                    makeBoldTextUppercase
                />
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3 gap-4">
                </div>
            </div>
        </TabsContent>
        <TabsContent value="modules">
            <div className="flex flex-col gap-4">
                <TitleHolder
                    boldText="Saved"
                    lightText="Modules"
                    makeBoldTextUppercase
                />
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3 gap-4">
                </div>
            </div>
        </TabsContent>
    </Tabs>;
}

export default CSaved;
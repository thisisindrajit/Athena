// import { QueryClient } from "@tanstack/react-query";

import { mockData } from "@/constants/common";
import { LayoutGrid, Map } from "lucide-react";
import Link from "next/link";

// const Course = async ({
//     params,
// }: {
//     params: Promise<{ id: number }>
// }) => {
//      const { id } = await params;
//      TODO: Fetch course data from API
//      const queryClient = new QueryClient()

//      await queryClient.prefetchQuery({
//          queryKey: ['course', id],
//          queryFn: getCourse,
//      })

const Course = () => {

    return <div className="flex gap-4">
        {/* Sidebar (For size xl and greater) */}
        <div className="hidden xl:block h-fit min-w-112 rounded-xl sticky top-21 mt-1.25 border shadow-lg dark:bg-foreground/5 overflow-hidden">
            <div className="flex flex-col gap-3 overflow-auto h-[calc(100dvh-12rem)] p-3">
                <Link className="bg-secondary text-secondary-foreground p-2.5 font-medium rounded-md flex items-center gap-2" href={`/course/${mockData.course_id}`}><LayoutGrid className="h-4 w-4" />{mockData.title}</Link>
                {mockData.modules.map((module) => (
                    <Link className="bg-secondary/10 border border-secondary/50 p-2.5 font-medium rounded-md flex items-center gap-2" href={`/course/module/${module.module_id}`} key={`${mockData.course_id}-${module.module_id}`}>
                        <Map className="h-4 w-4" /> {module.title}
                    </Link>
                ))}
            </div>
        </div>
        {/* Course content */}
        {/* Main content */}
        <div className="w-full flex flex-col gap-8 min-h-[calc(100dvh-12rem)]">
            Course content goes here...
        </div>
    </div>;
}

export default Course;
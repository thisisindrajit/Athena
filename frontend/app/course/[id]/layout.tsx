"use client"

// import { QueryClient } from "@tanstack/react-query";

import { mockData } from "@/constants/common";
import { LayoutGrid, Map, FileText, Target } from "lucide-react";
import Link from "next/link";
import { usePathname } from 'next/navigation';

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

const CourseLayout = ({ children }: { children: React.ReactNode }) => {
    const pathname = usePathname();

    return <div className="flex gap-4">
        {/* Sidebar (For size xl and greater) */}
        <div className="hidden xl:block h-fit min-w-112 rounded-xl sticky top-21 mt-1.25 border shadow-lg dark:bg-foreground/5 overflow-hidden">
            <div className="flex flex-col gap-3 overflow-auto h-fit max-h-[calc(100dvh-12rem)] p-3">
                <Link className={`${pathname === `/course/${mockData.course_id}` && 'bg-secondary text-secondary-foreground'} p-2.5 font-medium rounded-md flex items-center gap-2 hover:underline transition-all`} href={`/course/${mockData.course_id}`}><LayoutGrid className="h-4 w-4" />{mockData.title}</Link>
                {mockData.modules.map((module) => (
                    <div key={`${mockData.course_id}-${module.module_id}`}>
                        <Link className={`${pathname === `/course/${mockData.course_id}/module/${module.module_id}` ? 'bg-secondary text-secondary-foreground' : 'bg-secondary/25 dark:bg-secondary/10'} border border-secondary/50 p-2.5 font-medium rounded-md flex items-center gap-2 hover:underline transition-all`} href={`/course/${mockData.course_id}/module/${module.module_id}`} >
                            <Map className="h-4 w-4" /> {module.title}
                        </Link>
                        <div className="flex flex-col pl-4 py-2 gap-2">
                            {module.content.map((item) => (
                                <Link
                                    key={`${module.module_id}-${item.lesson_id || item.activity_id}`}
                                    href={item.lesson_id ? `/course/${mockData.course_id}/module/${module.module_id}/lesson/${item.lesson_id}` : `/course/${mockData.course_id}/module/${module.module_id}/activity/${item.activity_id}`}
                                    className={`${pathname === `/course/${mockData.course_id}/module/${module.module_id}/lesson/${item.lesson_id}` || pathname === `/course/${mockData.course_id}/module/${module.module_id}/activity/${item.activity_id}` ? 'bg-secondary text-secondary-foreground' : 'hover:bg-foreground/5'} p-2.5 font-medium rounded-md flex items-center gap-2 text-sm hover:underline transition-all`}
                                >
                                    {item.lesson_id ? <FileText className="h-4 w-4" /> : <Target className="h-4 w-4" />}
                                    {item.title}
                                </Link>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
        {/* Course content */}
        {/* Main content */}
        <div className="w-full flex flex-col gap-8 min-h-[calc(100dvh-12rem)]">
            {children}
        </div>
    </div>;
}

export default CourseLayout;
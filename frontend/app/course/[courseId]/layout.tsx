"use client"

import Error from "@/components/common/Error";
import Loader from "@/components/common/Loader";
import { ICourse } from "@/interfaces/ICourse";
import { fetchCourse } from "@/queries/fetchCourse";
import { useQuery } from "@tanstack/react-query";
import { LayoutGrid, Map, FileText, Target } from "lucide-react";
import Link from "next/link";
import { useParams, usePathname } from 'next/navigation';
import { useId } from "react";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectSeparator,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

const CourseLayout = ({ children }: { children: React.ReactNode }) => {
    const { courseId } = useParams<{ courseId: string }>();
    const pathname = usePathname();

    const { isPending, isError, data, error } = useQuery<ICourse>({
        queryKey: ['course', courseId],
        queryFn: () => fetchCourse(courseId),
    })

    if (isPending) {
        return <Loader loadingText="Loading course" />;
    }

    if (isError) {
        console.log(error);
        return <Error errorText="Error while loading course!" />;
    }

    return <div className="flex flex-col xl:flex-row gap-8 xl:gap-4">
        {/* Select (For sizes less than xl) */}
        <div className="block xl:hidden *:not-first:mt-2">
            <Select defaultValue="1">
                <SelectTrigger>
                    <SelectValue placeholder="Select framework" />
                </SelectTrigger>
                <SelectContent className="w-screen">
                    <SelectGroup>
                        <SelectLabel>Frontend</SelectLabel>
                        <SelectItem value="1">React</SelectItem>
                        <SelectItem value="2">Vue</SelectItem>
                        <SelectItem value="3">Angular</SelectItem>
                    </SelectGroup>
                    <SelectSeparator />
                    <SelectGroup>
                        <SelectLabel>Backend</SelectLabel>
                        <SelectItem value="4">Node.js</SelectItem>
                        <SelectItem value="5">Python</SelectItem>
                        <SelectItem value="6">Java</SelectItem>
                    </SelectGroup>
                </SelectContent>
            </Select>
        </div>
        {/* Sidebar (For size xl and greater) */}
        <div className="hidden xl:block h-fit min-w-112 rounded-xl sticky top-21 mt-1.25 border shadow-lg dark:bg-foreground/5 overflow-hidden">
            <div className="flex flex-col gap-3 overflow-auto h-fit max-h-[calc(100dvh-12rem)] p-3">
                <Link className={`${pathname === `/course/${data.courseId}` && 'bg-secondary text-secondary-foreground'} p-2.5 font-medium rounded-md flex items-center gap-2 hover:underline transition-all`} href={`/course/${data.courseId}`}><LayoutGrid className="h-4 w-4" />{data.topic}</Link>
                {data.modules.map((module) => (
                    <div key={`${data.courseId}-${module.moduleId}`}>
                        <Link className={`${pathname === `/course/${data.courseId}/module/${module.moduleId}` ? 'bg-secondary text-secondary-foreground' : 'bg-secondary/25 dark:bg-secondary/10'} border border-secondary/50 p-2.5 font-medium rounded-md flex items-center gap-2 hover:underline transition-all`} href={`/course/${data.courseId}/module/${module.moduleId}`} >
                            <Map className="h-4 w-4" /> {module.title}
                        </Link>
                        <div className="flex flex-col pl-4 py-2 gap-2">
                            {module.content.map((item) => (
                                <Link
                                    key={`${module.moduleId}-${item.lessonId || item.activityId}`}
                                    href={item.lessonId ? `/course/${data.courseId}/module/${module.moduleId}/lesson/${item.lessonId}` : `/course/${data.courseId}/module/${module.moduleId}/activity/${item.activityId}`}
                                    className={`${pathname === `/course/${data.courseId}/module/${module.moduleId}/lesson/${item.lessonId}` || pathname === `/course/${data.courseId}/module/${module.moduleId}/activity/${item.activityId}` ? 'bg-secondary text-secondary-foreground' : 'hover:bg-foreground/5'} p-2.5 font-medium rounded-md flex items-center gap-2 text-sm hover:underline transition-all`}
                                >
                                    {item.lessonId ? <FileText className="h-4 w-4" /> : <Target className="h-4 w-4" />}
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
        <div className="w-full flex flex-col gap-4 xl:min-h-[calc(100dvh-12rem)]">
            {children}
        </div>
    </div>;
}

export default CourseLayout;
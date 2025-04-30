"use client"

import Error from "@/components/common/Error";
import Loader from "@/components/common/Loader";
import { ICourse } from "@/interfaces/ICourse";
import { fetchCourse } from "@/queries/fetchCourse";
import { useQuery } from "@tanstack/react-query";
import { LayoutGrid, Map, FileText, Target } from "lucide-react";
import Link from "next/link";
import { useParams, usePathname } from 'next/navigation';
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
import { useRouter } from "next/navigation";

const CourseLayout = ({ children }: { children: React.ReactNode }) => {
    const router = useRouter();
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

    return <div className="flex flex-col xl:flex-row gap-8">
        {/* Select (For sizes less than xl) */}
        <div className="block xl:hidden sticky top-19">
            <Select value={pathname} onValueChange={(value) => {
                router.push(value);
            }}>
                <SelectTrigger className="w-full bg-background dark:bg-neutral-800 dark:hover:bg-neutral-800 shadow-lg data-[size=default]:h-12">
                    <SelectValue placeholder="Select item" />
                </SelectTrigger>
                <SelectContent className="max-w-[90vw] xs:max-w-[95vw] sm:max-w-full" align="center">
                    <SelectGroup>
                        <SelectLabel>Course</SelectLabel>
                        <SelectItem value={`/course/${data.courseId}`} className="data-[state=checked]:bg-secondary data-[state=checked]:text-secondary-foreground">
                            <div className="flex gap-2.5 p-1.5"><LayoutGrid className="h-4 min-w-4 mt-0.5 text-inherit leading-relaxed" />{data.topic}</div>
                        </SelectItem>
                    </SelectGroup>
                    <SelectSeparator />
                    <SelectGroup>
                        <SelectLabel>Modules</SelectLabel>
                        {data.modules.map((module) => (
                            <div key={`${data.courseId}-${module.moduleId}`}>
                                <SelectItem value={`/course/${data.courseId}/module/${module.moduleId}`} className="bg-secondary/25 dark:bg-secondary/10 dark:hover:bg-accent data-[state=checked]:bg-secondary data-[state=checked]:text-secondary-foreground dark:data-[state=checked]:bg-secondary dark:data-[state=checked]:text-secondary-foreground">
                                    <div className="flex gap-2.5 p-1.5">
                                        <Map className="h-4 min-w-4 mt-0.75 text-inherit" /> 
                                        <span className="leading-relaxed">{module.title}</span>
                                    </div>
                                </SelectItem>
                                <SelectGroup className="pl-4 py-2 flex flex-col gap-2">
                                    {module.content.map((item) => (
                                        <SelectItem
                                            key={`${module.moduleId}-${item.lessonId || item.activityId}`}
                                            value={item.lessonId ? `/course/${data.courseId}/module/${module.moduleId}/lesson/${item.lessonId}` : `/course/${data.courseId}/module/${module.moduleId}/activity/${item.activityId}`}
                                            className="data-[state=checked]:bg-secondary data-[state=checked]:text-secondary-foreground"
                                        >
                                            <div className="flex gap-2.5 p-1.5">
                                                {item.lessonId ? <FileText className="h-4 min-w-4 mt-0.75 text-inherit" /> : <Target className="h-4 min-w-4 mt-0.75 text-inherit" />}
                                                <span className="leading-relaxed">{item.title}</span>
                                            </div>
                                        </SelectItem>
                                    ))}
                                </SelectGroup>
                            </div>
                        ))}
                    </SelectGroup>
                </SelectContent>
            </Select>
        </div>
        {/* Sidebar (For size xl and greater) */}
        <div className="hidden xl:block h-fit min-w-112 rounded-xl sticky top-21 mt-1.25 border shadow-lg dark:bg-foreground/5 overflow-hidden">
            <div className="flex flex-col gap-3 overflow-auto h-fit max-h-[calc(100dvh-12rem)] p-3">
                <Link className={`${pathname === `/course/${data.courseId}` && 'bg-secondary text-secondary-foreground'} p-2.5 font-medium rounded-md flex gap-2 hover:underline transition-all`} href={`/course/${data.courseId}`}><LayoutGrid className="h-4 min-w-4 mt-1" /><span className="leading-relaxed">{data.topic}</span></Link>
                {data.modules.map((module) => (
                    <div key={`${data.courseId}-${module.moduleId}`}>
                        <Link className={`${pathname === `/course/${data.courseId}/module/${module.moduleId}` ? 'bg-secondary text-secondary-foreground' : 'bg-secondary/25 dark:bg-secondary/10'} border border-secondary/50 p-2.5 font-medium rounded-md flex gap-2 hover:underline transition-all`} href={`/course/${data.courseId}/module/${module.moduleId}`} >
                            <Map className="h-4 min-w-4 mt-1.25" />
                            <span className="w-full leading-relaxed">{module.title}</span>
                        </Link>
                        <div className="flex flex-col pl-4 py-2 gap-2">
                            {module.content.map((item) => (
                                <Link
                                    key={`${module.moduleId}-${item.lessonId || item.activityId}`}
                                    href={item.lessonId ? `/course/${data.courseId}/module/${module.moduleId}/lesson/${item.lessonId}` : `/course/${data.courseId}/module/${module.moduleId}/activity/${item.activityId}`}
                                    className={`${pathname === `/course/${data.courseId}/module/${module.moduleId}/lesson/${item.lessonId}` || pathname === `/course/${data.courseId}/module/${module.moduleId}/activity/${item.activityId}` ? 'bg-secondary text-secondary-foreground' : 'hover:bg-foreground/5'} p-2.5 font-medium rounded-md flex gap-2 text-sm hover:underline transition-all`}
                                >
                                    {item.lessonId ? <FileText className="h-4 min-w-4 mt-0.75" /> : <Target className="h-4 min-w-4 mt-0.75" />}
                                    <span className="w-full leading-relaxed">{item.title}</span>
                                </Link>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
        {/* Main content */}
        <div className="w-full flex flex-col gap-4 xl:min-h-[calc(100dvh-12rem)]">
            {children}
        </div>
    </div>;
}

export default CourseLayout;
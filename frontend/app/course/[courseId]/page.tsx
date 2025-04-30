"use client"

import Error from "@/components/common/Error";
import Loader from "@/components/common/Loader";
import { Separator } from "@/components/ui/separator";
import { PREFERENCES } from "@/constants/common";
import { ICourse } from "@/interfaces/ICourse";
import { fetchCourse } from "@/queries/fetchCourse";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

const Course = () => {
    const { courseId } = useParams<{ courseId: string }>();

    const { isPending, isError, data: course, error } = useQuery<ICourse>({
        queryKey: ['course', courseId],
        queryFn: () => fetchCourse(courseId),
    })

    if (isPending) {
        return <Loader loadingText="Loading course details" />;
    }

    if (isError) {
        console.log(error);
        return <Error errorText="Error while loading course details!" />;
    }

    return <>
        <div className="flex flex-col gap-2">
            <span className="text-xl sm:text-2xl font-bold">{course.topic}</span>
            <div className="bg-primary/5 text-primary text-sm px-2 py-1 font-medium w-fit">
                {course.metadata.count.modules} modules, {course.metadata.count.lessons} lessons, {course.metadata.count.activities} activities
            </div>
            <div className="flex gap-2 flex-wrap">
                <div className="border border-dashed border-foreground/25 py-1 px-2 rounded-md text-sm">{PREFERENCES["LEVEL"].filter((pref) => pref.toLowerCase().includes(course.preferences.level.toLowerCase()))}</div>
                <div className="border border-dashed border-foreground/25 py-1 px-2 rounded-md text-sm">{PREFERENCES["DURATION"].filter((pref) => pref.toLowerCase().includes(course.preferences.duration.toLowerCase()))}</div>
                <div className="border border-dashed border-foreground/25 py-1 px-2 rounded-md text-sm">{PREFERENCES["FOCUS"].filter((pref) => pref.toLowerCase().includes(course.preferences.focus.toLowerCase()))}</div>
            </div>
        </div>
        <Separator className="bg-gradient-to-r from-foreground to-transparent" />
        <div className="prose dark:prose-invert min-w-full"><ReactMarkdown remarkPlugins={[remarkGfm]}>{course.description}</ReactMarkdown></div>
    </>;
}

export default Course;
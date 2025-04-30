"use client";

import Error from "@/components/common/Error";
import Loader from "@/components/common/Loader";
import { Separator } from "@/components/ui/separator";
import { ICourse } from "@/interfaces/ICourse";
import { fetchCourse } from "@/queries/fetchCourse";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

const Lesson = () => {
    const { courseId, moduleId, lessonId } = useParams<{ courseId: string, moduleId: string, lessonId: string }>();

    const { isPending, isError, data, error } = useQuery<ICourse>({
        queryKey: ['course', courseId],
        queryFn: () => fetchCourse(courseId),
    })

    if (isPending) {
        return <Loader loadingText="Loading lesson" />;
    }

    if (isError) {
        console.log(error);
        return <Error errorText="Error while loading lesson!" />;
    }

    const lesson = data.modules.find((module) => module.moduleId === parseInt(moduleId))?.content.find((lesson) => lesson.lessonId === parseInt(lessonId));

    if (!lesson) {
        return <Error errorText="Lesson not found!" />;
    }

    return <>
        <div className="text-xl sm:text-2xl font-bold text-primary">
            {lesson.title}
        </div>
        <Separator className="bg-gradient-to-r from-foreground to-transparent" />
        <div className="prose dark:prose-invert min-w-full"><ReactMarkdown remarkPlugins={[remarkGfm]}>{lesson.content.value}</ReactMarkdown></div>
    </>;;
}

export default Lesson;
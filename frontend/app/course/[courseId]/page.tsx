"use client"

import Error from "@/components/common/Error";
import Loader from "@/components/common/Loader";
import { Separator } from "@/components/ui/separator";
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
        <div className="text-xl sm:text-2xl font-bold text-primary">
            {course.topic}
        </div>
        <Separator className="bg-gradient-to-r from-foreground to-transparent" />
        <ReactMarkdown className="prose dark:prose-invert min-w-full" remarkPlugins={[remarkGfm]}>{course.description}</ReactMarkdown>
    </>;
}

export default Course;
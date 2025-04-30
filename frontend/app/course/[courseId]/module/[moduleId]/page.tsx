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

const Module = () => {
    const { courseId, moduleId } = useParams<{ courseId: string, moduleId: string }>();

    const { isPending, isError, data, error } = useQuery<ICourse>({
        queryKey: ['course', courseId],
        queryFn: () => fetchCourse(courseId),
    })

    if (isPending) {
        return <Loader loadingText="Loading module details"/>;
    }

    if (isError) {
        console.log(error);
        return <Error errorText="Error while loading module details!" />;
    }

    const courseModule = data.modules.find((cm) => cm.moduleId === parseInt(moduleId));

    if (!courseModule) {
        return <Error errorText="Module not found!" />;
    }

    return <>
        <div className="text-xl sm:text-2xl font-bold text-primary">
            {courseModule.title}
        </div>
        <Separator className="bg-gradient-to-r from-foreground to-transparent" />
        <div className="prose dark:prose-invert min-w-full"><ReactMarkdown remarkPlugins={[remarkGfm]}>{courseModule.description}</ReactMarkdown></div>
    </>;
}

export default Module;
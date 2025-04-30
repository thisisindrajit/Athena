"use client";

import Error from "@/components/common/Error";
import Loader from "@/components/common/Loader";
import { Separator } from "@/components/ui/separator";
import { ICourse } from "@/interfaces/ICourse";
import { fetchCourse } from "@/queries/fetchCourse";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";

const CActivity = () => {
    const { courseId, moduleId, activityId } = useParams<{ courseId: string, moduleId: string, activityId: string }>();

    const { isPending, isError, data, error } = useQuery<ICourse>({
        queryKey: ['course', courseId],
        queryFn: () => fetchCourse(courseId),
    })

    if (isPending) {
        return <Loader loadingText="Loading activity" />;
    }

    if (isError) {
        console.log(error);
        return <Error errorText="Error while loading activity!" />;
    }

    const activity = data.modules.find((module) => module.moduleId === parseInt(moduleId))?.content.find((activity) => activity.activityId === parseInt(activityId));

    if (!activity) {
        return <Error errorText="Activity not found!" />;
    }

    return <>
        <div className="text-xl sm:text-2xl font-bold text-primary">
            {activity.title}
        </div>
        <Separator className="bg-gradient-to-r from-foreground to-transparent" />
        {JSON.stringify(activity.content)}
    </>;
}

export default CActivity;
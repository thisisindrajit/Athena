"use client";

import Error from "@/components/common/Error";
import Loader from "@/components/common/Loader";
import { Separator } from "@/components/ui/separator";
import { ICourse } from "@/interfaces/ICourse";
import { fetchCourse } from "@/queries/fetchCourse";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import CQuiz from "./CQuiz";

const CActivity = () => {
    const { courseId, moduleId, activityId } = useParams<{ courseId: string, moduleId: string, activityId: string }>();

    const { isPending, isError, data, error } = useQuery<ICourse>({
        queryKey: ['course', courseId],
        queryFn: async () => await fetchCourse(courseId),
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

    return <CQuiz question={activity.content.question} options={activity.content.options} answer={activity.content.answer} />;
}

export default CActivity;
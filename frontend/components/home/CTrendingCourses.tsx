"use client";

import { useQuery } from "@tanstack/react-query";
import { ICourse } from "@/interfaces/ICourse";
import Loader from "../common/Loader";
import Error from "../common/Error";
import CourseCard from "../cards/CourseCard";
import { fetchTrendingCourses } from "@/queries/fetchTrendingCourses";
import { FC } from "react";
import { cn } from "@/lib/utils";

interface ITrendingCoursesProps {
    showSave?: boolean;
    className?: string;
}

const CTrendingCourses: FC<ITrendingCoursesProps> = ({ showSave = true, className }) => {
    const { isPending, isError, data: trendingCourses, error } = useQuery<ICourse[]>({
        queryKey: ['trending-courses'],
        queryFn: async () => await fetchTrendingCourses()
    });

    if (isPending) {
        return <Loader loadingText="Loading trending courses" className="my-32" />;
    }

    if (isError) {
        console.log(error);
        return <Error errorText="Error while loading trending courses!" className="my-32" />;
    }

    return trendingCourses.length === 0 ? (
        <div className="w-full my-16 text-center">
            No trending courses found 😭. Please check back later!
        </div>
    ) :
        <div className={cn("grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3 gap-4", className)}>
            {trendingCourses.map((course, index) => (
                <CourseCard
                    key={index}
                    course={course}
                    showSave={showSave}
                />
            ))}
        </div>;
}

export default CTrendingCourses;
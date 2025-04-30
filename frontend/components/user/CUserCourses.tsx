"use client";

import { useQuery } from "@tanstack/react-query";
import { ICourse } from "@/interfaces/ICourse";
import { fetchUserCourses } from "@/queries/fetchUserCourses";
import { FC } from "react";
import Loader from "../common/Loader";
import Error from "../common/Error";
import CourseCard from "../cards/CourseCard";

interface ICUserCoursesProps {
    userId: string;
    showSave?: boolean;
}

const CUserCourses: FC<ICUserCoursesProps> = ({ userId, showSave }) => {
    const { isPending, isError, data: userCourses, error } = useQuery<ICourse[]>({
        queryKey: ['user-courses', userId],
        queryFn: async () => await fetchUserCourses(userId),
    });

    if (isPending) {
        return <Loader loadingText="Loading user courses" className="my-32" />;
    }

    if (isError) {
        console.log(error);
        return <Error errorText="Error while loading user courses!" className="my-32" />;
    }

    return userCourses.length === 0 ? (
        <div className="w-full my-16 text-center">
            No courses found 😭. Please check back later!
        </div>
    ) :
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3 gap-4">
            {userCourses.map((course, index) => (
                <CourseCard
                    key={index}
                    course={course}
                    showSave={showSave}
                />
            ))}
        </div>;
}

export default CUserCourses;
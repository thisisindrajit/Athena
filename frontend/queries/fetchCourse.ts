import { ICourse } from "@/interfaces/ICourse";

export const fetchCourse = async (courseId: string) => {
    const course = await fetch(`/api/v1/courses/id/${courseId}`);

    if (!course.ok) {
        throw { errorText: `Some error occurred while fetching course. ${course.statusText} - ${course.status}` };
    }

    const courseData: ICourse = await course.json();

    return courseData;
}
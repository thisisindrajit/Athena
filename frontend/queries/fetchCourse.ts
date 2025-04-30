import { ICourse } from "@/interfaces/ICourse";

export const fetchCourse = async (courseId: string) => {
    const course = await fetch(`/api/v1/courses/${courseId}`);

    if (!course.ok) {
        throw { errorText: `${course.statusText} - ${course.status}` };
    }

    const courseData: ICourse = await course.json();

    return courseData;
}
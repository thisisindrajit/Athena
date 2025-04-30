export const fetchCourse = async (courseId: string) => {
    let course = await fetch(`/api/v1/courses/${courseId}`);

    if (!course.ok) {
        throw { errorText: `${course.statusText} - ${course.status}` };
    }

    const courseData = await course.json();

    return courseData;
}
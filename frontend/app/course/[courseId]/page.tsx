import CCourse from "@/components/course/CCourse";
import { APP_NAME } from "@/constants/common";
import { Metadata } from "next";

export async function generateMetadata({ params }: { params: Promise<{ courseId: string }> }): Promise<Metadata> {
    const { courseId } = await params;
    const course = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/courses/id/${courseId}`);

    if (!course.ok) {
        return {
            title: `Course not found! - ${APP_NAME}`
        };
    }

    const courseData = await course.json();

    return {
        title: `${courseData.topic} - ${APP_NAME}`,
        description: `This is the course page for ${courseData.topic}`,
    };
}

const Course = () => {
    return <CCourse />;
}

export default Course;
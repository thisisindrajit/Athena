import CLesson from "@/components/course/CLesson";
import { APP_NAME } from "@/constants/common";
import { ICourse } from "@/interfaces/ICourse";
import { Metadata } from "next";

export async function generateMetadata({ params }: { params: Promise<{ courseId: string, moduleId: string, lessonId: string }> }): Promise<Metadata> {
    const { courseId, moduleId, lessonId } = await params;
    const course = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/courses/id/${courseId}`);

    if (!course.ok) {
        return {
            title: `Course not found! - ${APP_NAME}`
        };
    }

    const courseData: ICourse = await course.json();

    const lesson = courseData.modules.find((module) => module.moduleId === parseInt(moduleId))?.content.find((lesson) => lesson.lessonId === parseInt(lessonId));

    if (!lesson) {
        return {
            title: `Lesson not found! - ${APP_NAME}`
        };
    }

    return {
        title: `${lesson.title} - ${APP_NAME}`,
        description: `This is the lesson page for ${lesson.title}`,
    };
}

const Lesson = () => {
    return <CLesson />;
}

export default Lesson;
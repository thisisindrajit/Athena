import CModule from "@/components/course/CModule";
import { APP_NAME } from "@/constants/common";
import { ICourse } from "@/interfaces/ICourse";
import { Metadata } from "next";

export async function generateMetadata({ params }: { params: Promise<{ courseId: string, moduleId: string }> }): Promise<Metadata> {
    const { courseId, moduleId } = await params;
    const course = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/courses/id/${courseId}`);

    if (!course.ok) {
        return {
            title: `Course not found! - ${APP_NAME}`
        };
    }

    const courseData: ICourse = await course.json();

    const courseModule = courseData.modules.find((cm) => cm.moduleId === parseInt(moduleId));

    if (!courseModule) {
        return {
            title: `Module not found! - ${APP_NAME}`
        };
    }

    return {
        title: `${courseModule.title} - ${APP_NAME}`,
        description: `This is the module page for ${courseModule.title}`,
    };
}

const Module = () => {
    return <CModule />;
}

export default Module;
import CActivity from "@/components/course/CActivity";
import { APP_NAME } from "@/constants/common";
import { ICourse } from "@/interfaces/ICourse";
import { Metadata } from "next";

export async function generateMetadata({ params }: { params: Promise<{ courseId: string, moduleId: string, activityId: string }> }): Promise<Metadata> {
    const { courseId, moduleId, activityId } = await params;
    const course = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/courses/id/${courseId}`);

    if (!course.ok) {
        return {
            title: `Course not found! - ${APP_NAME}`
        };
    }

    const courseData: ICourse = await course.json();

    const activity = courseData.modules.find((module) => module.moduleId === parseInt(moduleId))?.content.find((activity) => activity.activityId === parseInt(activityId));

    if (!activity) {
        return {
            title: `Activity not found! - ${APP_NAME}`
        };
    }

    return {
        title: `${activity.title} - ${APP_NAME}`,
        description: `This is the activity page for ${activity.title}`,
    };
}

const Activity = () => {
    return <CActivity />;
}

export default Activity;
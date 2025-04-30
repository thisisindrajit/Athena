import { ArrowRight, Bookmark, Share } from "lucide-react";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import { APP_NAME, PREFERENCES } from "@/constants/common";
import { FC } from "react";
import { ICourse } from "@/interfaces/ICourse";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import Link from "next/link";
import CShare from "../common/CShare";

interface CourseCardProps {
    course: ICourse;
    showSave?: boolean;
}

const CourseCard: FC<CourseCardProps> = ({ course, showSave = false }) => {
    return <div className="p-4 rounded-lg border border-foreground/25 dark:bg-foreground/5 flex flex-col gap-2 shadow-lg">
        {/* Topic */}
        <div className="text-lg font-bold">{course.topic}</div>
        <Separator className="bg-gradient-to-r from-primary to-transparent" />
        {/* Description */}
        <div className="text-base/loose text-justify text-muted-foreground line-clamp-6 prose dark:prose-invert min-w-full">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{course.description}</ReactMarkdown>
        </div>
        {/* Course details, Preferences and View course button */}
        <div className="flex flex-col gap-3 h-fit m-auto mb-0 w-full">
            <div className="bg-primary/5 text-primary text-sm px-2 py-1 font-medium w-fit">
                {course.metadata.count.modules} modules, {course.metadata.count.lessons} lessons, {course.metadata.count.activities} activities
            </div>
            <div className="flex gap-2 flex-wrap">
                <div className="border border-dashed border-foreground/25 py-1 px-2 rounded-md text-sm">{PREFERENCES["LEVEL"].filter((pref) => pref.toLowerCase().includes(course.preferences.level.toLowerCase()))}</div>
                <div className="border border-dashed border-foreground/25 py-1 px-2 rounded-md text-sm">{PREFERENCES["DURATION"].filter((pref) => pref.toLowerCase().includes(course.preferences.duration.toLowerCase()))}</div>
                <div className="border border-dashed border-foreground/25 py-1 px-2 rounded-md text-sm">{PREFERENCES["FOCUS"].filter((pref) => pref.toLowerCase().includes(course.preferences.focus.toLowerCase()))}</div>
            </div>
            <div className="flex flex-col lg:flex-row items-center gap-3">
                {/* Save and share icon */}
                <div className="grid grid-cols-2 w-full lg:w-fit">
                    {showSave && <Button variant="outline"><Bookmark className="h-4 w-4" />Save</Button>}
                    <CShare
                        trigger={<Button variant={showSave ? "link" : "outline"}><Share className="h-4 w-4" />Share</Button>}
                        link={`${process.env.NEXT_PUBLIC_BASE_URL}/course/${course.courseId}`}
                        label={`Share this course!`}
                        description={`Explore the course on ${course.topic} with ${course.metadata.count.modules} modules, ${course.metadata.count.lessons} lessons, and ${course.metadata.count.activities} activities. Check it out only on ${APP_NAME}!`}
                    />
                </div>
                <Link href={`/course/${course.courseId}`} className="w-full lg:w-fit m-auto mr-0">
                    <Button variant="outline" className="hover:bg-primary hover:text-primary-foreground dark:hover:bg-primary dark:hover:text-primary-foreground">
                        View Course
                        <ArrowRight />
                    </Button>
                </Link>
            </div>
        </div>
    </div>;
}

export default CourseCard;
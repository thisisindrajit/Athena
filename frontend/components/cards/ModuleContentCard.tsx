import { ICourse } from "@/interfaces/ICourse";
import { FC } from "react";
import { FileText, Target } from "lucide-react";
import Link from "next/link";
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { Separator } from "../ui/separator";

interface IModuleContentCardProps {
    module: ICourse["modules"][0];
    courseId: ICourse["courseId"];
}

const ModuleContentCard: FC<IModuleContentCardProps> = ({ module, courseId }) => {
    return <div className="flex flex-col gap-3 p-4 w-full rounded-md border border-primary/50 h-fit">
        <div className="text-xl/relaxed font-bold">{module.title}</div>
        <Separator />
        <div className="prose dark:prose-invert min-w-full leading-loose"><ReactMarkdown remarkPlugins={[remarkGfm]}>{module.description}</ReactMarkdown></div>
        <div className="flex flex-col gap-4 bg-primary/5 p-4 rounded-md">
            {module.content.map((item) => (
                <Link
                    key={`${module.moduleId}-${item.lessonId || item.activityId}`}
                    href={item.lessonId ? `/course/${courseId}/module/${module.moduleId}/lesson/${item.lessonId}` : `/course/${courseId}/module/${module.moduleId}/activity/${item.activityId}`}
                    className={`hover:underline w-fit transition-all flex gap-2`}
                >
                    {item.lessonId ? <FileText className="h-4 min-w-4 mt-1" /> : <Target className="h-4 min-w-4 mt-1" />}
                    <span className="w-full">{item.title}</span>
                </Link>
            ))}
        </div>
    </div>;
}

export default ModuleContentCard;
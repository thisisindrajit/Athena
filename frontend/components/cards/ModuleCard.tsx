import { Separator } from "@/components/ui/separator";
import { APP_NAME, PREFERENCES } from "@/constants/common";
import { Button } from "../ui/button";
import { ArrowRight, Share } from "lucide-react";
import { FC } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import Link from "next/link";
import { IModule } from "@/interfaces/IModule";
import CShare from "../common/CShare";

interface ModuleCardProps {
  module: IModule;
}

const ModuleCard: FC<ModuleCardProps> = ({ module }) => {
  return (
    <div className="p-4 rounded-lg border border-foreground/25 dark:bg-foreground/5 flex flex-col gap-2 shadow-lg">
      {/* Title */}
      <div className="text-lg font-bold line-clamp-1">{module.moduleTitle.toLowerCase().includes("module") ? module.moduleTitle.split(":")[1].trim() : module.moduleTitle}</div>
      <Separator className="bg-gradient-to-r from-primary to-transparent" />
      {/* Description */}
      <div className="text-base/loose text-justify text-muted-foreground line-clamp-6 prose dark:prose-invert min-w-full">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{module.moduleDescription}</ReactMarkdown>
      </div>
      {/* Did you know (TODO later) */}
      {/* <div className="text-sm/loose text-justify bg-secondary/10 p-4 rounded-lg flex flex-col gap-2">
        <div className="font-bold uppercase w-fit bg-secondary px-2 text-secondary-foreground">
          Did you know!
        </div>
        <div className="text-sm/loose text-justify">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </div>
      </div> */}
      <div className="flex flex-col gap-2 h-fit m-auto mb-0 w-full">
        <Separator />
        {/* Part of course */}
        <div className="flex flex-col gap-3 mt-2">
          <div className="text-sm font-medium w-fit">
            Part of course <span className="underline text-primary">{module.courseTopic}</span>
          </div>
          <div className="flex gap-2 flex-wrap">
            <div className="border border-dashed border-foreground/25 py-1 px-2 rounded-md text-sm">{PREFERENCES["LEVEL"].filter((pref) => pref.toLowerCase().includes(module.preferences.level.toLowerCase()))}</div>
            <div className="border border-dashed border-foreground/25 py-1 px-2 rounded-md text-sm">{PREFERENCES["DURATION"].filter((pref) => pref.toLowerCase().includes(module.preferences.duration.toLowerCase()))}</div>
            <div className="border border-dashed border-foreground/25 py-1 px-2 rounded-md text-sm">{PREFERENCES["FOCUS"].filter((pref) => pref.toLowerCase().includes(module.preferences.focus.toLowerCase()))}</div>
          </div>
          <div className="flex flex-col lg:flex-row items-center gap-3">
            {/* Share icon */}
            <div className="grid grid-cols-1 w-full lg:w-fit">
              <CShare
                trigger={<Button variant="outline"><Share className="h-4 w-4" />Share module</Button>}
                link={`${process.env.NEXT_PUBLIC_BASE_URL}/course/${module.courseId}/module/${module.moduleId}`}
                label={`Share this module!`}
                description={`Explore the module ${module.moduleTitle} which is a part of the course ${module.courseTopic} only on ${APP_NAME}!`}
              />
            </div>
            <Link href={`/course/${module.courseId}/module/${module.moduleId}`} className="w-full lg:w-fit m-auto mr-0">
              <Button variant="outline" className="w-full hover:bg-primary hover:text-primary-foreground dark:hover:bg-primary dark:hover:text-primary-foreground">
                View Module
                <ArrowRight />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModuleCard;
